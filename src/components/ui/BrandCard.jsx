import { Link } from 'react-router-dom'

export default function BrandCard({ brand }) {
  return (
    <Link
      to={`/products?brand=${brand.id}`}
      className="group relative flex h-36 flex-col items-center justify-center gap-2 border border-brand-soft bg-white px-4 text-center transition duration-300 hover:-translate-y-1 hover:border-brand-red hover:shadow-lg"
    >
      <span className="absolute left-0 top-0 h-full w-0 bg-brand-red transition-all duration-300 group-hover:w-1" />
      <img
        src={brand.logo || brand.image}
        alt={`${brand.name} logo`}
        className="h-14 w-auto max-w-[180px] object-contain"
        loading="lazy"
      />
      <div>
        <p className="font-display text-sm font-bold tracking-tight text-brand-black transition group-hover:text-brand-red sm:text-base">
          {brand.name}
        </p>
        <p className="mt-0.5 text-xs text-brand-muted">{brand.productCount} products</p>
      </div>
    </Link>
  )
}
