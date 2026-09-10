export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = 'left',
  className = '',
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${
            light ? 'text-brand-red' : 'text-brand-red'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <div className={`accent-line mt-3 ${align === 'center' ? 'mx-auto' : ''}`} />
      <h2
        className={`mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? 'text-white' : 'text-brand-black'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base leading-relaxed ${light ? 'text-white/65' : 'text-brand-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
