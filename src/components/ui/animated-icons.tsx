import { motion } from "framer-motion"
import {
  Scale,
  Clock,
  Shield,
  Award,
  Heart,
  CheckCircle,
} from "lucide-react"

const loop = (duration: number) => ({ repeat: Infinity, duration, ease: "easeInOut" as const })

export const AnimatedScale = (props: React.ComponentProps<typeof Scale>) => (
  <motion.div initial={{ rotate: 0 }} animate={{ rotate: [0, 8, -8, 0] }} transition={loop(4)}>
    <Scale {...props} />
  </motion.div>
)

export const AnimatedClock = (props: React.ComponentProps<typeof Clock>) => (
  <motion.div initial={{ scale: 0.9 }} animate={{ scale: [0.9, 1.1, 0.9] }} transition={loop(3)}>
    <Clock {...props} />
  </motion.div>
)

export const AnimatedShield = (props: React.ComponentProps<typeof Shield>) => (
  <motion.div initial={{ rotate: 0 }} animate={{ rotate: [0, 3, -3, 0] }} transition={loop(5)}>
    <Shield {...props} />
  </motion.div>
)

export const AnimatedAward = (props: React.ComponentProps<typeof Award>) => (
  <motion.div initial={{ y: 0 }} animate={{ y: [0, -6, 0] }} transition={loop(3.5)}>
    <Award {...props} />
  </motion.div>
)

export const AnimatedHeart = (props: React.ComponentProps<typeof Heart>) => (
  <motion.div initial={{ scale: 1 }} animate={{ scale: [1, 1.15, 1] }} transition={loop(2.8)}>
    <Heart {...props} />
  </motion.div>
)

export const AnimatedCheck = (props: React.ComponentProps<typeof CheckCircle>) => (
  <motion.div initial={{ rotate: -10 }} animate={{ rotate: [-10, 10, -10] }} transition={loop(4.2)}>
    <CheckCircle {...props} />
  </motion.div>
) 