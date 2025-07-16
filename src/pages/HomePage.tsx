import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Users, Shield, Heart, Phone, Mail, MapPin, ChevronRight, Award, Clock, Star, Menu } from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">Immigrants R Us</span>
                <span className="text-xs text-gray-600 -mt-1">Immigration & Estate Planning</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">About</a>
              <a href="#attorneys" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">Attorneys</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">Contact</a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
              >
                Free Consultation
              </Button>
              <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-gray-900/95"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
          }}
        ></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Immigrants</span>
            <span className="block text-blue-300">Helping Immigrants</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Expert immigration and estate planning services from attorneys who understand your journey. 
            From the Caribbean to the U.S., we're here to guide you home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold h-auto"
            >
              Schedule Free Consultation
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-6 text-lg font-semibold h-auto"
            >
              Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">2,500+</div>
              <div className="text-gray-600">Cases Won</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Practice Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive legal services designed specifically for immigrant families and individuals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-900 transition-colors">
                  <Users className="h-8 w-8 text-blue-900 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">Immigration Law</CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  From visa applications to citizenship, we guide you through every step of your immigration journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-blue-900 mr-2" />Family-based immigration</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-blue-900 mr-2" />Employment-based visas</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-blue-900 mr-2" />Naturalization & citizenship</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-blue-900 mr-2" />Deportation defense</li>
                </ul>
                <Button className="mt-6 bg-blue-900 hover:bg-blue-800 text-white w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-700 transition-colors">
                  <Shield className="h-8 w-8 text-green-700 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">Estate Planning</CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Protect your family's future with comprehensive estate planning services tailored for immigrants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-green-700 mr-2" />Wills & testament drafting</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-green-700 mr-2" />Living trusts</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-green-700 mr-2" />Power of attorney</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-green-700 mr-2" />Estate administration</li>
                </ul>
                <Button className="mt-6 bg-green-700 hover:bg-green-600 text-white w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-700 transition-colors">
                  <Heart className="h-8 w-8 text-purple-700 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">Family Law</CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Reunite with loved ones and protect your family with culturally sensitive legal services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-purple-700 mr-2" />Family reunification</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-purple-700 mr-2" />Adoption services</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-purple-700 mr-2" />Domestic relations</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 text-purple-700 mr-2" />Child custody matters</li>
                </ul>
                <Button className="mt-6 bg-purple-700 hover:bg-purple-600 text-white w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Immigrants R Us?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine legal expertise with personal experience to deliver exceptional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Cultural Understanding</h3>
              <p className="text-gray-300">
                As Caribbean immigrants ourselves, we understand your unique challenges and cultural needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Legal Excellence</h3>
              <p className="text-gray-300">
                Decades of combined experience with a proven track record of successful cases
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Dedicated Support</h3>
              <p className="text-gray-300">
                24/7 support and regular case updates to keep you informed every step of the way
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-gray-300">
                95% success rate with thousands of satisfied clients who now call America home
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Take the first step toward achieving your American dream. Schedule a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold h-auto"
            >
              Schedule Free Consultation
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-6 text-lg font-semibold h-auto"
            >
              Call Now: (555) 123-4567
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">Immigrants R Us</span>
                  <span className="text-sm text-gray-400">Immigration & Estate Planning</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Immigrants helping immigrants achieve their American dream through expert legal services and cultural understanding.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span>marlene@fordelaw.org</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Practice Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Immigration Law</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Estate Planning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Family Law</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Naturalization</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Legal Information</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Attorney Advertising. Prior results do not guarantee a similar outcome. 
                This site does not constitute legal advice. Submitting a form does not create an attorney-client relationship.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Immigrants R Us. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}