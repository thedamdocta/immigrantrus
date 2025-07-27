import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

interface CountUpProps {
  from?: number
  to: number
  duration?: number // seconds
  className?: string
  delay?: number
  format?: (v: number) => string
}

export const CountUp: React.FC<CountUpProps> = ({
  from = 0,
  to,
  duration = 2.5,
  className,
  delay = 0,
  format,
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: true })

  const motionVal = useMotionValue(from)
  const spring = useSpring(motionVal, { duration, damping: 20, stiffness: 100 })
  const rounded = useTransform(spring, (latest) => {
    const v = Math.round(latest)
    return format ? format(v) : v.toLocaleString()
  })

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      motionVal.set(to)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [isInView, to, delay])

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>
} 