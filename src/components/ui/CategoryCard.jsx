import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CategoryCard({ category, large = false }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className={`group relative block overflow-hidden bg-brand-charcoal ${
        large ? 'min-h-[320px]' : 'min-h-[260px]'
      }`}
    >
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-55"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
      <span className="absolute left-0 top-0 h-1 w-0 bg-brand-red transition-all duration-300 group-hover:w-full" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{category.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/70">{category.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
          Explore Category
          <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
