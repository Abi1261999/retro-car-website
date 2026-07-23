#!/usr/bin/env python3
"""Extract car images from design PDFs into public/cars and src/assets/cars."""

from __future__ import annotations

import io
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print('PyMuPDF not installed, skipping PDF extraction.')
    sys.exit(0)

try:
    from PIL import Image
except ImportError:
    print('Pillow not installed, skipping PDF extraction.')
    sys.exit(0)

ROOT = Path(__file__).resolve().parents[1]
UPLOAD_DIRS = [
    ROOT / 'uploads',
    Path('/home/ubuntu/.cursor/projects/workspace/uploads'),
]
OUTPUT_DIRS = [ROOT / 'public' / 'cars', ROOT / 'src' / 'assets' / 'cars']

TILE_WIDTH = 960
TILE_HEIGHT = 541
RENDER_SCALE = 2  # 1920×1082 output for sharper retina display

# Each entry: PDF filename, left-half output, right-half output (or None)
PDF_ROWS = [
    ('Group_22_03fd.pdf', 'Rectangle 12.png', 'Group 21.png'),
    ('Group_23_6cc3.pdf', 'Rectangle 12 (1).png', 'Rectangle 13.png'),
    ('Group_24_5fc5.pdf', 'Rectangle 12 (2).png', None),
]


def find_pdf(filename: str) -> Path | None:
    for directory in UPLOAD_DIRS:
        candidate = directory / filename
        if candidate.exists():
            return candidate
    return None


def render_tile(page: fitz.Page, left: bool) -> Image.Image:
    x0 = 0 if left else TILE_WIDTH
    clip = fitz.Rect(x0, 0, x0 + TILE_WIDTH, TILE_HEIGHT)
    matrix = fitz.Matrix(RENDER_SCALE, RENDER_SCALE)
    pixmap = page.get_pixmap(matrix=matrix, clip=clip, alpha=False)
    return Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)


def main() -> None:
    for directory in OUTPUT_DIRS:
        directory.mkdir(parents=True, exist_ok=True)

    extracted_any = False

    for pdf_name, left_file, right_file in PDF_ROWS:
        pdf_path = find_pdf(pdf_name)
        if not pdf_path:
            print(f'Skipping {pdf_name}: file not found')
            continue

        doc = fitz.open(pdf_path)
        page = doc[0]

        left_image = render_tile(page, left=True)
        for directory in OUTPUT_DIRS:
            left_image.save(directory / left_file, format='PNG', optimize=True)
        print(f'Extracted {left_file} from {pdf_name} ({left_image.width}×{left_image.height})')
        extracted_any = True

        if right_file:
            right_image = render_tile(page, left=False)
            for directory in OUTPUT_DIRS:
                right_image.save(directory / right_file, format='PNG', optimize=True)
            print(f'Extracted {right_file} from {pdf_name} ({right_image.width}×{right_image.height})')

        doc.close()

    if not extracted_any:
        print('No car PDFs found, skipping extraction.')


if __name__ == '__main__':
    main()
