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
DISPLAY_WIDTH = 1410
DISPLAY_HEIGHT = 545
RENDER_SCALE = 3


def find_pdf() -> Path | None:
    for directory in UPLOAD_DIRS:
        candidate = directory / PDF_NAME
        if candidate.exists():
            return candidate
    return None


def extract_embedded_car(pdf_path: Path) -> Image.Image:
    """Render the design plate exactly as authored in the PDF."""
    doc = fitz.open(pdf_path)
    page = doc[0]
    matrix = fitz.Matrix(RENDER_SCALE, RENDER_SCALE)
    pixmap = page.get_pixmap(matrix=matrix, clip=page.rect, alpha=False)
    image = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)
    doc.close()
    return image


def main() -> None:
    pdf_path = find_pdf()
    if not pdf_path:
        print(f'Skipping {PDF_NAME}: file not found')
        return

    image = extract_embedded_car(pdf_path)

    for directory in OUTPUT_DIRS:
        directory.mkdir(parents=True, exist_ok=True)
        image.save(directory / OUTPUT_NAME, format='PNG', optimize=True)

    print(f'Extracted {OUTPUT_NAME} ({image.width}×{image.height})')


if __name__ == '__main__':
    main()
