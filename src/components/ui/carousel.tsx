"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type CarouselApi = UseEmblaCarouselType[1]
export type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]
export type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1]

interface CarouselContextValue {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: CarouselApi | undefined
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)
export function useCarousel() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error("useCarousel must be inside <Carousel />")
  return ctx
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    { className, children, opts, plugins, orientation = "horizontal", setApi, ...props },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins,
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }, [])

    React.useEffect(() => {
      if (!api) return
      setApi?.(api)
      onSelect(api)
      api.on("select", onSelect)
      api.on("reInit", onSelect)
      return () => {
        api.off("select", onSelect)
      }
    }, [api, onSelect, setApi])

    return (
      <CarouselContext.Provider
        value={{ carouselRef, api, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
      >
        <div ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = "Carousel"

export const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)
CarouselContent.displayName = "CarouselContent"

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className,
        )}
        {...props}
      />
    )
  },
)
CarouselItem.displayName = "CarouselItem"

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev, orientation } = useCarousel()
    return (
      <Button
        ref={ref}
        size="icon"
        variant="ghost"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={cn(
          "absolute h-8 w-8 rounded-full disabled:pointer-events-auto",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    )
  },
)
CarouselPrevious.displayName = "CarouselPrevious"

export const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext, orientation } = useCarousel()
    return (
      <Button
        ref={ref}
        size="icon"
        variant="ghost"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={cn(
          "absolute h-8 w-8 rounded-full disabled:pointer-events-auto",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  },
)
CarouselNext.displayName = "CarouselNext" 