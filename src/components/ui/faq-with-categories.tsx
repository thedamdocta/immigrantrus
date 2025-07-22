"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqSectionWithCategoriesProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  description?: string
  items: {
    question: string
    answer: string
    category?: string
  }[]
  contactInfo?: {
    title: string
    description?: string
    buttonText: string
    onContact?: () => void
  }
}

export const FaqSectionWithCategories = React.forwardRef<HTMLElement, FaqSectionWithCategoriesProps>(
  ({ className, title, description, items, contactInfo, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("py-24 bg-lawfirm-secondaryBackground", className)} {...props}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-serif font-semibold text-lawfirm-text">{title}</h2>
            {description && <p className="text-lawfirm-subtext">{description}</p>}
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="rounded-xl bg-white border border-gray-200 shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline data-[state=open]:border-b data-[state=open]:border-gray-200">
                  <div className="flex flex-col gap-2">
                    {item.category && (
                      <Badge variant="secondary" className="w-fit text-xs font-normal">
                        {item.category}
                      </Badge>
                    )}
                    <h3 className="text-lg font-medium text-lawfirm-text group-hover:text-lawfirm-accent">
                      {item.question}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-4 pb-6">
                  <p className="text-lawfirm-subtext leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {contactInfo && (
            <div className="mt-12 text-center">
              <p className="text-lawfirm-subtext mb-4">{contactInfo.title}</p>
              {contactInfo.description && (
                <p className="text-sm text-lawfirm-subtext mb-4">{contactInfo.description}</p>
              )}
              <Button size="sm" onClick={contactInfo.onContact} className="bg-lawfirm-accent text-white hover:bg-lawfirm-accent/90">
                {contactInfo.buttonText}
              </Button>
            </div>
          )}
        </div>
      </section>
    )
  },
)
FaqSectionWithCategories.displayName = "FaqSectionWithCategories" 