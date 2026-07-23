#!/usr/bin/env python3
"""Extract exact car images from the design PDF into public/cars and src/assets/cars."""

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
PDF_CANDIDATES = [
    ROOT / 'uploads' / 'Group_22_03fd.pdf',
    Path('/home/ubuntu/.cursor/projects/workspace/uploads/Group_22_03fd.pdf'),
]
OUTPUT_DIRS = [ROOT / 'public' / 'cars', ROOT / 'src' / 'assets' / 'cars']
MAPPING = {
    1: 'Rectangle 12.png',
    0: 'Group 21.png',
}


def fit_cover(image: Image.Image, width: int, height: int) -> Image.Image:
    src_w, src_h = image.size
    scale = max(width / src_w, height / src_h)
    resized = image.resize((int(src_w * scale), int(src_h * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - width) // 2
    top = (resized.height - height) // 2
    return resized.crop((left, top, left + width, top + height))


def main() -> None:
    pdf_path = next((path for path in PDF_CANDIDATES if path.exists()), None)
    if not pdf_path:
        print('No car PDF found, skipping extraction.')
        return

    doc = fitz.open(pdf_path)
    page = doc[0]
    images = page.get_images(full=True)

    for directory in OUTPUT_DIRS:
        directory.mkdir(parents=True, exist_ok=True)

    for index, filename in MAPPING.items():
        if index >= len(images):
            continue
        extracted = doc.extract_image(images[index][0])
        image = Image.open(io.BytesIO(extracted['image'])).convert('RGB')
        tile = fit_cover(image, 960, 541)
        for directory in OUTPUT_DIRS:
            tile.save(directory / filename, format='PNG', optimize=True)
        print(f'Extracted {filename} from {pdf_path.name}')


if __name__ == '__main__':
    main()
