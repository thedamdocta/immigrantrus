"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export interface Gallery4Item {
  id: string
  title: string
  description: string
  href: string
  image: string
}

export interface Gallery4Props {
  title?: string
  description?: string
  items: Gallery4Item[]
}

export const Gallery4 = ({
  title = "Legal Insights",
  description = "Stay informed with our latest legal insights and news.",
  items,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }

    update()
    carouselApi.on("select", update)

    return () => {
      carouselApi.off("select", update)
    }
  }, [carouselApi])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-lawfirm-text">
              {title}
            </h2>
            <p className="text-lawfirm-subtext mt-3 max-w-xl mx-auto md:mx-0">
              {description}
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Carousel setApi={setCarouselApi}>
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={item.id} className="max-w-[320px] pl-4 lg:max-w-[360px]">
                <a href={item.href} className="group rounded-xl block overflow-hidden">
                  <div className="relative h-full min-h-[24rem] overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* overlay as flex container to align content */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                      <div className="p-6 md:p-8 text-white">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3rem]">{item.title}</h3>
                        <p className="text-sm opacity-90 line-clamp-2 mb-4 min-h-[3rem]">{item.description}</p>
                        <span className="inline-flex items-center text-sm font-medium">
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Mobile arrows */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            <CarouselPrevious />
            <CarouselNext />
          </div>
          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${currentSlide === idx ? 'bg-lawfirm-accent' : 'bg-gray-300'}`}
                onClick={() => carouselApi?.scrollTo(idx)}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  )
} 