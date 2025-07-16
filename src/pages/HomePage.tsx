import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Users, Shield, Heart, Phone, Mail, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-caribbean-green" />
              <h1 className="text-2xl font-bold text-gray-900">Immigrants R Us</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-caribbean-green transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-caribbean-green transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-caribbean-green transition-colors">Contact</a>
            </nav>
            <Button className="bg-caribbean-green hover:bg-caribbean-green/90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-caribbean-blue/20 to-caribbean-green/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1650784854790-fb6c2ed400d3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxsYXclMjBmaXJtJTIwcHJvZmVzc2lvbmFsfGVufDB8fHx8MTc1MjY5MDk0N3ww&ixlib=rb-4.1.0&q=85')"
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-caribbean-green">Immigrants</span> helping{" "}
              <span className="text-caribbean-blue">immigrants</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              From the Caribbean to the U.S. — we understand your journey. 
              Expert immigration and estate planning services with cultural understanding and legal excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-caribbean-green hover:bg-caribbean-green/90 text-white px-8 py-6 text-lg"
              >
                Start Your Immigration Journey
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-caribbean-blue text-caribbean-blue hover:bg-caribbean-blue hover:text-white px-8 py-6 text-lg"
              >
                Estate Planning Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal services tailored for immigrant families and individuals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-caribbean-green/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-caribbean-green" />
                </div>
                <CardTitle className="text-caribbean-green">Immigration Law</CardTitle>
                <CardDescription>
                  Visa applications, green cards, citizenship, family reunification, and deportation defense
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Family-based immigration</li>
                  <li>• Employment-based visas</li>
                  <li>• Naturalization & citizenship</li>
                  <li>• Asylum & refugee cases</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-caribbean-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-caribbean-blue" />
                </div>
                <CardTitle className="text-caribbean-blue">Estate Planning</CardTitle>
                <CardDescription>
                  Wills, trusts, powers of attorney, and estate administration for immigrant families
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Wills & testament drafting</li>
                  <li>• Living trusts</li>
                  <li>• Power of attorney</li>
                  <li>• Estate administration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-caribbean-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-caribbean-orange" />
                </div>
                <CardTitle className="text-caribbean-orange">Family Law</CardTitle>
                <CardDescription>
                  Family reunification, adoption, and domestic relations with cultural sensitivity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Family reunification</li>
                  <li>• Adoption services</li>
                  <li>• Domestic relations</li>
                  <li>• Child custody matters</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-caribbean-blue/5 to-caribbean-green/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Choose Immigrants R Us?</h2>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-caribbean-green mb-4">Cultural Understanding</h3>
                <p className="text-gray-600">
                  As Caribbean immigrants ourselves, we understand the unique challenges, cultural nuances, 
                  and emotional journey of immigration. We speak your language—literally and figuratively.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-caribbean-blue mb-4">Legal Excellence</h3>
                <p className="text-gray-600">
                  Our team combines years of legal expertise with personal immigration experience, 
                  ensuring you receive both compassionate care and professional representation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-caribbean-green to-caribbean-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a consultation today and take the first step toward your American dream
          </p>
          <Button 
            size="lg"
            className="bg-white text-caribbean-green hover:bg-gray-100 px-8 py-6 text-lg"
          >
            Schedule Free Consultation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-6 w-6 text-caribbean-green" />
                <span className="text-xl font-bold">Immigrants R Us</span>
              </div>
              <p className="text-gray-400">
                Immigrants helping immigrants achieve their American dream through expert legal services.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>marlene@fordelaw.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal Notice</h4>
              <p className="text-gray-400 text-sm">
                Attorney Advertising. Prior results do not guarantee a similar outcome. 
                This site does not constitute legal advice. Submitting a form does not create an attorney-client relationship.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Immigrants R Us. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}