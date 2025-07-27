"use client"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React from "react"

interface ModalProps {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const Modal: React.FC<ModalProps> = ({ trigger, children, className }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm" />
      <Dialog.Content asChild>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={cn(
            "fixed inset-0 z-[70] flex items-center justify-center p-4",
            className
          )}
        >
          <div className="relative w-full max-w-md rounded-xl bg-background/90 shadow-lg backdrop-blur-xl">
            <Dialog.Close aria-label="Close" className="absolute right-4 top-4 text-muted-foreground focus:outline-none">
              <X className="h-5 w-5" />
            </Dialog.Close>
            {children}
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
) 