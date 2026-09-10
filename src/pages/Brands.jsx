import { useMemo, useState } from 'react'
import { brands } from '../data/products'
import Breadcrumb from '../components/ui/Breadcrumb'
import BrandCard from '../components/ui/BrandCard'

export default function Brands() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return brands
    return brands.filter(
      (b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div>
      <section className="bg-brand-black py-12 text-white lg:py-16">
        <div className="container-app">
          <Breadcrumb items={[{ label: 'Brands' }]} light />
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            TRUSTED BRANDS
          </h1>
          <div className="accent-line mt-4" />
          <p className="mt-4 max-w-2xl text-white/65">
            Authentic electrical products from manufacturers known for quality and reliability.
          </p>
        </div>
      </section>

      <div className="container-app py-12 lg:py-16">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search brands..."
          className="mb-8 h-12 w-full max-w-md border border-brand-soft px-4 text-sm outline-none focus:border-brand-red"
        />
        {filtered.length === 0 ? (
          <p className="text-brand-muted">No brands match your search.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
