import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items = [], light = false }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        className={`flex flex-wrap items-center gap-1 text-sm ${
          light ? 'text-white/55' : 'text-brand-muted'
        }`}
      >
        <li>
          <Link to="/" className={light ? 'hover:text-white' : 'hover:text-brand-red'}>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronRight size={14} className="opacity-50" />
            {item.to && index < items.length - 1 ? (
              <Link to={item.to} className={light ? 'hover:text-white' : 'hover:text-brand-red'}>
                {item.label}
              </Link>
            ) : (
              <span className={light ? 'font-medium text-white' : 'font-medium text-brand-black'}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
