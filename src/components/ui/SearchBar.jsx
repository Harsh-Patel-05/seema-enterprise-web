import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { products } from '../../data/products'
import { searchSuggestions } from '../../utils/helpers'
import { useDebounce } from '../../hooks/useHelpers'

export default function SearchBar({ onNavigate, className = '', autoFocus = false }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const debounced = useDebounce(query)
  const suggestions = searchSuggestions(products, debounced)
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const submit = (e) => {
    e?.preventDefault()
    if (!query.trim()) return
    setOpen(false)
    onNavigate?.()
    navigate(`/products?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <form onSubmit={submit} className="relative">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products, brands, categories..."
          className="h-11 w-full border border-brand-soft bg-white pl-10 pr-10 text-sm outline-none transition focus:border-brand-red"
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted"
            aria-label="Clear"
          >
            <X size={14} />
          </button>
        )}
      </form>

      {open && debounced.trim() && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden border border-brand-soft bg-white shadow-xl">
          {suggestions.length === 0 ? (
            <p className="px-4 py-3 text-sm text-brand-muted">No matches for “{debounced}”</p>
          ) : (
            <ul>
              {suggestions.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/products/${item.id}`}
                    onClick={() => {
                      setOpen(false)
                      setQuery('')
                      onNavigate?.()
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 transition hover:bg-brand-grey"
                  >
                    <img src={item.image} alt="" className="h-11 w-11 object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-brand-black">{item.name}</p>
                      <p className="text-xs text-brand-muted">
                        {item.brand} · {item.category}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={submit}
                  className="w-full border-t border-brand-soft px-4 py-2.5 text-left text-sm font-semibold text-brand-red hover:bg-brand-grey"
                >
                  View all results for “{debounced}”
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
