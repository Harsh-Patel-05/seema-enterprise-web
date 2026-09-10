import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { SITE, categories, navLinks } from '../../data/products'
import BrandLogo from '../ui/BrandLogo'

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-black text-white">
      <div className="h-1 w-full bg-brand-red" />
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandLogo light />
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Premium electrical and electronic solutions from trusted brands for homes, businesses and
            projects.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em]">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks
              .filter((l) => ['/about', '/why-us', '/brands'].includes(l.path))
              .map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/60 transition hover:text-brand-red">
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em]">Products</h3>
          <ul className="mt-4 space-y-2.5">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/products?category=${cat.id}`}
                  className="text-sm text-white/60 transition hover:text-brand-red"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em]">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex gap-2">
              <Phone size={15} className="mt-0.5 shrink-0 text-brand-red" />
              <a href={SITE.phoneHref} className="hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <MessageCircle size={15} className="mt-0.5 shrink-0 text-brand-red" />
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="hover:text-white">
                WhatsApp
              </a>
            </li>
            <li className="flex gap-2">
              <Mail size={15} className="mt-0.5 shrink-0 text-brand-red" />
              <a href={SITE.emailHref} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-brand-red" />
              {SITE.address}
            </li>
          </ul>
          <div className="mt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Quick Links</h4>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {['/', '/products', '/categories', '/contact'].map((path) => {
                const link = navLinks.find((l) => l.path === path)
                return (
                  <Link key={path} to={path} className="text-sm text-white/60 hover:text-brand-red">
                    {link?.label || 'Home'}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-white/40 sm:flex-row sm:text-left">
          <p>© 2026 Seema Enterprise. All Rights Reserved.</p>
          <p>Electrical Solutions · Product Catalogue · Enquiry Platform</p>
        </div>
      </div>
    </footer>
  )
}
