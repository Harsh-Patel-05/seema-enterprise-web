import { Link } from 'react-router-dom'
import {
  Award,
  Headset,
  Layers,
  Lightbulb,
  Scale,
  ShieldCheck,
} from 'lucide-react'
import { industries, whyChoose } from '../data/products'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { useApp } from '../context/AppContext'

const iconMap = { Award, ShieldCheck, Layers, Lightbulb, Scale, Headset }

export default function WhyUs() {
  const { openEnquiry } = useApp()

  return (
    <div>
      <section className="bg-brand-black py-12 text-white lg:py-16">
        <div className="container-app">
          <Breadcrumb items={[{ label: 'Why Us' }]} light />
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            WHY CHOOSE SEEMA ENTERPRISE?
          </h1>
          <div className="accent-line mt-4" />
          <p className="mt-4 max-w-2xl text-white/65">
            A premium electrical partner focused on quality products, trusted brands and practical
            guidance.
          </p>
        </div>
      </section>

      <section className="container-app py-14 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <article
                key={item.title}
                className="group border border-brand-soft p-6 transition hover:border-brand-red"
              >
                <Icon className="text-brand-red" size={28} />
                <h2 className="mt-4 font-display text-xl font-bold text-brand-black">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-brand-grey py-14 lg:py-20">
        <div className="container-app">
          <SectionHeading
            eyebrow="Applications"
            title="Solutions For Every Requirement"
            className="mb-8"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((item) => (
              <article key={item.title} className="relative min-h-[220px] overflow-hidden bg-brand-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-55"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app py-14 text-center lg:py-16">
        <h2 className="font-display text-3xl font-bold text-brand-black">Ready to discuss your requirement?</h2>
        <p className="mt-3 text-brand-muted">Talk to our team for product guidance and quotations.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={() => openEnquiry()}>Enquire Now</Button>
          <Button as={Link} to="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  )
}
