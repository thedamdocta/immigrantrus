import { motion } from "framer-motion"

const flags = [
  { code: "ag", name: "Antigua and Barbuda" },
  { code: "bs", name: "Bahamas" },
  { code: "bb", name: "Barbados" },
  { code: "bz", name: "Belize" },
  { code: "cu", name: "Cuba" },
  { code: "dm", name: "Dominica" },
  { code: "do", name: "Dominican Republic" },
  { code: "gd", name: "Grenada" },
  { code: "gy", name: "Guyana" },
  { code: "ht", name: "Haiti" },
  { code: "jm", name: "Jamaica" },
  { code: "kn", name: "Saint Kitts and Nevis" },
  { code: "lc", name: "Saint Lucia" },
  { code: "vc", name: "Saint Vincent and the Grenadines" },
  { code: "sr", name: "Suriname" },
  { code: "tt", name: "Trinidad and Tobago" },
]

const flagUrl = (code: string) => `https://flagcdn.com/w320/${code}.png`

export function LogoCarousel() {
  const duplicated = [...flags, ...flags]

  return (
    <div className="overflow-x-hidden py-12 bg-white">
      <motion.div
        className="flex items-center gap-12"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {duplicated.map((flag, idx) => (
          <img
            key={`${flag.code}-${idx}`}
            src={flagUrl(flag.code)}
            alt={flag.name}
            className="h-12 w-auto select-none pointer-events-none"
            loading="lazy"
          />
        ))}
      </motion.div>
    </div>
  )
} 