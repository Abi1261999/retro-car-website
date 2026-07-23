import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const sourceDir = path.join(root, 'src', 'assets', 'contact')
const targetDir = path.join(root, 'public', 'contact')

fs.mkdirSync(targetDir, { recursive: true })

if (!fs.existsSync(sourceDir)) {
  console.warn('No src/assets/contact folder found.')
  process.exit(0)
}

const images = fs.readdirSync(sourceDir).filter((file) => /\.png$/i.test(file))

if (images.length === 0) {
  console.warn('No PNG files found in src/assets/contact.')
  process.exit(0)
}

for (const file of images) {
  fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file))
}

console.log(`Synced ${images.length} contact image(s) to public/contact`)
