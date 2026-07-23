#!/usr/bin/env python3
"""Extract clean service card photos (no baked-in labels) from the Main design PDF."""

from __future__ import annotations

import io
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

# Embedded image xrefs for the three service photos (text is a separate PDF layer).
SERVICE_IMAGES = [
    ('service-shipping.png', 16),
    ('service-warranty.png', 8),
    ('service-financing.png', 34),
]


def find_pdf() -> Path | None:
    for directory in UPLOAD_DIRS:
        candidate = directory / PDF_NAME
        if candidate.exists():
            return candidate
    return None


def cover_crop(image: Image.Image, width: int, height: int) -> Image.Image:
    img_width, img_height = image.size
    scale = max(width / img_width, height / img_height)
    resized = image.resize(
        (int(img_width * scale), int(img_height * scale)),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - width) // 2
    top = (resized.height - height) // 2
    return resized.crop((left, top, left + width, top + height))


def main() -> None:
    pdf_path = find_pdf()
    if not pdf_path:
        print(f'Skipping {PDF_NAME}: file not found')
        return

    doc = fitz.open(pdf_path)
    page = doc[0]
    target_size = (CARD_WIDTH * RENDER_SCALE, CARD_HEIGHT * RENDER_SCALE)

    for filename, xref in SERVICE_IMAGES:
        info = doc.extract_image(xref)
        image = Image.open(io.BytesIO(info['image'])).convert('RGB')
        image = cover_crop(image, *target_size)

        for directory in OUTPUT_DIRS:
            directory.mkdir(parents=True, exist_ok=True)
            image.save(directory / filename, format='PNG', optimize=True)

        print(f'Extracted {filename} ({image.width}×{image.height})')

    doc.close()


if __name__ == '__main__':
    main()
