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
                <section>
                    <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                            <img
                                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                alt="Legal background"
                                className="absolute inset-x-0 top-56 -z-20 opacity-20 lg:top-32 w-full h-full object-cover"
                                width="3276"
                                height="4095"
                            />
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full bg-gradient-to-br from-lawfirm-primary/95 via-lawfirm-primary/80 to-black/70" />
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <div className="hover:bg-background/10 bg-white/10 group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/20 p-1 pl-4 shadow-md backdrop-blur-sm transition-all duration-300">
                                        <span className="text-white text-sm">Trusted Legal Partners Since 2003</span>
                                        <span className="block h-4 w-0.5 border-l bg-white/30"></span>
                                        <div className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 group-hover:bg-lawfirm-accent/80 size-6 overflow-hidden rounded-full duration-500">
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
                        
                                    <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] font-serif text-white font-semibold">
                                        Your Trusted Partner in Law
                                    </h1>
                                    <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-white/90 font-sans">
                                        Expert legal representation with decades of experience. From immigration to estate planning, we're here to protect your rights and secure your future.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div className="bg-lawfirm-accent/20 rounded-[14px] border border-lawfirm-accent/30 p-0.5">
                                        <Button
                                            size="lg"
                                            className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white rounded-xl px-5 text-base font-semibold">
                                            <span className="text-nowrap">Schedule Consultation</span>
                                        </Button>
                                    </div>
                                    <Button
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-5 text-white hover:bg-white/10 hover:text-white">
                                        <span className="text-nowrap">Our Practice Areas</span>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b from-transparent from-35% to-lawfirm-primary/20 absolute inset-0 z-10"
                                />
                                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/20 p-4 shadow-lg shadow-black/30 backdrop-blur-sm bg-white/10">
                                    <img
                                        className="aspect-[15/8] relative rounded-2xl w-full object-cover"
                                        src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                        alt="Legal team at work"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
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
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-lawfirm-primary/90 max-w-4xl rounded-2xl border border-white/20 backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <div className="flex items-center space-x-2">
                                <Scale className="h-8 w-8 text-lawfirm-accent" />
                                <h1 className="text-2xl font-serif font-medium text-white tracking-wide">
                                    DC LAWYERS
                                </h1>
                            </div>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-white" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 text-white" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            className="text-white/80 hover:text-white block duration-150 font-medium">
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-lawfirm-primary/90 border border-white/20 group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl p-6 shadow-2xl backdrop-blur-sm md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                className="text-white/80 hover:text-white block duration-150">
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
                                    className={cn(isScrolled && 'lg:hidden', 'border-white/30 text-white hover:bg-white/10 hover:text-white')}>
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