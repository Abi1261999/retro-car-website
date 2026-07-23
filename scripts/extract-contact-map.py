#!/usr/bin/env python3
"""Extract the location map image from the dedicated map PDF or Main design PDF."""

from __future__ import annotations

import io
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
MAP_PDF_GLOBS = ['Rectangle_15*.pdf', 'Rectangle_15_19a7.pdf']
MAIN_PDF_NAME = 'Main_3c7c.pdf'
OUTPUT_NAME = 'location-map.png'
MAP_WIDTH = 1804
MAP_HEIGHT = 700
RENDER_SCALE = 2
MAIN_MAP_CLIP = fitz.Rect(58, 5500, 58 + MAP_WIDTH, 5500 + MAP_HEIGHT)


def find_map_pdf() -> Path | None:
    for directory in UPLOAD_DIRS:
        if not directory.exists():
            continue
        for pattern in MAP_PDF_GLOBS:
            matches = sorted(directory.glob(pattern))
            if matches:
                return matches[0]
    return None


def find_main_pdf() -> Path | None:
    for directory in UPLOAD_DIRS:
        candidate = directory / MAIN_PDF_NAME
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


def render_page(page: fitz.Page, width: int, height: int, scale: int) -> Image.Image:
    target_size = (width * scale, height * scale)
    matrix = fitz.Matrix(scale, scale)
    pixmap = page.get_pixmap(matrix=matrix, alpha=False)
    image = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)

    if image.size != target_size:
        image = image.resize(target_size, Image.Resampling.LANCZOS)

    return image


def extract_from_map_pdf(pdf_path: Path) -> Image.Image:
    doc = fitz.open(pdf_path)
    page = doc[0]
    page_rect = page.rect

    if abs(page_rect.width - MAP_WIDTH) < 2 and abs(page_rect.height - MAP_HEIGHT) < 2:
        image = render_page(page, MAP_WIDTH, MAP_HEIGHT, RENDER_SCALE)
        doc.close()
        return image

    images = page.get_images(full=True)
    if images:
        info = doc.extract_image(images[0][0])
        raw = Image.open(io.BytesIO(info['image'])).convert('RGB')
        image = cover_crop(raw, MAP_WIDTH, MAP_HEIGHT)
        image = image.resize(
            (MAP_WIDTH * RENDER_SCALE, MAP_HEIGHT * RENDER_SCALE),
            Image.Resampling.LANCZOS,
        )
        doc.close()
        return image

    image = render_page(page, int(page_rect.width), int(page_rect.height), RENDER_SCALE)
    doc.close()
    return image


def extract_from_main_pdf(pdf_path: Path) -> Image.Image:
    doc = fitz.open(pdf_path)
    page = doc[0]
    matrix = fitz.Matrix(RENDER_SCALE, RENDER_SCALE)
    pixmap = page.get_pixmap(matrix=matrix, clip=MAIN_MAP_CLIP, alpha=False)
    image = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)
    doc.close()
    return image


def save_image(image: Image.Image) -> None:
    for directory in OUTPUT_DIRS:
        directory.mkdir(parents=True, exist_ok=True)
        image.save(directory / OUTPUT_NAME, format='PNG', compress_level=3)


def main() -> None:
    map_pdf = find_map_pdf()
    if map_pdf:
        image = extract_from_map_pdf(map_pdf)
        save_image(image)
        print(f'Extracted {OUTPUT_NAME} from {map_pdf.name} ({image.width}×{image.height})')
        return

    main_pdf = find_main_pdf()
    if main_pdf:
        image = extract_from_main_pdf(main_pdf)
        save_image(image)
        print(f'Extracted {OUTPUT_NAME} from {MAIN_PDF_NAME} ({image.width}×{image.height})')
        return

    print('Skipping contact map extraction: no source PDF found')


if __name__ == '__main__':
    main()
