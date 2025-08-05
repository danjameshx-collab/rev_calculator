import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero text-white">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 py-16">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">HVAC Pro</h2>
                <p className="text-sm text-white/80">Professional HVAC Services</p>
              </div>
            </div>
            <p className="text-white/80">
              Your trusted partner for all heating, ventilation, and air conditioning needs. 
              Professional service with guaranteed satisfaction.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="p-2 h-auto text-white hover:bg-white/20">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-auto text-white hover:bg-white/20">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-auto text-white hover:bg-white/20">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Our Services</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Heating Installation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AC Installation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">System Repair</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Maintenance Plans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Emergency Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Air Quality Testing</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Estimates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Service Areas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-semibold">(555) 123-HVAC</p>
                  <p className="text-sm text-white/80">24/7 Emergency Line</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-semibold">info@hvacpro.com</p>
                  <p className="text-sm text-white/80">Quick Response</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-semibold">Greater Metro Area</p>
                  <p className="text-sm text-white/80">50+ Mile Coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-semibold">Mon-Fri: 8AM-6PM</p>
                  <p className="text-sm text-white/80">Emergency: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-white/80">
                © 2024 HVAC Pro. All rights reserved. Licensed & Insured.
              </p>
            </div>
            <div className="flex gap-6 text-white/80 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Warranty</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;