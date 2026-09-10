import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react'
import { SITE } from '../data/products'
import Breadcrumb from '../components/ui/Breadcrumb'
import Button from '../components/ui/Button'
import ContactForm from '../components/ui/ContactForm'

export default function Contact() {
  return (
    <div>
      <section className="bg-brand-black py-12 text-white lg:py-16">
        <div className="container-app">
          <Breadcrumb items={[{ label: 'Contact' }]} light />
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <div className="accent-line mt-4" />
          <p className="mt-4 max-w-2xl text-white/65">
            Reach out for product enquiries, quotations or project requirements.
          </p>
        </div>
      </section>

      <div className="container-app grid gap-8 py-12 lg:grid-cols-2 lg:py-16">
        <div className="space-y-5">
          <div className="border border-brand-soft p-6">
            <h2 className="font-display text-xl font-bold text-brand-black">Contact Information</h2>
            <ul className="mt-5 space-y-4">
              {[
                { icon: Phone, label: 'Phone', value: SITE.phone, href: SITE.phoneHref },
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  value: SITE.whatsapp,
                  href: SITE.whatsappHref,
                  external: true,
                },
                { icon: Mail, label: 'Email', value: SITE.email, href: SITE.emailHref },
                { icon: MapPin, label: 'Address', value: SITE.address },
              ].map((item) => (
                <li key={item.label} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-grey text-brand-red">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel="noreferrer"
                        className="font-semibold text-brand-black hover:text-brand-red"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-brand-black">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-grey text-brand-red">
                  <Clock size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                    Business Hours
                  </p>
                  <p className="mt-1 font-semibold text-brand-black">{SITE.hours}</p>
                  <ul className="mt-2 space-y-1 text-sm text-brand-muted">
                    {SITE.hoursList.map((row) => (
                      <li key={row.day} className="flex justify-between gap-4">
                        <span>{row.day}</span>
                        <span className="font-medium text-brand-black">{row.time}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-brand-muted">{SITE.hoursNote}</p>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                as="a"
                href={SITE.mapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                size="sm"
                variant="outline"
              >
                <Navigation size={14} /> Get Directions
              </Button>
              <Button as="a" href={SITE.phoneHref} size="sm" variant="dark">
                <Phone size={14} /> Call Now
              </Button>
              <Button as="a" href={SITE.whatsappHref} target="_blank" rel="noreferrer" size="sm" variant="whatsapp">
                <MessageCircle size={14} /> WhatsApp
              </Button>
            </div>
          </div>

          <div className="overflow-hidden border border-brand-soft">
            <iframe
              title="Seema Enterprise location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.7526731549756!2d73.41010547599056!3d22.135403748850802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fe1152d6a9c09%3A0x6ae25465bc10504d!2sSeema%20Enterprise!5e0!3m2!1sen!2sin!4v1788935657427!5m2!1sen!2sin"
              className="aspect-[16/10] h-auto w-full min-h-[280px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="border border-brand-soft bg-white p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
