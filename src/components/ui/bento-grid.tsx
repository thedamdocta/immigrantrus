import { cn } from "@/lib/utils"
import React from "react"

// Grid wrapper – 3 cols mobile, 4 cols lg, same gap
export const BentoGrid: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => (
  <div
    className={cn(
      "grid auto-rows-[180px] grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:auto-rows-[220px]",  // responsive cols
      className,
    )}
    {...rest}
  >
    {children}
  </div>
)

// Single card in the grid
interface BentoCardProps {
  className?: string // custom spans: e.g. "col-span-3 lg:col-span-2"
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  name: string
  description: string
  imgSrc?: string // optional background image
  background?: React.ReactNode
  verticalFade?: boolean // true = fade top->bottom, false = left->right
}

export const BentoCard: React.FC<BentoCardProps> = ({
  className,
  Icon,
  name,
  description,
  background,
  imgSrc,
  verticalFade = false,
}) => (
  <div
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900",
      className,
    )}
  >
    {/* bg image */}
    {imgSrc && (
      <>
        {/* image layer */}
        <img
          src={imgSrc}
          alt="card bg"
          className="absolute inset-0 z-[0] h-full w-full rounded-2xl object-cover object-center" />
        {/* overlay: fades image from transparent (left) to opaque (right) */}
        {verticalFade ? (
          <div
            className="absolute inset-0 z-[1] rounded-2xl"
            style={{
              background:
                "linear-gradient(to top, rgba(255,255,255,0.95) 70%, rgba(255,255,255,0) 100%)",
            }}
          />
        ) : (
          <div className="absolute inset-0 z-[1] rounded-2xl bg-gradient-to-r from-white via-white/90 to-transparent" />
        )}
      </>
    )}
    {background}
    {/* content */}
    <div className="relative z-10 flex flex-col gap-4">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-lawfirm-accent/10">
        <Icon className="h-6 w-6 text-lawfirm-accent" />
      </div>
      <div>
        <p className="font-serif text-lg font-semibold text-lawfirm-text">{name}</p>
        <p className="mt-1 text-sm text-lawfirm-subtext leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
) 