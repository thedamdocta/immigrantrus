import React from 'react'
import { ArrowRight, ChevronRight, Menu, X, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'

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
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section className="relative h-screen flex items-center justify-center">
                    {/* Background Image - Custom Law Firm Image - FULL VISIBILITY */}
                    <div className="absolute inset-0 -z-20">
                        <img
                            src="https://storage.googleapis.com/msgsndr/4lo83zDKzLDOxLs4aFdb/media/6878b8c1e8df54116591b640.png"
                            alt="Law firm background"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Hero Content - ALL BLACK TEXT */}
                    <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
                        {/* Badge */}
                        <div className="bg-gray-100 border border-gray-200 group mx-auto flex w-fit items-center gap-4 rounded-full p-1 pl-4 shadow-md transition-all duration-300 mb-8">
                            <span className="text-gray-800 text-sm font-medium">Trusted Legal Partners Since 2003</span>
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
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 font-bold leading-tight mb-8 drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(255,255,255,0.8)'}}>
                            Your Trusted Partner in Law
                        </h1>
                        
                        {/* Subtitle - DARK GRAY TEXT WITH SHADOW */}
                        <p className="text-xl md:text-2xl text-gray-700 font-sans leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-md" style={{textShadow: '1px 1px 2px rgba(255,255,255,0.8)'}}>
                            Expert legal representation with decades of experience. From immigration to estate planning, we're here to protect your rights and secure your future.
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
                <section className="bg-white pb-16 pt-16 md:pb-32">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                            <div className="text-center">
                                <p className="text-lawfirm-text text-lg font-serif font-semibold mb-2">
                                    Trusted by Leading Organizations
                                </p>
                                <ChevronRight className="mx-auto size-4 text-lawfirm-accent" />
                            </div>
                        </div>
                        <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                            <div className="flex">
                                <div className="mx-auto h-8 w-fit bg-lawfirm-text rounded px-3 py-1 flex items-center">
                                    <span className="text-white text-xs font-semibold">NYC BAR</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-8 w-fit bg-lawfirm-text rounded px-3 py-1 flex items-center">
                                    <span className="text-white text-xs font-semibold">AILA</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-8 w-fit bg-lawfirm-text rounded px-3 py-1 flex items-center">
                                    <span className="text-white text-xs font-semibold">NYSBA</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-8 w-fit bg-lawfirm-text rounded px-3 py-1 flex items-center">
                                    <span className="text-white text-xs font-semibold">ABA</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-8 w-fit bg-lawfirm-text rounded px-3 py-1 flex items-center">
                                    <span className="text-white text-xs font-semibold">NAELA</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-8 w-fit bg-lawfirm-text rounded px-3 py-1 flex items-center">
                                    <span className="text-white text-xs font-semibold">ILRC</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-8 w-fit bg-lawfirm-text rounded px-3 py-1 flex items-center">
                                    <span className="text-white text-xs font-semibold">CILA</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-8 w-fit bg-lawfirm-text rounded px-3 py-1 flex items-center">
                                    <span className="text-white text-xs font-semibold">NELA</span>
                                </div>
                            </div>
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
    
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-50 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-white/90 max-w-4xl rounded-2xl border border-gray-200 backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <div className="flex items-center space-x-2">
                                <Scale className="h-8 w-8 text-lawfirm-accent" />
                                <h1 className="text-2xl font-serif font-medium text-gray-900 tracking-wide">
                                    Immigrants R Us
                                </h1>
                            </div>

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
                                            className="text-gray-700 hover:text-lawfirm-accent block duration-150 font-medium">
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
                                                className="text-gray-700 hover:text-lawfirm-accent block duration-150">
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden', 'border-gray-300 text-gray-700 hover:bg-gray-100')}>
                                    <span>Call Now</span>
                                </Button>
                                <Button
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden', 'bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white')}>
                                    <span>Free Consultation</span>
                                </Button>
                                <Button
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden', 'bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white')}>
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