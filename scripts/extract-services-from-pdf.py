#!/usr/bin/env python3
"""Extract service card images from the Main design PDF."""

from __future__ import annotations

import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print('PyMuPDF not installed, skipping service extraction.')
    sys.exit(0)

try:
    from PIL import Image
except ImportError:
    print('Pillow not installed, skipping service extraction.')
    sys.exit(0)

ROOT = Path(__file__).resolve().parents[1]
UPLOAD_DIRS = [
    ROOT / 'uploads',
    Path('/home/ubuntu/.cursor/projects/workspace/uploads'),
]
OUTPUT_DIRS = [ROOT / 'public' / 'services', ROOT / 'src' / 'assets' / 'services']
PDF_NAME = 'Main_3c7c.pdf'
RENDER_SCALE = 2
CARD_WIDTH = 588
CARD_HEIGHT = 507

CLIPS = [
    ('service-shipping.png', fitz.Rect(14, 3890, 14 + CARD_WIDTH, 3890 + CARD_HEIGHT)),
    ('service-warranty.png', fitz.Rect(666, 3890, 666 + CARD_WIDTH, 3890 + CARD_HEIGHT)),
    ('service-financing.png', fitz.Rect(1308, 3890, 1308 + CARD_WIDTH, 3890 + CARD_HEIGHT)),
]


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

    for filename, clip in CLIPS:
        pixmap = page.get_pixmap(matrix=matrix, clip=clip, alpha=False)
        image = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)
        target_size = (CARD_WIDTH * RENDER_SCALE, CARD_HEIGHT * RENDER_SCALE)
        if image.size != target_size:
            image = image.resize(target_size, Image.Resampling.LANCZOS)

        for directory in OUTPUT_DIRS:
            directory.mkdir(parents=True, exist_ok=True)
            image.save(directory / filename, format='PNG', optimize=True)

        print(f'Extracted {filename} ({image.width}×{image.height})')

    doc.close()


if __name__ == '__main__':
    main()
