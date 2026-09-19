interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
}
export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative z-10 px-4 sm:px-6 py-16 sm:py-20 max-w-4xl xl:max-w-5xl mx-auto ${className}`}>
      {children}
    </section>
  )
}