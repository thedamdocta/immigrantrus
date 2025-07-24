import React from 'react'
import { ArrowRight, ChevronRight, Menu, X, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import { animate } from 'framer-motion'

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
        <>
            <LawFirmHeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="-z-30 absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section className="relative h-screen flex items-center justify-center bg-[url('/hero-image.png')] bg-cover bg-center bg-no-repeat">
                    
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
        </>
    )
}

const menuItems = [
    { name: 'Practice Areas', href: '#practice' },
    { name: 'About Us', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
]

const LawFirmHeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
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
        setMenuState(false)
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
            <nav
                data-state={menuState && 'active'}
                className="fixed z-50 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-white/90 max-w-4xl rounded-2xl border border-gray-200 backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <button onClick={scrollToTop} className="flex items-center space-x-2 focus:outline-none">
                                <Scale className="h-8 w-8 text-lawfirm-accent" />
                                <span className={cn('text-2xl font-serif font-medium tracking-wide', isScrolled ? 'text-gray-900' : 'text-white')}>
                                    Immigrants R Us
                                </span>
                            </button>
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-gray-700" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 text-gray-700" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleLinkClick(e, item.href)}
                                            className={cn(isScrolled ? 'text-gray-700' : 'text-white', 'hover:text-lawfirm-accent block duration-150 font-medium')}>
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white/90 border border-gray-200 group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl p-6 shadow-2xl backdrop-blur-sm md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                onClick={(e) => handleLinkClick(e, item.href)}
                                                className={cn(isScrolled ? 'text-gray-700' : 'text-white', 'hover:text-lawfirm-accent block duration-150')}>
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full justify-end md:w-fit">
                                <Button
                                    size="sm"
                                    className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white">
                                    <span>Get Started</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}