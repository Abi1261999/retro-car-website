#!/usr/bin/env python3
"""Extract car images from individual design PDFs into public/cars and src/assets/cars."""

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
RENDER_SCALE = 2
TILE_WIDTH = 960 * RENDER_SCALE
TILE_HEIGHT = 541 * RENDER_SCALE

# Individual high-quality car tile PDFs → output filename
CAR_PDFS = [
    ('Rectangle_12_5441.pdf', 'Rectangle 12.png'),
    ('Rectangle_13_6a96.pdf', 'Group 21.png'),
    ('Rectangle_12__1__a1e7.pdf', 'Rectangle 12 (1).png'),
    ('Rectangle_13__1__eaad.pdf', 'Rectangle 13.png'),
    ('Rectangle_12__2__36d2.pdf', 'Rectangle 12 (2).png'),
]

CTA_PDF = '7016c2ede1e3fc3b358792263629dc44_1_c5cb.pdf'
CTA_OUTPUT = '7016c2ede1e3fc3b358792263629dc44 1.png'


def find_pdf(filename: str) -> Path | None:
    for directory in UPLOAD_DIRS:
        candidate = directory / filename
        if candidate.exists():
            return candidate
    return None


def fit_cover(image: Image.Image, width: int, height: int) -> Image.Image:
    src_w, src_h = image.size
    scale = max(width / src_w, height / src_h)
    resized = image.resize(
        (max(1, int(src_w * scale)), max(1, int(src_h * scale))),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - width) // 2
    top = (resized.height - height) // 2
    return resized.crop((left, top, left + width, top + height))


def render_page(pdf_path: Path, scale: int = RENDER_SCALE) -> Image.Image:
    doc = fitz.open(pdf_path)
    page = doc[0]
    matrix = fitz.Matrix(scale, scale)
    pixmap = page.get_pixmap(matrix=matrix, clip=page.rect, alpha=False)
    image = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)
    doc.close()
    return fit_cover(image, TILE_WIDTH, TILE_HEIGHT)


def extract_embedded_image(pdf_path: Path) -> Image.Image | None:
    doc = fitz.open(pdf_path)
    page = doc[0]
    images = page.get_images(full=True)
    if not images:
        doc.close()
        return None

    extracted = doc.extract_image(images[0][0])
    image = Image.open(io.BytesIO(extracted['image'])).convert('RGB')
    doc.close()
    return fit_cover(image, TILE_WIDTH, TILE_HEIGHT)


def render_cta_page(pdf_path: Path, scale: int = RENDER_SCALE) -> Image.Image:
    doc = fitz.open(pdf_path)
    page = doc[0]
    matrix = fitz.Matrix(scale, scale)
    pixmap = page.get_pixmap(matrix=matrix, clip=page.rect, alpha=False)
    image = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)
    doc.close()
    return image


def remove_white_background(image: Image.Image, threshold: int = 235) -> Image.Image:
    rgba = image.convert('RGBA')
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if red >= threshold and green >= threshold and blue >= threshold:
                pixels[x, y] = (red, green, blue, 0)
    return rgba


def save_image(image: Image.Image, filename: str) -> None:
    for directory in OUTPUT_DIRS:
        directory.mkdir(parents=True, exist_ok=True)
        image.save(directory / filename, format='PNG', optimize=True)


def main() -> None:
    extracted_any = False

    for pdf_name, output_name in CAR_PDFS:
        pdf_path = find_pdf(pdf_name)
        if not pdf_path:
            print(f'Skipping {pdf_name}: file not found')
            continue

        image = extract_embedded_image(pdf_path) or render_page(pdf_path)
        save_image(image, output_name)
        print(f'Extracted {output_name} from {pdf_name} ({image.width}×{image.height})')
        extracted_any = True

    cta_path = find_pdf(CTA_PDF)
    if cta_path:
        cta_image = remove_white_background(render_cta_page(cta_path))
        save_image(cta_image, CTA_OUTPUT)
        print(f'Extracted {CTA_OUTPUT} from {CTA_PDF} ({cta_image.width}×{cta_image.height}, transparent)')
        extracted_any = True
    else:
        print(f'Skipping {CTA_PDF}: file not found')

    if not extracted_any:
        print('No car PDFs found, skipping extraction.')


if __name__ == '__main__':
    main()
