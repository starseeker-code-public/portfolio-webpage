export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[1.35rem] sm:text-[1.8rem] md:text-[2.4rem] font-bold text-white mb-8 sm:mb-10 flex items-center gap-2 sm:gap-3 tracking-[0.05em] break-words"
      style={{ fontFamily: 'Exo 2' }}
    >
      <span className="text-indigo-400 shrink-0">◈</span>
      <span>{children}</span>
    </h2>
  )
}