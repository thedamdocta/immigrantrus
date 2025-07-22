import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LawFirmHeroSection } from "@/components/ui/law-firm-hero"
import { 
  Scale, 
  Users, 
  Shield, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Award, 
  Clock, 
  Star, 
  Menu,
  CheckCircle,
  BookOpen,
  UserCheck,
  Briefcase,
  ChevronDown,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react"
import { useState } from "react"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns"
import { Gallery4 } from "@/components/ui/gallery4"
import { FaqSectionWithCategories } from "@/components/ui/faq-with-categories"

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* New Animated Hero Section */}
      <LawFirmHeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-lawfirm-secondaryBackground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-lawfirm-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-serif font-semibold text-lawfirm-text mb-2">98%</div>
              <div className="text-lawfirm-subtext font-sans">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-lawfirm-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-serif font-semibold text-lawfirm-text mb-2">5,000+</div>
              <div className="text-lawfirm-subtext font-sans">Cases Handled</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-lawfirm-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-serif font-semibold text-lawfirm-text mb-2">20+</div>
              <div className="text-lawfirm-subtext font-sans">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-lawfirm-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-serif font-semibold text-lawfirm-text mb-2">100+</div>
              <div className="text-lawfirm-subtext font-sans">Testimonials</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Legal team"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-serif font-semibold text-lawfirm-text mb-6">
                Experienced Legal Professionals
              </h2>
              <p className="text-lg text-lawfirm-subtext leading-relaxed mb-6">
                With over two decades of combined experience, our team of dedicated attorneys has successfully represented thousands of clients across various practice areas. We understand that legal matters can be overwhelming, which is why we're committed to providing personalized, compassionate service.
              </p>
              <p className="text-lg text-lawfirm-subtext leading-relaxed mb-8">
                From complex immigration cases to detailed estate planning, we bring the expertise and dedication needed to achieve the best possible outcomes for our clients.
              </p>
              <Button className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white px-6 py-3 rounded-lg">
                Meet Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-semibold text-lawfirm-text mb-6">Practice Areas</h2>
            <p className="text-xl text-lawfirm-subtext max-w-2xl mx-auto">
              We provide comprehensive legal services across multiple practice areas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 bg-lawfirm-primary text-white overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Trust & Will"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-lawfirm-primary/50 group-hover:bg-lawfirm-primary/70 transition-all duration-300"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-white">Trust & Will</CardTitle>
                <CardDescription className="text-gray-200">
                  Comprehensive trust services and will preparation for your family's future
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 bg-lawfirm-primary text-white overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Estate Planning"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-lawfirm-primary/50 group-hover:bg-lawfirm-primary/70 transition-all duration-300"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-white">Estate Planning</CardTitle>
                <CardDescription className="text-gray-200">
                  Wills, trusts, probate, and estate administration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 bg-lawfirm-primary text-white overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1184&q=80"
                  alt="Immigration"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-lawfirm-primary/50 group-hover:bg-lawfirm-primary/70 transition-all duration-300"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-white">Immigration</CardTitle>
                <CardDescription className="text-gray-200">
                  Visa applications, green cards, citizenship, family reunification, and deportation defense
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-lawfirm-secondaryBackground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-semibold text-lawfirm-text mb-6">Why Choose Us</h2>
            <p className="text-xl text-lawfirm-subtext max-w-2xl mx-auto">
              We're committed to providing exceptional legal services with personalized attention
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Scale, title: "Expert Legal Advice", desc: "Our attorneys bring decades of experience to every case" },
              { icon: Clock, title: "24/7 Support", desc: "We're available when you need us most" },
              { icon: Shield, title: "Confidential Service", desc: "Your privacy and confidentiality are our top priorities" },
              { icon: Award, title: "Proven Track Record", desc: "Thousands of successful cases and satisfied clients" },
              { icon: Heart, title: "Compassionate Care", desc: "We understand the personal nature of legal matters" },
              { icon: CheckCircle, title: "Results-Driven", desc: "Focused on achieving the best possible outcomes" }
            ].map((benefit, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-lawfirm-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-lawfirm-accent" />
                  </div>
                  <CardTitle className="text-xl font-serif text-lawfirm-text">{benefit.title}</CardTitle>
                  <CardDescription className="text-lawfirm-subtext">
                    {benefit.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-semibold text-lawfirm-text mb-6">Our Team</h2>
            <p className="text-xl text-lawfirm-subtext max-w-2xl mx-auto">
              Meet the experienced professionals who will fight for your rights
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "Marlene Forde", role: "Senior Partner", image: "/marlene-forde.jpg" },
              { name: "Michelle Rodriguez", role: "Immigration Attorney", image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80" }
            ].map((member, index) => (
              <Card key={index} className="group w-72 md:w-80 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-lawfirm-primary/0 group-hover:bg-lawfirm-primary/20 transition-all duration-300"></div>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-serif text-lawfirm-text">{member.name}</CardTitle>
                  <CardDescription className="text-lawfirm-subtext">{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-lawfirm-secondaryBackground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block border py-1 px-4 rounded-lg text-lawfirm-text">Testimonials</div>
            <h2 className="text-4xl font-serif font-semibold text-lawfirm-text mt-5">What our clients say</h2>
            <p className="text-lawfirm-subtext max-w-2xl mx-auto mt-4">Real feedback from people we've helped.</p>
          </div>

          {/* Columns */}
          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={[
              { text: 'Immigrants R Us guided me flawlessly through my visa process.', image: 'https://randomuser.me/api/portraits/women/65.jpg', name: 'Sarah Johnson', role: 'Entrepreneur' },
              { text: 'Professional and compassionate – highly recommend.', image: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'Carlos Medina', role: 'Software Engineer' },
              { text: 'Their expertise made my green-card application stress-free.', image: 'https://randomuser.me/api/portraits/women/45.jpg', name: 'Emily Chen', role: 'Designer' }
            ]} duration={15} />
            <TestimonialsColumn
              testimonials={[
                { text: 'Clear communication and outstanding results.', image: 'https://randomuser.me/api/portraits/men/27.jpg', name: 'David Brown', role: 'Photographer' },
                { text: 'They treated my family with respect and care.', image: 'https://randomuser.me/api/portraits/women/12.jpg', name: 'Aisha Khan', role: 'Teacher' },
                { text: 'A trustworthy partner for all immigration needs.', image: 'https://randomuser.me/api/portraits/men/41.jpg', name: 'Liam O’Connor', role: 'Consultant' }
              ]}
              duration={19}
              className="hidden md:block"
            />
            <TestimonialsColumn
              testimonials={[
                { text: 'Their legal team secured my citizenship quickly.', image: 'https://randomuser.me/api/portraits/women/22.jpg', name: 'Maria Garcia', role: 'Chef' },
                { text: 'Efficient, knowledgeable, and supportive.', image: 'https://randomuser.me/api/portraits/men/13.jpg', name: 'Ivan Petrov', role: 'Student' },
                { text: 'The best law firm I have worked with.', image: 'https://randomuser.me/api/portraits/women/33.jpg', name: 'Olivia Smith', role: 'Marketing Manager' }
              ]}
              duration={17}
              className="hidden lg:block"
            />
          </div>
        </div>
      </section>

      {/* Legal Insights Section (carousel) */}
      <Gallery4
        items={[
          {
            id: "immigration",
            title: "Understanding Immigration Law Changes",
            description: "Key updates every immigrant should know in 2025.",
            href: "#",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1170&q=80",
          },
          {
            id: "estate",
            title: "Estate Planning Best Practices",
            description: "Protect your legacy with these essential tips.",
            href: "#",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1170&q=80",
          },
          {
            id: "trust",
            title: "Trust & Will Planning Updates",
            description: "Recent legal changes that may affect your family.",
            href: "#",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1170&q=80",
          },
        ]}
      />

      <FaqSectionWithCategories
        title="Frequently Asked Questions"
        description="Find answers to common questions about our legal services"
        items={[
          {
            question: "How do I know if I need a lawyer?",
            answer: "If you're facing legal issues, have questions about your rights, or need help with legal documents, it's wise to consult with an attorney.",
            category: "General",
          },
          {
            question: "What should I bring to my consultation?",
            answer: "Bring any relevant documents, a list of questions, and be prepared to discuss your situation openly and honestly.",
            category: "Consultation",
          },
          {
            question: "How much do legal services cost?",
            answer: "Legal fees vary depending on the complexity of your case. We offer transparent pricing and will discuss all costs upfront.",
            category: "Pricing",
          },
          {
            question: "How long does a typical case take?",
            answer: "Timeline varies by case type and complexity. We'll provide realistic expectations and keep you updated throughout the process.",
            category: "Process",
          },
        ]}
        contactInfo={{
          title: "Still have questions?",
          buttonText: "Contact Support",
          onContact: () => window.location.href = '#contact',
        }}
      />

      {/* Contact CTA Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-lawfirm-secondaryBackground rounded-2xl p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-serif font-semibold text-lawfirm-text mb-6">
                  Get Expert Legal Help Today
                </h2>
                <p className="text-xl text-lawfirm-subtext mb-8 leading-relaxed">
                  Don't navigate legal challenges alone. Our experienced team is here to provide the guidance and representation you need.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-lawfirm-accent" />
                    <span className="text-lawfirm-text font-semibold">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-lawfirm-accent" />
                    <span className="text-lawfirm-text font-semibold">marlene@fordelaw.org</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-lawfirm-accent" />
                    <span className="text-lawfirm-text font-semibold">New York, NY</span>
                  </div>
                </div>
              </div>
              <div>
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-lawfirm-text">Contact Us</CardTitle>
                    <CardDescription className="text-lawfirm-subtext">
                      Send us a message and we'll get back to you within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Your Name" className="border-gray-300" />
                    <Input placeholder="Your Email" type="email" className="border-gray-300" />
                    <Textarea placeholder="Your Message" className="border-gray-300 h-32" />
                    <Button className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white w-full">
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-lawfirm-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-semibold mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied clients who trust Immigrants R Us
            </p>
            <Button className="bg-lawfirm-accent hover:bg-lawfirm-accent/90 text-white px-8 py-3 text-lg">
              Schedule Consultation
            </Button>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-xl font-serif font-semibold mb-4">Immigrants R Us</h4>
              <p className="text-gray-300 text-sm">
                Your trusted partner in legal matters, providing expert representation and personalized service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Practice Areas</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Immigration Law</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Estate Planning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust & Will</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Naturalization</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>(555) 123-4567</li>
                <li>marlene@fordelaw.org</li>
                <li>New York, NY</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-300 text-sm">
            <p>&copy; 2024 Immigrants R Us. All rights reserved. | Attorney Advertising | Prior results do not guarantee a similar outcome.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}