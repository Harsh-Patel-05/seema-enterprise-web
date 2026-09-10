import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { navLinks } from '../../data/products'
import { useScrolled, useScrollLock } from '../../hooks/useHelpers'
import { useApp } from '../../context/AppContext'
import Button from '../ui/Button'
import SearchBar from '../ui/SearchBar'
import Modal from '../ui/Modal'
import BrandLogo from '../ui/BrandLogo'

function MobileMenu({ open, onClose }) {
  useScrollLock(open)
  const { openEnquiry } = useApp()
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <button type="button" className="absolute inset-0 bg-brand-black/50" aria-label="Close menu" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-[min(100%,360px)] flex-col bg-white shadow-2xl animate-drawer">
        <div className="flex items-center justify-between border-b border-brand-soft px-4 py-4">
          <BrandLogo onClick={onClose} compact />
          <button type="button" onClick={onClose} className="p-2 text-brand-muted" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="border-b border-brand-soft p-4">
          <SearchBar onNavigate={onClose} />
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `block border-l-2 px-4 py-3 text-base font-semibold transition ${
                  isActive
                    ? 'border-brand-red bg-brand-grey text-brand-red'
                    : 'border-transparent text-brand-black hover:bg-brand-grey'
                }`
              }
            >
              {link.label === 'Why Us' ? 'Why Seema' : link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-brand-soft p-4">
          <Button
            className="w-full"
            onClick={() => {
              onClose()
              openEnquiry()
            }}
          >
            Enquire Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { openEnquiry } = useApp()

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-brand-soft/80 bg-white/90 shadow-md backdrop-blur-md'
          : 'border-transparent bg-white'
      }`}
    >
      <div
        className={`container-app flex items-center justify-between gap-4 transition-all ${
          scrolled ? 'h-[68px]' : 'h-[80px]'
        }`}
      >
        <BrandLogo className="shrink-0" />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-semibold transition ${
                  isActive ? 'text-brand-red' : 'text-brand-charcoal hover:text-brand-red'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="p-2.5 text-brand-black hover:text-brand-red lg:hidden"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <Button className="hidden sm:inline-flex" size="sm" onClick={() => openEnquiry()}>
            Enquire Now
          </Button>
          <button
            type="button"
            className="p-2.5 text-brand-black lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="Search Products">
        <SearchBar autoFocus onNavigate={() => setSearchOpen(false)} />
      </Modal>
    </header>
  )
}
