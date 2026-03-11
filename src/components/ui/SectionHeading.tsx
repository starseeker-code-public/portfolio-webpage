export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 flex items-center gap-3">
      <span className="text-indigo-400">◈</span> {children}
    </h2>
  )
}