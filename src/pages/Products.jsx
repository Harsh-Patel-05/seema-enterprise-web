import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { brands, categories, products } from '../data/products'
import { filterProducts, sortProducts } from '../utils/helpers'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import ProductCard from '../components/ui/ProductCard'

export default function Products() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    setQuery(params.get('q') || '')
    setCategory(params.get('category') || '')
    setBrand(params.get('brand') || '')
  }, [params])

  const filtered = useMemo(
    () => sortProducts(filterProducts(products, { query, category, brand }), sortBy),
    [query, category, brand, sortBy]
  )

  return (
    <div>
      <section className="bg-brand-black py-12 text-white lg:py-16">
        <div className="container-app">
          <Breadcrumb items={[{ label: 'Products' }]} light />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Catalogue</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            OUR PRODUCTS
          </h1>
          <div className="accent-line mt-4" />
          <p className="mt-4 max-w-2xl text-white/65">
            Explore our range of reliable electrical and electronic solutions.
          </p>
        </div>
      </section>

      <div className="container-app py-10 lg:py-12">
        <div className="mb-8 grid gap-3 border border-brand-soft bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Search
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="h-11 w-full border border-brand-soft px-3 text-sm outline-none focus:border-brand-red"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full border border-brand-soft bg-white px-3 text-sm outline-none focus:border-brand-red"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="h-11 w-full border border-brand-soft bg-white px-3 text-sm outline-none focus:border-brand-red"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Sort
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 w-full border border-brand-soft bg-white px-3 text-sm outline-none focus:border-brand-red"
            >
              <option value="featured">Featured</option>
              <option value="a-z">A–Z</option>
            </select>
          </div>
        </div>

        <p className="mb-6 text-sm text-brand-muted">
          Showing <span className="font-semibold text-brand-black">{filtered.length}</span> products
        </p>

        {filtered.length === 0 ? (
          <div className="border border-dashed border-brand-soft bg-brand-grey px-6 py-16 text-center">
            <SectionHeading
              title="No products found"
              subtitle="Try a different search or filter."
              align="center"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
