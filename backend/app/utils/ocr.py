import os
import pytesseract
from PIL import Image


# Use the Windows Tesseract path locally if it exists.
# On Render/Linux, pytesseract will use the system-installed tesseract.
windows_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

if os.path.exists(windows_tesseract):
    pytesseract.pytesseract.tesseract_cmd = windows_tesseract


def extract_text(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text