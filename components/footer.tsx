import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <Image src="/logo.png" alt="logo" width={180} height={30} />
            <p className="text-gray-400">
              Founded in 2015, we&apos;ve grown from a small startup to a
              leading e-commerce platform by focusing on quality, customer
              experience, and innovative technology.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="https://www.facebook.com/herdoycode"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebookF className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/herdoydev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/herdoy-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.youtube.com/@herdoycode"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaYoutube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">herdoy.dev@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">+8801622465404</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  18 Sonar Bangla Road
                  <br />
                  Peyaratoal, Kushtia Sadar, 7000
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} herdoydev. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
