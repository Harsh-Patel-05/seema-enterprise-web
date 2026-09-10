import fs from 'fs'

const path = 'src/data/products.js'
let src = fs.readFileSync(path, 'utf8')

const imageMap = {
  'wires-cables': [
    '/images/products/wires-coils.jpg',
    '/images/products/wire-1.jpg',
    '/images/products/wire-2.jpg',
  ],
  'switches-sockets': [
    '/images/products/modular-switches.jpg',
    '/images/products/switch-1.jpg',
    '/images/products/switch-2.jpg',
  ],
  fans: [
    '/images/products/fan-ceiling.jpg',
    '/images/products/exhaust-fan.jpg',
    '/images/products/fan-ceiling.jpg',
  ],
  'led-lighting': [
    '/images/products/led-bulbs.jpg',
    '/images/products/led-panel.jpg',
    '/images/products/extra-4.jpg',
    '/images/products/extra-10.jpg',
  ],
  'mcb-protection': [
    '/images/products/mcb-panel.jpg',
    '/images/products/distribution-board.jpg',
    '/images/products/mcb-panel.jpg',
  ],
  'electrical-accessories': [
    '/images/products/extension-board.jpg',
    '/images/products/plugs-adapters.jpg',
    '/images/products/accessories-1.jpg',
  ],
  'home-electrical': [
    '/images/products/home-1.jpg',
    '/images/products/distribution-board.jpg',
    '/images/products/extra-0.jpg',
  ],
  'industrial-electrical': [
    '/images/products/industrial-1.jpg',
    '/images/products/extra-17.jpg',
    '/images/products/extra-9.jpg',
  ],
}

const catImages = {
  'wires-cables': '/images/categories/wires.jpg',
  'switches-sockets': '/images/categories/switches.jpg',
  fans: '/images/categories/fans.jpg',
  'led-lighting': '/images/categories/led.jpg',
  'mcb-protection': '/images/categories/mcb.jpg',
  'electrical-accessories': '/images/categories/accessories.jpg',
  'home-electrical': '/images/categories/home.jpg',
  'industrial-electrical': '/images/categories/industrial.jpg',
}

const counters = {}

src = src.replace(/\{\s*id: '(se-\d+)'[\s\S]*?\n  \},/g, (block) => {
  const catMatch = block.match(/categoryId: '([^']+)'/)
  if (!catMatch) return block
  const cat = catMatch[1]
  const pool = imageMap[cat] || ['/images/products/extra-0.jpg']
  counters[cat] = counters[cat] || 0
  const main = pool[counters[cat] % pool.length]
  counters[cat] += 1
  const second = pool[counters[cat] % pool.length]
  const third = pool[(counters[cat] + 1) % pool.length]
  let next = block.replace(/image: img\([^)]+\),/, `image: '${main}',`)
  next = next.replace(
    /images: \[[\s\S]*?\],/,
    `images: ['${main}', '${second}', '${third}'],`
  )
  return next
})

src = src.replace(
  /(id: '(wires-cables|switches-sockets|fans|led-lighting|mcb-protection|electrical-accessories|home-electrical|industrial-electrical)',\n    name: '[^']+',\n    description: [^\n]+\n    image: )img\([^)]+\)/g,
  (m, p1, id) => `${p1}'${catImages[id]}'`
)

src = src.replace(
  /\{ id: '([^']+)', name: '([^']+)', description: '([^']+)' \}/g,
  (m, id, name, desc) =>
    `{ id: '${id}', name: '${name}', description: '${desc}', logo: '/images/brands/${id}.svg', image: '/images/brands/${id}.svg' }`
)

if (!src.includes('img(')) {
  src = src.replace(
    /const img = \(id, w = 900\) =>\n  `https:\/\/images\.unsplash\.com\/\$\{id\}\?auto=format&fit=crop&w=\$\{w\}&q=80`\n\n/,
    ''
  )
} else {
  console.log('Remaining img() calls:', (src.match(/img\(/g) || []).length)
}

fs.writeFileSync(path, src)
console.log('Updated products. Category image assignments:', counters)
