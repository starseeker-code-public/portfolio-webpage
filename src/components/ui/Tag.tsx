export function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
      {label}
    </span>
  )
}