import os
import pytesseract # type: ignore
from PIL import Image

# Windows Tesseract path for local development
windows_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Use the Windows executable if it exists.
# On Render/Linux, pytesseract will automatically use
# the system-installed Tesseract executable.
if os.path.exists(windows_tesseract):
    pytesseract.pytesseract.tesseract_cmd = windows_tesseract


def extract_text(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text