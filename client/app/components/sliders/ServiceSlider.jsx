"use client"
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import ServiceCard from "../cards/ServiceCard";
import { ShieldCheck, Truck, Cpu, Headphones } from "lucide-react";

const ServiceSlider = () => {
    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });

    const servicesItem = [
        {
            icon: ShieldCheck,
            title: "Secure Payments",
            desc: "Enterprise-grade security with encrypted transactions and trusted gateways."
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            desc: "Optimized logistics to deliver your tech faster, safer, and on time."
        },
        {
            icon: Cpu,
            title: "Latest Technology",
            desc: "Carefully curated cutting-edge tech products from trusted brands."
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            desc: "Always-on expert support for a smooth and reliable shopping experience."
        }
    ];

    return (
        <div className="relative overflow-hidden">
            <div ref={emblaRef}>
                <div className="flex gap-4">
                    {servicesItem.map((item, i) => (
                        <div key={i} className="shrink-0 basis-75 select-none">
                            <ServiceCard item={item} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ServiceSlider;