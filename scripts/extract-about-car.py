#!/usr/bin/env python3
"""Extract the About section car overlay from the design PDF."""

from __future__ import annotations

import io
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print('PyMuPDF not installed, skipping about car extraction.')
    sys.exit(0)

try:
    from PIL import Image
except ImportError:
    print('Pillow not installed, skipping about car extraction.')
    sys.exit(0)

ROOT = Path(__file__).resolve().parents[1]
UPLOAD_DIRS = [
    ROOT / 'uploads',
    Path('/home/ubuntu/.cursor/projects/workspace/uploads'),
]
OUTPUT_DIRS = [ROOT / 'public' / 'about', ROOT / 'src' / 'assets' / 'about']
PDF_CANDIDATES = [
    '7016c2ede1e3fc3b358792263629dc44_1_c5cb.pdf',
    '7016c2ede1e3fc3b358792263629dc44_1__1__8ddd.pdf',
]
OUTPUT_NAME = 'about-car.png'
DISPLAY_WIDTH = 1410
RENDER_SCALE = 3


def find_pdf() -> Path | None:
    for name in PDF_CANDIDATES:
        for directory in UPLOAD_DIRS:
            candidate = directory / name
            if candidate.exists():
                return candidate
    return None


def remove_white_background(image: Image.Image, threshold: int = 238) -> Image.Image:
    rgba = image.convert('RGBA')
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if red >= threshold and green >= threshold and blue >= threshold:
                pixels[x, y] = (red, green, blue, 0)
    return rgba


def remove_black_background(image: Image.Image, threshold: int = 12) -> Image.Image:
    rgba = image.convert('RGBA')
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if red <= threshold and green <= threshold and blue <= threshold:
                pixels[x, y] = (red, green, blue, 0)
    return rgba


def extract_car(pdf_path: Path) -> Image.Image:
    doc = fitz.open(pdf_path)
    page = doc[0]
    images = page.get_images(full=True)

    if images:
        extracted = doc.extract_image(images[0][0])
        image = Image.open(io.BytesIO(extracted['image'])).convert('RGB')
    else:
        matrix = fitz.Matrix(RENDER_SCALE, RENDER_SCALE)
        pixmap = page.get_pixmap(matrix=matrix, clip=page.rect, alpha=False)
        image = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)

    doc.close()

    target_w = DISPLAY_WIDTH * RENDER_SCALE
    scale = target_w / image.width
    target_h = max(1, int(image.height * scale))
    image = image.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # White-background exports use white key; black-background exports use black key.
    corners = [
        image.getpixel((0, 0)),
        image.getpixel((image.width - 1, 0)),
        image.getpixel((0, image.height - 1)),
        image.getpixel((image.width - 1, image.height - 1)),
    ]
    avg = sum(sum(px) for px in corners) / (len(corners) * 3)
    if avg > 200:
        return remove_white_background(image)
    return remove_black_background(image)


def main() -> None:
    pdf_path = find_pdf()
    if not pdf_path:
        print('No about car PDF found, skipping extraction.')
        return

    image = extract_car(pdf_path)

    for directory in OUTPUT_DIRS:
        directory.mkdir(parents=True, exist_ok=True)
        image.save(directory / OUTPUT_NAME, format='PNG', optimize=True)

    print(f'Extracted {OUTPUT_NAME} from {pdf_path.name} ({image.width}×{image.height}, transparent)')


if __name__ == '__main__':
    main()
