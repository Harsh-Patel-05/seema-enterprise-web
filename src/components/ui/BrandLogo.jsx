import { Link } from 'react-router-dom'
import logoMark from '../../assets/logo-mark.png'
import logoMarkLight from '../../assets/logo-mark-light.png'

export default function BrandLogo({
  to = '/',
  light = false,
  className = '',
  compact = false,
  onClick,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Seema Enterprise Home"
    >
      <span
        className={`flex shrink-0 items-center justify-center overflow-hidden ${
          compact ? 'h-10 w-10' : 'h-12 w-12 sm:h-14 sm:w-14'
        }`}
      >
        <img
          src={light ? logoMarkLight : logoMark}
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      </span>

      <span className="flex min-w-0 flex-col justify-center">
        <span
          className={`font-display font-extrabold uppercase leading-none tracking-[0.08em] ${
            compact ? 'text-lg' : 'text-[1.35rem] sm:text-[1.65rem]'
          } ${light ? 'text-white' : 'text-brand-black'}`}
        >
          SEEMA
        </span>
        <span
          className={`mt-1.5 font-bold uppercase leading-none ${
            compact
              ? 'text-[0.62rem] tracking-[0.35em]'
              : 'text-[0.68rem] tracking-[0.42em] sm:text-[0.72rem] sm:tracking-[0.48em]'
          } ${light ? 'text-white/85' : 'text-[#333333]'}`}
        >
          ENTERPRISE
        </span>
        <span
          className={`mt-2 block h-[3px] bg-brand-red transition-all duration-300 group-hover:w-14 ${
            compact ? 'w-7' : 'w-10 sm:w-12'
          }`}
        />
      </span>
    </Link>
  )
}
