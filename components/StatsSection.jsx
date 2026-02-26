"use client"
import { motion } from "framer-motion"

export default function StatsSection() {
  return (
    <section className="py-24 bg-indigo-600 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        {[
          { number: "10K+", label: "Students" },
          { number: "500+", label: "Faculty" },
          { number: "98%", label: "Approval Rate" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold">{stat.number}</h3>
            <p className="mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}