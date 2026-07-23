#!/usr/bin/env python3
"""Extract the About section car overlay from the design PDF."""

from __future__ import annotations

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
PDF_NAME = '7016c2ede1e3fc3b358792263629dc44_1__1__8ddd.pdf'
OUTPUT_NAME = 'about-car.png'
RENDER_SCALE = 3  # 4230×1635 for crisp 1410×545 display


def find_pdf() -> Path | None:
    for directory in UPLOAD_DIRS:
        candidate = directory / PDF_NAME
        if candidate.exists():
            return candidate
    return None


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
    matrix = fitz.Matrix(RENDER_SCALE, RENDER_SCALE)
    pixmap = page.get_pixmap(matrix=matrix, clip=page.rect, alpha=False)
    image = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)
    doc.close()
    return remove_black_background(image)


def main() -> None:
    pdf_path = find_pdf()
    if not pdf_path:
        print(f'Skipping {PDF_NAME}: file not found')
        return

    image = extract_car(pdf_path)

    for directory in OUTPUT_DIRS:
        directory.mkdir(parents=True, exist_ok=True)
        image.save(directory / OUTPUT_NAME, format='PNG', optimize=True)

    print(f'Extracted {OUTPUT_NAME} from {pdf_path.name} ({image.width}×{image.height}, transparent)')


if __name__ == '__main__':
    main()
