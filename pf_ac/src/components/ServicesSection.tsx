import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Thermometer, Wind, Snowflake, Wrench, Clock, Shield } from "lucide-react";
import heatingImage from "@/assets/heating-service.jpg";
import coolingImage from "@/assets/cooling-service.jpg";
import ventilationImage from "@/assets/ventilation-service.jpg";

const services = [
  {
    icon: Thermometer,
    title: "Heating Services",
    description: "Complete heating system installation, repair, and maintenance. From furnaces to heat pumps, we keep you warm.",
    features: ["Furnace Installation", "Heat Pump Repair", "Boiler Maintenance", "Emergency Heating"],
    image: heatingImage,
    color: "hvac-orange"
  },
  {
    icon: Snowflake,
    title: "Cooling Services", 
    description: "Expert air conditioning services to keep your space comfortable year-round. Professional AC installation and repair.",
    features: ["AC Installation", "System Repair", "Preventive Maintenance", "Energy Efficiency"],
    image: coolingImage,
    color: "hvac-blue"
  },
  {
    icon: Wind,
    title: "Ventilation Services",
    description: "Improve your indoor air quality with professional ventilation solutions. Custom ductwork and air purification systems.",
    features: ["Ductwork Installation", "Air Quality Testing", "Ventilation Design", "Filter Replacement"],
    image: ventilationImage,
    color: "hvac-blue-dark"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Professional Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive HVAC solutions for Fulshear, Katy, and surrounding Texas communities. 
            Quality workmanship backed by years of local experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-card">
              <CardContent className="p-0">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <service.icon className={`w-8 h-8 text-white`} />
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Service Banner */}
        <div className="bg-gradient-secondary rounded-2xl p-8 text-center text-white shadow-elegant">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-full">
                <Clock className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">24/7 Emergency Service</h3>
                <p className="text-white/90">HVAC problems don't wait for business hours. Neither do we.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-full">
                <Shield className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">Licensed & Insured</h3>
                <p className="text-white/90">Professional service you can trust with full insurance coverage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;