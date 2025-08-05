import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get Your Free Estimate Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to improve your comfort in Fulshear, Katy, or surrounding Texas areas? Contact us for a free consultation and estimate. 
            We're here to help with all your local HVAC needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-elegant border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Request Free Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="First Name" className="border-input" />
                <Input placeholder="Last Name" className="border-input" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Email Address" type="email" className="border-input" />
                <Input placeholder="Phone Number" type="tel" className="border-input" />
              </div>
              <Input placeholder="Service Address" className="border-input" />
              <div className="grid md:grid-cols-2 gap-4">
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option>Select Service Type</option>
                  <option>Heating Installation</option>
                  <option>Cooling Installation</option>
                  <option>Ventilation Services</option>
                  <option>Repair Services</option>
                  <option>Maintenance</option>
                  <option>Emergency Service</option>
                </select>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option>Preferred Contact Time</option>
                  <option>Morning (8AM - 12PM)</option>
                  <option>Afternoon (12PM - 5PM)</option>
                  <option>Evening (5PM - 8PM)</option>
                  <option>Anytime</option>
                </select>
              </div>
              <Textarea 
                placeholder="Tell us about your HVAC needs..." 
                className="min-h-32 border-input"
              />
              <Button variant="hero" className="w-full text-lg py-6">
                Get Free Estimate
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid gap-6">
              <Card className="group hover:shadow-card transition-all duration-300 border-0">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-4 bg-gradient-primary rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Call Us Now</h3>
                    <p className="text-2xl font-bold text-primary">(832) 508-2699</p>
                    <p className="text-sm text-muted-foreground">24/7 Emergency Line</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-card transition-all duration-300 border-0">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-4 bg-gradient-secondary rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email Us</h3>
                    <p className="text-lg text-primary font-semibold">info@pfairac.com</p>
                    <p className="text-sm text-muted-foreground">Quick response guaranteed</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-card transition-all duration-300 border-0">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-4 bg-gradient-primary rounded-full group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Service Area</h3>
                    <p className="text-lg text-muted-foreground">Fulshear, Katy & Surrounding Areas</p>
                    <p className="text-sm text-muted-foreground">Southwest Harris County</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-card transition-all duration-300 border-0">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-4 bg-gradient-secondary rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Business Hours</h3>
                    <p className="text-lg text-muted-foreground">Mon-Fri: 8AM - 6PM</p>
                    <p className="text-sm text-muted-foreground">Emergency service: 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency CTA */}
            <Card className="bg-gradient-hero text-white border-0 shadow-elegant">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">HVAC Emergency?</h3>
                <p className="mb-6 text-white/90">
                  Don't wait! Our emergency technicians are available 24/7 
                  to restore your comfort quickly and efficiently.
                </p>
                <Button variant="emergency" size="lg" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                  <Phone className="w-5 h-5" />
                  Emergency Service: (832) 508-2699
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;