export default function Footer() {
  return (
    <footer className="py-10 text-center border-t bg-slate-100 dark:bg-slate-900">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        © {new Date().getFullYear()} MITS Gwalior NOC System. All rights reserved.
      </p>
    </footer>
  )
}