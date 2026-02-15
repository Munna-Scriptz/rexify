import React from 'react'
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'

const Contact = () => {
    return (
        <>
            <section id='Contact'>
                <div className="container">
                    <div id="Contact-Row" className="text-text-primary">

                        {/* Header Section */}
                        <PageHeader topText={"We're here to help"} headerText={"Get in"} colorText={"Touch"} bottomText={"Have a question about our pricing, features, or need support? Our team is ready to answer all your questions."} />

                        {/* Main Content Section */}
                        <section className="py-20">
                            <div className="container grid lg:grid-cols-2 gap-12 lg:gap-24">

                                {/* Left Column: Contact Info */}
                                <div className="space-y-12">
                                    <div>
                                        <h2 className="text-3xl font-bold font-space mb-6">Contact Information</h2>
                                        <p className="text-text-secondary leading-relaxed mb-8">
                                            Fill out the form and our team will get back to you within 24 hours.
                                            For urgent matters, please use our support email or phone number.
                                        </p>

                                        <div className="space-y-6">
                                            <ContactItem
                                                icon={<Mail size={20} />}
                                                title="Email Us"
                                                detail="support@rexify.com"
                                                subDetail="We reply within 24 hours"
                                            />
                                            <ContactItem
                                                icon={<Phone size={20} />}
                                                title="Call Us"
                                                detail="+1 (555) 123-4567"
                                                subDetail="Mon-Fri, 9am - 6pm EST"
                                            />
                                            <ContactItem
                                                icon={<MapPin size={20} />}
                                                title="Visit Us"
                                                detail="123 Tech Avenue"
                                                subDetail="San Francisco, CA 94107"
                                            />
                                        </div>
                                    </div>

                                    {/* Social Proof / Trust */}
                                    <div className="p-8 bg-surface rounded-2xl border border-border">
                                        <div className="flex -space-x-4 mb-4">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-300 bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`}></div>
                                            ))}
                                            <div className="w-10 h-10 rounded-full border-2 border-white bg-accent text-white flex items-center justify-center text-xs font-bold">
                                                +2k
                                            </div>
                                        </div>
                                        <p className="font-medium text-lg mb-1">Join our community</p>
                                        <p className="text-sm text-text-secondary">Trusted by over 2,000 developers worldwide.</p>
                                    </div>
                                </div>

                                {/* Right Column: Form */}
                                <div className="bg-bg rounded-3xl p-1 shadow-2xl shadow-accent/5 border border-border">
                                    <div className="bg-surface rounded-[1.3rem] p-8 md:p-10 h-full">
                                        <h3 className="text-2xl font-bold font-space mb-6">Send a Message</h3>
                                        <form className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="firstName" className="text-sm font-medium text-text-secondary">First Name</label>
                                                    <input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="John" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="lastName" className="text-sm font-medium text-text-secondary">Last Name</label>
                                                    <input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="Doe" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email</label>
                                                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="john@example.com" />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="message" className="text-sm font-medium text-text-secondary">Message</label>
                                                <textarea id="message" rows="4" className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
                                            </div>

                                            <button type="button" className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
                                                Send Message
                                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section className="py-20 bg-surface border-t border-border">
                            <div className="container max-w-4xl">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl font-bold font-space mb-4">Frequently Asked Questions</h2>
                                    <p className="text-text-secondary">Everything you need to know about contacting us.</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <FAQItem
                                        question="What is the typical response time?"
                                        answer="We generally respond to all inquiries within 24 hours during business days."
                                    />
                                    <FAQItem
                                        question="Do you offer technical support?"
                                        answer="Yes! Our dedicated support team is available 24/7 to help with any technical issues."
                                    />
                                    <FAQItem
                                        question="Where are you located?"
                                        answer="Our headquarters is in San Francisco, but we have a distributed team worldwide."
                                    />
                                    <FAQItem
                                        question="Can I request a demo?"
                                        answer="Absolutely. You can schedule a personalized demo via our pricing page or by contacting sales."
                                    />
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </section>
        </>
    )
}

const ContactItem = ({ icon, title, detail, subDetail }) => (
    <div className="flex gap-4 items-start">
        <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center text-accent shadow-sm shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-lg text-text-primary">{title}</h4>
            <p className="text-text-primary font-medium">{detail}</p>
            <p className="text-sm text-text-muted mt-1">{subDetail}</p>
        </div>
    </div>
)

const FAQItem = ({ question, answer }) => (
    <div className="bg-bg p-6 rounded-2xl border border-border hover:border-accent/30 transition-colors">
        <div className="flex gap-3 mb-3">
            <HelpCircle size={20} className="text-accent shrink-0" />
            <h4 className="font-bold text-lg text-text-primary">{question}</h4>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed pl-8">
            {answer}
        </p>
    </div>
)

export default Contact