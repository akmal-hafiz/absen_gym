import io
import base64
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
from PIL import Image

app = FastAPI(title="Gym Secure Attendance API (Lite)")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Ciphertext"]
)

AES_KEY = b'gym_secure_key_1'


# --- IMPLEMENTASI MANUAL STEGANOGRAFI LSB (Tanpa Library Berat) ---
# Fungsi ini mengubah teks string menjadi deretan angka biner (0 dan 1)
def text_to_bits(text):
    bits = bin(int.from_bytes(text.encode('utf-8'), 'big'))[2:]
    return bits.zfill(8 * ((len(bits) + 7) // 8))

# Fungsi ini mengubah deretan biner kembali menjadi teks asli
def text_from_bits(bits):
    n = int(bits, 2)
    return n.to_bytes((n.bit_length() + 7) // 8, 'big').decode('utf-8', errors='ignore')

# LOGIKA UTAMA 1: MENYISIPKAN PESAN KE GAMBAR (LSB ENCODE)
# Cara kerjanya: Mengganti digit biner terakhir dari setiap warna piksel dengan bit pesan kita.
def lsb_encode(image, secret_data):
    # 1. Tambahkan "DELIMITER" (tanda batas) di akhir pesan biar sistem tahu kapan harus berhenti baca.
    secret_data += "*****" 
    
    # 2. Ubah pesan rahasia menjadi barisan biner (contoh: 0110001...)
    binary_data = text_to_bits(secret_data)
    data_len = len(binary_data)
    
    pixels = image.load()
    width, height = image.size
    data_index = 0

    # 3. Looping setiap piksel dalam gambar (scan baris demi baris)
    for y in range(height):
        for x in range(width):
            if data_index >= data_len:
                break
                
            # Ambil nilai warna Merah(r), Hijau(g), Biru(b) dari piksel saat ini
            r, g, b = pixels[x, y]

            # --- INI INTI ALGORITMA LSB ---
            # Kita modifikasi masing-masing channel warna jika data masih ada.
            
            # Modifikasi LSB Merah
            if data_index < data_len:
                # Logika: (r & ~1) membuang bit terakhir, lalu (| int) memasukkan bit data kita
                r = (r & ~1) | int(binary_data[data_index])
                data_index += 1
            
            # Modifikasi LSB Hijau
            if data_index < data_len:
                g = (g & ~1) | int(binary_data[data_index])
                data_index += 1

            # Modifikasi LSB Biru
            if data_index < data_len:
                b = (b & ~1) | int(binary_data[data_index])
                data_index += 1
            # ------------------------------

            # Simpan piksel yang sudah dimodifikasi kembali ke gambar
            pixels[x, y] = (r, g, b)
            
        if data_index >= data_len:
            break
            
    return image

# LOGIKA UTAMA 2: MEMBACA PESAN DARI GAMBAR (LSB DECODE)
# Cara kerjanya: Memanen bit terakhir dari setiap piksel sampai ketemu tanda berhenti.
def lsb_decode(image):
    pixels = image.load()
    width, height = image.size
    extracted_bits = ""
    
    # Looping setiap piksel
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]

            # Ambil bit terakhir dari setiap channel warna (R, G, B)
            # (val & 1) akan menghasilkan 1 jika ganjil, 0 jika genap (inilah bit LSB)
            extracted_bits += str(r & 1)
            extracted_bits += str(g & 1)
            extracted_bits += str(b & 1)

    # Ubah biner panjang tadi kembali menjadi text
    decoded_text = text_from_bits(extracted_bits)
    
    # Cari tanda batas "*****"
    if "*****" in decoded_text:
        # Jika ketemu, ambil teks SEBELUM tanda batas (itulah pesan aslinya)
        return decoded_text.split("*****")[0]
    else:
        # Jika tidak ketemu, berarti gambar ini tidak mengandung pesan rahasia kita
        return None

# --- API ENDPOINTS ---

@app.post("/create-card")
async def create_card(name: str = Form(...), id: str = Form(...), photo: UploadFile = File(...)):
    try:
        
        # Use our lightweight function
        secret_image = hide_lsb(image, encrypted_text)
        
        img_byte_arr = io.BytesIO()
        secret_image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        
        return StreamingResponse(img_byte_arr, media_type="image/png", headers={"X-Ciphertext": encrypted_text})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/verify-card")
async def verify_card(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # Use our lightweight function
        encrypted_text = reveal_lsb(image)
        
        if not encrypted_text:
             return {"status": "denied", "reason": "No hidden data found."}
        
        try:
            decrypted_text = decrypt_data(encrypted_text)
            p_id, p_name = decrypted_text.split('|')
            return {"status": "success", "id": p_id, "name": p_name, "raw_encrypted_data": encrypted_text}
        except Exception:
            return {"status": "denied", "reason": "Decryption failed.", "raw_encrypted_data": encrypted_text}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
