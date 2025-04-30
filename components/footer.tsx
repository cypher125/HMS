import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#001F3F] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 font-heading text-xl font-semibold">YabaTech HMS</h3>
            <p className="mb-4 text-white/80">
              The official hostel management system for Yaba College of Technology, providing students with a seamless
              accommodation experience.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/80 hover:text-[#FFD700]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-[#FFD700]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-[#FFD700]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hostels" className="text-white/80 hover:text-[#FFD700]">
                  Hostels
                </Link>
              </li>
              <li>
                <Link href="/application" className="text-white/80 hover:text-[#FFD700]">
                  Apply for Accommodation
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-white/80 hover:text-[#FFD700]">
                  Make Payment
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/80 hover:text-[#FFD700]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-[#FFD700]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-heading text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-[#FFD700]" />
                <span className="text-white/80">Yaba College of Technology, Herbert Macaulay Way, Yaba, Lagos</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-[#FFD700]" />
                <span className="text-white/80">+234 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-[#FFD700]" />
                <span className="text-white/80">hostel@yabatech.edu.ng</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="mb-4 font-heading text-xl font-semibold">Office Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-white/80">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Saturday:</span>
                <span>9:00 AM - 1:00 PM</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8 text-center">
          <p className="text-white/60">
            &copy; {new Date().getFullYear()} YabaTech Hostel Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
