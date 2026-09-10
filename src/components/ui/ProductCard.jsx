import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Button from './Button'
import { useApp } from '../../context/AppContext'

export default function ProductCard({ product }) {
  const { openEnquiry } = useApp()

  return (
    <article className="group flex h-full flex-col border border-brand-soft bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-black/20 hover:shadow-xl hover:shadow-brand-black/5">
      <Link to={`/products/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-brand-grey">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-brand-red transition duration-300 group-hover:scale-y-100" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-red">
          {product.brand}
        </p>
        <Link to={`/products/${product.id}`}>
          <h3 className="mt-2 line-clamp-2 font-display text-lg font-semibold text-brand-black transition group-hover:text-brand-red">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-brand-muted">{product.shortSpec}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Button as={Link} to={`/products/${product.id}`} size="sm" variant="outline">
            View Details
            <ArrowUpRight size={14} />
          </Button>
          <Button size="sm" onClick={() => openEnquiry(product)}>
            Enquire
          </Button>
        </div>
      </div>
    </article>
  )
}
