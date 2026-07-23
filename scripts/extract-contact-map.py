#!/usr/bin/env python3
"""Extract the location map image from the Main design PDF."""

from __future__ import annotations

import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print('PyMuPDF not installed, skipping contact map extraction.')
    sys.exit(0)

try:
    from PIL import Image
except ImportError:
    print('Pillow not installed, skipping contact map extraction.')
    sys.exit(0)

ROOT = Path(__file__).resolve().parents[1]
UPLOAD_DIRS = [
    ROOT / 'uploads',
    Path('/home/ubuntu/.cursor/projects/workspace/uploads'),
]
OUTPUT_DIRS = [ROOT / 'public' / 'contact', ROOT / 'src' / 'assets' / 'contact']
PDF_NAME = 'Main_3c7c.pdf'
RENDER_SCALE = 2
MAP_CLIP = fitz.Rect(58, 5500, 1862, 6200)
OUTPUT_NAME = 'location-map.png'


def find_pdf() -> Path | None:
    for directory in UPLOAD_DIRS:
        candidate = directory / PDF_NAME
        if candidate.exists():
            return candidate
    return None


def main() -> None:
    pdf_path = find_pdf()
    if not pdf_path:
        print(f'Skipping {PDF_NAME}: file not found')
        return

    doc = fitz.open(pdf_path)
    page = doc[0]
    matrix = fitz.Matrix(RENDER_SCALE, RENDER_SCALE)
    pixmap = page.get_pixmap(matrix=matrix, clip=MAP_CLIP, alpha=False)
    image = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)

    for directory in OUTPUT_DIRS:
        directory.mkdir(parents=True, exist_ok=True)
        image.save(directory / OUTPUT_NAME, format='PNG', optimize=True)

    print(f'Extracted {OUTPUT_NAME} ({image.width}×{image.height})')
    doc.close()


if __name__ == '__main__':
    main()
