import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MessageCircle, Phone } from 'lucide-react'
import { products, SITE } from '../data/products'
import { getRelatedProducts } from '../utils/helpers'
import Breadcrumb from '../components/ui/Breadcrumb'
import Button from '../components/ui/Button'
import ProductCard from '../components/ui/ProductCard'
import { useApp } from '../context/AppContext'

const tabs = ['Specifications', 'Features', 'Applications']

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { openEnquiry } = useApp()
  const [activeImage, setActiveImage] = useState(0)
  const [tab, setTab] = useState('Specifications')

  const related = useMemo(
    () => (product ? getRelatedProducts(products, product, 4) : []),
    [product]
  )

  if (!product) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Product not found</h1>
        <Button as={Link} to="/products" className="mt-4">
          Back to Catalogue
        </Button>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [product.image]
  const whatsappText = encodeURIComponent(`Hi, I want to enquire about ${product.name}`)

  return (
    <div className="container-app py-8 lg:py-12">
      <Breadcrumb
        items={[
          { label: 'Products', to: '/products' },
          { label: product.category, to: `/products?category=${product.categoryId}` },
          { label: product.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="overflow-hidden border border-brand-soft bg-brand-grey">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`shrink-0 border-2 ${
                  activeImage === i ? 'border-brand-red' : 'border-brand-soft'
                }`}
              >
                <img src={img} alt="" className="h-16 w-16 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-brand-black sm:text-4xl">
            {product.name}
          </h1>
          <div className="accent-line mt-4" />
          <p className="mt-4 text-base leading-relaxed text-brand-muted">{product.description}</p>
          <p className="mt-3 text-sm font-medium text-brand-black">{product.shortSpec}</p>
          <p className="mt-2 text-sm text-brand-muted">SKU: {product.sku}</p>
          <p
            className={`mt-3 text-sm font-semibold ${
              product.available ? 'text-emerald-700' : 'text-brand-red'
            }`}
          >
            {product.available ? 'Available for enquiry' : 'Currently unavailable'}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" onClick={() => openEnquiry(product)}>
              Send Enquiry
            </Button>
            <Button as={Link} to="/contact" size="lg" variant="dark">
              Contact Us
            </Button>
            <Button
              as="a"
              href={`${SITE.whatsappHref}?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              size="lg"
              variant="whatsapp"
            >
              <MessageCircle size={16} />
              WhatsApp Enquiry
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-brand-muted">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 hover:text-brand-red">
              <Phone size={15} /> {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex gap-1 overflow-x-auto border-b border-brand-soft">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                tab === t
                  ? 'border-brand-red text-brand-red'
                  : 'border-transparent text-brand-muted hover:text-brand-black'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="border border-t-0 border-brand-soft bg-white p-5 sm:p-6">
          {tab === 'Specifications' && (
            <dl className="grid gap-3 sm:grid-cols-2">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key} className="bg-brand-grey px-4 py-3">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                    {key}
                  </dt>
                  <dd className="mt-1 font-semibold text-brand-black">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === 'Features' && (
            <ul className="grid gap-2 sm:grid-cols-2">
              {(product.features || []).map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-brand-charcoal">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
          {tab === 'Applications' && (
            <ul className="grid gap-2 sm:grid-cols-2">
              {(product.applications || []).map((app) => (
                <li key={app} className="flex items-start gap-2 text-brand-charcoal">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                  {app}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-brand-black">Related Products</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
