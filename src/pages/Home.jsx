import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  Headset,
  Layers,
  Lightbulb,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
} from 'lucide-react'
import {
  brands,
  categories,
  industries,
  products,
  SITE,
  stats,
  whyChoose,
} from '../data/products'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import CategoryCard from '../components/ui/CategoryCard'
import ProductCard from '../components/ui/ProductCard'
import BrandCard from '../components/ui/BrandCard'
import ContactForm from '../components/ui/ContactForm'
import { useApp } from '../context/AppContext'
import { useCountUp } from '../hooks/useHelpers'

const iconMap = { Award, ShieldCheck, Layers, Lightbulb, Scale, Headset }

const heroImages = [
  '/images/products/fan-ceiling.jpg',
  '/images/products/modular-switches.jpg',
  '/images/products/led-bulbs.jpg',
  '/images/products/wires-coils.jpg',
]

function StatItem({ value, suffix, label }) {
  const ref = useRef(null)
  const { value: count, start, started } = useCountUp(value)

  useEffect(() => {
    const el = ref.current
    if (!el || started) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start()
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [start, started])

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl font-extrabold text-brand-black sm:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-sm font-medium text-brand-muted">{label}</p>
    </div>
  )
}

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 8)
  const { openEnquiry } = useApp()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div className="absolute inset-0 geo-pattern opacity-80" />
        <div className="absolute -right-20 top-0 h-72 w-72 rotate-12 bg-brand-red/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-brand-red via-transparent to-transparent" />

        <div className="container-app relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-12 lg:py-24">
          <div className="animate-slide-up">
            <p className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              <span className="h-1.5 w-1.5 bg-brand-red" />
              Trusted Electrical Product Partner
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem]">
              POWERING HOMES.
              <br />
              <span className="text-white">BUILDING</span>{' '}
              <span className="text-brand-red">CONNECTIONS.</span>
            </h1>
            <div className="accent-line mt-6" />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Quality electrical and electronic products from trusted brands — for homes, businesses
              and projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/products" size="lg">
                Explore Products
                <ArrowRight size={18} />
              </Button>
              <Button as={Link} to="/contact" size="lg" variant="outlineLight">
                Talk To Us
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 animate-fade-in sm:gap-4">
            <div className="space-y-3 pt-0 sm:space-y-4">
              <div className="overflow-hidden border border-white/10">
                <img src={heroImages[0]} alt="Ceiling fans" className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="overflow-hidden border border-white/10">
                <img src={heroImages[1]} alt="Modular switches" className="aspect-[4/3] w-full object-cover" />
              </div>
            </div>
            <div className="mt-8 space-y-3 sm:mt-12 sm:space-y-4">
              <div className="overflow-hidden border border-white/10">
                <img src={heroImages[2]} alt="LED lights" className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="overflow-hidden border border-white/10">
                <img src={heroImages[3]} alt="Electrical wires" className="aspect-[4/5] w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-brand-soft bg-brand-grey">
        <div className="container-app grid grid-cols-2 gap-6 py-10 lg:grid-cols-4 lg:py-12">
          {stats.map((item) => (
            <StatItem key={item.label} {...item} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-app py-16 lg:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Catalogue"
            title="Explore Our Product Categories"
            subtitle="Everything you need for reliable electrical solutions, from trusted brands."
          />
          <Button as={Link} to="/categories" variant="outline" size="sm">
            View All
            <ArrowRight size={14} />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-brand-grey py-16 lg:py-20">
        <div className="container-app">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Showcase"
              title="Featured Products"
              subtitle="Quality products from brands you can trust."
            />
            <Button as={Link} to="/products" variant="outline" size="sm">
              View Catalogue
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="container-app py-16 lg:py-20">
        <SectionHeading
          eyebrow="Partners"
          title="Trusted Brands"
          subtitle="We deal in authentic products from leading electrical manufacturers."
          align="center"
          className="mb-10"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-brand-charcoal py-16 text-white lg:py-20">
        <div className="container-app">
          <SectionHeading
            light
            eyebrow="Advantage"
            title="Why Choose Seema Enterprise?"
            subtitle="A dependable partner for electrical products, guidance and project requirements."
            align="center"
            className="mb-10"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item) => {
              const Icon = iconMap[item.icon]
              return (
                <div
                  key={item.title}
                  className="border border-white/10 bg-white/5 p-6 transition hover:border-brand-red/50"
                >
                  <Icon className="text-brand-red" size={24} />
                  <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <Button as={Link} to="/why-us" variant="outlineLight">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="container-app py-16 lg:py-20">
        <SectionHeading
          eyebrow="Applications"
          title="Solutions For Every Requirement"
          subtitle="Serving residential, commercial and industrial electrical needs."
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item) => (
            <article key={item.title} className="group relative min-h-[240px] overflow-hidden bg-brand-black">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-45"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/70">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="border-y border-brand-soft bg-brand-grey py-16 lg:py-20">
        <div className="container-app grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Get In Touch"
              title="Looking For The Right Electrical Product?"
              subtitle="Tell us what you need and our team will help you find the right solution."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as="a" href={SITE.phoneHref} variant="dark">
                <Phone size={16} /> Call Us
              </Button>
              <Button as="a" href={SITE.whatsappHref} target="_blank" rel="noreferrer" variant="whatsapp">
                <MessageCircle size={16} /> WhatsApp Us
              </Button>
              <Button variant="outline" onClick={() => openEnquiry()}>
                Quick Enquiry
              </Button>
            </div>
          </div>
          <div className="border border-brand-soft bg-white p-6 sm:p-8">
            <ContactForm compact />
          </div>
        </div>
      </section>
    </div>
  )
}
