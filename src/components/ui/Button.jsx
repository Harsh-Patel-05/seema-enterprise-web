import { cn } from '../../utils/helpers'

const variants = {
  primary:
    'bg-brand-red text-white hover:bg-brand-red-dark shadow-sm shadow-brand-red/20',
  dark: 'bg-brand-black text-white hover:bg-brand-charcoal',
  outline:
    'border border-brand-soft bg-transparent text-brand-black hover:border-brand-black',
  outlineLight:
    'border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/5',
  ghost: 'bg-transparent text-brand-black hover:bg-brand-grey',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1ebe57]',
}

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
