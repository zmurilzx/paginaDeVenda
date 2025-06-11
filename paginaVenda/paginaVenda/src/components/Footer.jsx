import { motion } from 'framer-motion';
import {Globe, Instagram} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "",
      links: [""]
    }
  ];

  const socialLinks = [    
    { icon: <Instagram size={20} />, name: "Instagram" },
  ];

  return (
    <footer className="pt-16 pb-8 border-t border-border/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            > 
              <div className="">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href="https://www.instagram.com/cine.stream2k?igsh=aGJybjJlc2hqdDFv&utm_source=qr " 
                    className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-foreground/70 hover:bg-purple-500/20 hover:text-purple-400 transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            >
              <h4 className="font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="https://wa.me/5543999748808" 
                      className="text-foreground/70 hover:text-purple-400 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Globe size={16} className="text-foreground/60 mr-2" />
            <select className="bg-transparent text-foreground/60 text-sm border-none focus:outline-none">
              <option value="pt">Português</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          
          <p className="text-foreground/60 text-sm">
            © {currentYear} CineStream. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
