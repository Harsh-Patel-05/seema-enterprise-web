import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/products'
import Breadcrumb from '../components/ui/Breadcrumb'
import Button from '../components/ui/Button'

export default function Categories() {
  return (
    <div>
      <section className="bg-brand-black py-12 text-white lg:py-16">
        <div className="container-app">
          <Breadcrumb items={[{ label: 'Categories' }]} light />
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Product Categories
          </h1>
          <div className="accent-line mt-4" />
          <p className="mt-4 max-w-2xl text-white/65">
            Explore electrical solutions organised by application and product type.
          </p>
        </div>
      </section>

      <div className="container-app grid gap-6 py-12 lg:py-16">
        {categories.map((category, index) => (
          <article
            key={category.id}
            className={`grid overflow-hidden border border-brand-soft bg-white lg:grid-cols-2 ${
              index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
            }`}
          >
            <div className="relative min-h-[240px] overflow-hidden bg-brand-charcoal lg:min-h-[320px]">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover opacity-80"
                loading="lazy"
              />
              <span className="absolute left-0 top-0 h-full w-1.5 bg-brand-red" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                {category.count} products
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-brand-black">
                {category.name}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-brand-muted">
                {category.description}
              </p>
              <Button as={Link} to={`/products?category=${category.id}`} className="mt-6 w-fit" size="sm">
                Explore Products
                <ArrowRight size={14} />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
