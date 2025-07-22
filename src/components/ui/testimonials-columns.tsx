import React from "react"
import { motion } from "framer-motion"

export interface Testimonial {
  text: string
  image: string
  name: string
  role: string
}

interface TestimonialsColumnProps {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}

export const TestimonialsColumn: React.FC<TestimonialsColumnProps> = ({
  className,
  testimonials,
  duration = 12,
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_ignored, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={loopIdx + "-" + i}
                className="p-6 rounded-2xl border shadow-lg shadow-lawfirm-accent/10 max-w-xs w-full bg-white"
              >
                <p className="text-lawfirm-text leading-relaxed">{text}</p>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-lawfirm-text">{name}</span>
                    <span className="text-sm text-lawfirm-subtext">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
} 