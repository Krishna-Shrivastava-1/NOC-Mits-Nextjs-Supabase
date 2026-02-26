"use client"
import { motion } from "framer-motion"
import { FileText, Activity, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Digital NOC Requests",
    desc: "Submit and track applications online without paperwork.",
  },
  {
    icon: Activity,
    title: "Real-time Tracking",
    desc: "Monitor status updates instantly with transparent workflows.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Role Access",
    desc: "Admin, Faculty & Student dashboards with full security.",
  },
]

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 px-6 bg-gradient-to-b from-white to-slate-100 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Why Choose Our System?
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Smart, Secure & Seamless NOC Management
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition"
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                <Icon size={22} />
              </div>

              <h3 className="text-xl font-semibold mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}