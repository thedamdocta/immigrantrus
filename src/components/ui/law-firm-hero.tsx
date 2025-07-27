import React from 'react'
import { ArrowRight, ChevronRight, Menu, X, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import { animate } from 'framer-motion'
import { Modal } from "@/components/ui/modal"
import SignupForm from "@/components/ui/registration"

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function LawFirmHeroSection() {
    return (
        <div className="overflow-x-hidden">
            <LawFirmHeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="-z-30 absolute inset-0 pointer-events-none isolate opacity-50 contain-strict overflow-hidden">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)] hidden lg:block" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%] hidden lg:block" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] hidden lg:block" />
                </div>
                <section className="relative h-screen flex items-center justify-center bg-[url('/hero-image.png')] bg-cover bg-center bg-no-repeat overflow-x-hidden">
                    
                    {/* Dark overlay to enhance image contrast */}
                    <div className="absolute inset-0 -z-10 bg-black/20"></div>
                    
                    {/* Hero Content - ALL BLACK TEXT */}
                    <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
                        {/* Badge */}
                        <div className="bg-gray-100 border border-gray-200 group mx-auto flex w-fit items-center gap-4 rounded-full p-1 pl-4 shadow-md transition-all duration-300 mb-8">
                            <span className="text-gray-800 text-sm font-medium">Trusted Advisors Since 1994</span>
                            <span className="block h-4 w-0.5 border-l bg-gray-300"></span>
                            <div className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 size-6 overflow-hidden rounded-full duration-500">
                                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                    <span className="flex size-6">
                                        <ArrowRight className="m-auto size-3 text-white" />
                                    </span>
                                    <span className="flex size-6">
                                        <ArrowRight className="m-auto size-3 text-white" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Main Headline - BLACK TEXT WITH SHADOW */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight mb-8 drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.6)'}}>
                            Immigrants Helping Immigrants.
                        </h1>
                        
                        {/* Subtitle - DARK GRAY TEXT WITH SHADOW */}
                        <p className="text-xl md:text-2xl text-white font-sans leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-md" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
                            Expert legal representation with decades of experience.<br className="hidden md:block"/>From immigration, estate planning to wealth building.<br className="hidden md:block"/>We're here to help you and to protect your rights.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg">
                                Schedule Consultation
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-xl px-8 py-4 text-lg text-gray-800 hover:bg-gray-100 border-2 border-gray-300">
                                Our Practice Areas
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

const menuItems = [
    { name: 'Practice Areas', mobileLabel: 'Practice', href: '#practice' },
    { name: 'About Us', mobileLabel: 'About', href: '#about' },
    { name: 'Team', mobileLabel: 'Team', href: '#team' },
    { name: 'Contact', mobileLabel: 'Contact', href: '#contact' },
]

const LawFirmHeroHeader = () => {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Smooth scroll handler using framer-motion
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault()
        const id = href.replace('#', '')
        const el = document.getElementById(id)
        if (!el) return

        const y = el.getBoundingClientRect().top + window.pageYOffset - 80 // offset for navbar
        animate(window.scrollY, y, {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            onUpdate: latest => window.scrollTo(0, latest),
        })
    }
    
    const scrollToTop = () => {
        animate(window.scrollY, 0, {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            onUpdate: latest => window.scrollTo(0, latest),
        })
    }
    
    return (
        <header>
            <nav className="fixed z-50 w-full">
                <div className={cn('mt-2 transition-all duration-300', 
                    isScrolled 
                        ? 'bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl max-w-[95%] sm:w-fit sm:px-6 mx-auto' 
                        : 'max-w-[95%] sm:w-fit sm:px-6 mx-auto'
                )}>
                    {/* Mobile Layout - Evenly spaced */}
                    <div className="flex items-center justify-evenly py-3 px-2 sm:hidden">
                        {/* Logo */}
                        <button onClick={scrollToTop} className="focus:outline-none">
                            <Scale className="h-5 w-5 text-lawfirm-accent" />
                        </button>
                        
                        {/* Navigation Items - Better spacing */}
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                onClick={(e) => handleLinkClick(e, item.href)}
                                className={cn(
                                    isScrolled ? 'text-gray-700' : 'text-white', 
                                    'hover:text-lawfirm-accent duration-150 font-medium text-xs px-2'
                                )}>
                                {item.mobileLabel}
                            </a>
                        ))}
                        
                        {/* Get Started Button */}
                        <Modal
                            trigger={
                                <Button
                                    size="sm"
                                    className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white rounded-md px-3 py-1 text-xs whitespace-nowrap">
                                    Get Started
                                </Button>
                            }
                        >
                            <SignupForm />
                        </Modal>
                    </div>

                    {/* Desktop Layout - Centered for larger screens */}
                    <div className={cn('hidden sm:flex items-center justify-between py-3 px-4 lg:px-6 transition-all duration-300', 
                        isScrolled 
                            ? 'max-w-5xl mx-auto' 
                            : 'max-w-6xl mx-auto'
                    )}>
                        {/* Logo */}
                        <button onClick={scrollToTop} className="flex items-center space-x-2 focus:outline-none">
                            <Scale className="h-8 w-8 text-lawfirm-accent" />
                            <span className={cn('text-xl font-serif font-medium tracking-wide hidden lg:block', isScrolled ? 'text-gray-900' : 'text-white')}>
                                Immigrants R Us
                            </span>
                        </button>

                        {/* Navigation Items */}
                        <ul className={cn('flex items-center transition-all duration-300', 
                            isScrolled ? 'gap-4 lg:gap-5' : 'gap-6 lg:gap-8'
                        )}>
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleLinkClick(e, item.href)}
                                        className={cn(
                                            isScrolled ? 'text-gray-700' : 'text-white', 
                                            'hover:text-lawfirm-accent transition-all duration-300 font-medium text-sm'
                                        )}>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Get Started Button */}
                        <Modal
                            trigger={
                                <Button
                                    size="sm"
                                    className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white rounded-md px-6 text-sm">
                                    Get Started
                                </Button>
                            }
                        >
                            <SignupForm />
                        </Modal>
                    </div>
                </div>
            </nav>
        </header>
    )
}
