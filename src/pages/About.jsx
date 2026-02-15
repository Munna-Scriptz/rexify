import React from 'react'
import { Rocket, Shield, Zap, Globe, Users, ArrowRight } from 'lucide-react'
import { AboutHeader } from '../components/common/PageHeader'

const About = () => {
    return (
        <div className="font-primary text-text-primary bg-bg min-h-screen">

            {/* Hero Section/about */}
            <AboutHeader />

            {/* Mission Section */}
            <section className="py-20 bg-surface">
                <div className="container grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold font-space">
                            Our Mission
                        </h2>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            At Rexify, we believe technology should be an enabler, not a barrier.
                            Our mission is to democratize access to advanced digital tools,
                            making it easier for anyone to turn their ideas into reality.
                        </p>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            Whether you're a startup looking to scale or an enterprise aiming
                            for efficiency, our ecosystem is designed to adapt to your needs.
                        </p>

                        <div className="pt-4 flex gap-8">
                            <div>
                                <h3 className="text-3xl font-bold text-accent">10k+</h3>
                                <p className="text-text-muted text-sm">Active Users</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-accent">99.9%</h3>
                                <p className="text-text-muted text-sm">Uptime</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-accent">24/7</h3>
                                <p className="text-text-muted text-sm">Support</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-tr from-accent/20 to-transparent rounded-2xl md:-rotate-3 transform transition-transform"></div>
                        <div className="relative bg-bg border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Global Reach</h4>
                                    <p className="text-sm text-text-muted">Connecting users worldwide</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 bg-muted rounded-full w-3/4"></div>
                                <div className="h-2 bg-muted rounded-full w-full"></div>
                                <div className="h-2 bg-muted rounded-full w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
                            Why Choose Us?
                        </h2>
                        <p className="text-text-secondary">
                            Built on a foundation of trust, innovation, and performance.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<Zap size={24} />}
                            title="Lightning Fast"
                            description="Optimized for speed. Experience zero lag and instant interactions across all devices."
                        />
                        <ValueCard
                            icon={<Shield size={24} />}
                            title="Secure by Design"
                            description="Your data is our top priority. Enterprise-grade encryption and privacy controls built-in."
                        />
                        <ValueCard
                            icon={<Users size={24} />}
                            title="Community Driven"
                            description="We listen to our users. Regular updates and features inspired by the community."
                        />
                        <ValueCard
                            icon={<Rocket size={24} />}
                            title="Scalable"
                            description="Grow without limits. Our infrastructure scales automatically with your needs."
                        />
                        <ValueCard
                            icon={<Globe size={24} />}
                            title="Accessible"
                            description="Designed for everyone. Inclusive interfaces that work for all users."
                        />
                        <div className="bg-accent text-white p-8 rounded-2xl flex flex-col justify-center items-center text-center cursor-pointer hover:bg-blue-700 transition-colors">
                            <h3 className="font-bold text-xl mb-2">Join Us Today</h3>
                            <p className="opacity-90 text-sm mb-4">Start your journey with Rexify</p>
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-surface border-t border-border">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to get started?
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto mb-8">
                        Join thousands of others who are already building the future with Rexify.
                        No credit card required for the free tier.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                            Get Started Now <ArrowRight size={18} />
                        </button>
                        <button className="px-8 py-3 bg-white border border-border text-text-primary font-medium rounded-full hover:bg-muted transition-all">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

const ValueCard = ({ icon, title, description }) => (
    <div className="p-8 rounded-2xl bg-surface border border-transparent hover:border-accent/20 hover:bg-white hover:shadow-lg transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 font-space">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">
            {description}
        </p>
    </div>
)

export default About