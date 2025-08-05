import { Button } from "@/components/ui/button";
import { Phone, Clock, Star } from "lucide-react";
import heroImage from "@/assets/hvac-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Emergency Banner */}
          <div className="mb-8 inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">24/7 Emergency Service Available</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Fulshear & Katy's Trusted
            <span className="block text-secondary">HVAC Experts</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Serving Fulshear, Katy, and surrounding Texas areas with professional heating, ventilation, and air conditioning services. Fast, reliable, and affordable solutions for your home and business.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-white/80">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-current text-secondary" />
              <span className="font-semibold">15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-current text-secondary" />
              <span className="font-semibold">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-current text-secondary" />
              <span className="font-semibold">100% Satisfaction Guaranteed</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="emergency" size="lg" className="text-lg px-8 py-4">
              <Phone className="w-5 h-5" />
              Call Now: (832) 508-2699
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              Free Estimate
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;