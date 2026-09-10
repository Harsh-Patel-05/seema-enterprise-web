import { useEffect, useRef } from 'react'
import { values, stats } from '../data/products'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import { useCountUp } from '../hooks/useHelpers'

function Counter({ end, suffix, label }) {
  const ref = useRef(null)
  const { value, start, started } = useCountUp(end)

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
    <div ref={ref} className="border border-brand-soft bg-white p-6 text-center">
      <p className="font-display text-3xl font-extrabold text-brand-black sm:text-4xl">
        {value}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-brand-muted">{label}</p>
    </div>
  )
}

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-black py-16 text-white lg:py-24">
        <div className="absolute inset-0 geo-pattern" />
        <div className="container-app relative">
          <Breadcrumb items={[{ label: 'About Us' }]} light />
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            POWERING EVERY <span className="text-brand-red">CONNECTION</span>
          </h1>
          <div className="accent-line mt-6" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Seema Enterprise is committed to providing quality electrical and electronic products from
            trusted brands for residential, commercial and industrial requirements.
          </p>
        </div>
      </section>

      <section className="container-app grid gap-6 py-14 lg:grid-cols-3 lg:py-20">
        {[
          {
            title: 'Our Story',
            text: 'Built around a simple promise — make genuine electrical products accessible with clear guidance and dependable service for every customer and project.',
          },
          {
            title: 'Our Mission',
            text: 'To deliver authentic electrical solutions that keep homes and businesses safe, efficient and well-powered.',
          },
          {
            title: 'Our Vision',
            text: 'To be the most trusted electrical solutions partner known for quality, reliability and customer-first service.',
          },
        ].map((block) => (
          <article key={block.title} className="border border-brand-soft p-6">
            <div className="accent-line" />
            <h2 className="mt-4 font-display text-xl font-bold text-brand-black">{block.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">{block.text}</p>
          </article>
        ))}
      </section>

      <section className="bg-brand-grey py-14 lg:py-20">
        <div className="container-app">
          <SectionHeading
            eyebrow="Values"
            title="Our Values"
            subtitle="The principles that guide every recommendation and every customer interaction."
            className="mb-8"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((item) => (
              <div key={item.title} className="border border-brand-soft bg-white p-5">
                <h3 className="font-display text-lg font-bold text-brand-black">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((item) => (
              <Counter key={item.label} end={item.value} suffix={item.suffix} label={item.label} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
