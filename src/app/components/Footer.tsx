// my-blog/components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    // ↓↓↓ This is the key change — reduced margin-top drastically
    <footer className="bg-white text-black mt-1">
      <div className="container mx-auto px-4 py-6">
        {/* Footer Title */}
        <div className="flex items-center justify-center mb-4 relative">
          <div className="flex items-center gap-2 relative w-full">
            <div className="flex-1 border-t border-blue-700"></div>

            <Link href="/" className="flex items-center px-2">
              <span className="text-2xl font-bold text-indigo-600">TheTrend</span>
              <Image
                src="/images/logo.png"
                alt="KE Logo"
                width={40}
                height={40}
                className="inline-block"
              />
            </Link>

            <div className="flex-1 border-t border-blue-700"></div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {/* More About Our Company */}
          <div>
            <h3 className="text-sm text-blue-700 font-semibold mb-2 underline">
              MORE ABOUT OUR COMPANY
            </h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/about-us" className="text-indigo-400 hover:text-indigo-700">About Us</Link></li>
              <li><Link href="/contact" className="text-indigo-400 hover:text-indigo-700">Contact Us</Link></li>
              <li><Link href="/manifesto" className="text-indigo-400 hover:text-indigo-700">Our Manifesto</Link></li>
              <li><Link href="/advertise" className="text-indigo-400 hover:text-indigo-700">Advertise with us</Link></li>
              <li><Link href="/careers" className="text-indigo-400 hover:text-indigo-700">Work with us</Link></li>
              <li><Link href="/dmca" className="text-indigo-400 hover:text-indigo-700">DMCA removal</Link></li>
              <li><Link href="/privacy" className="text-indigo-400 hover:text-indigo-700">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-indigo-400 hover:text-indigo-700">Terms & Conditions</Link></li>
              <li><Link href="/policies" className="text-indigo-400 hover:text-indigo-700">Policies & Standards</Link></li>
              <li><Link href="/cookies" className="text-indigo-400 hover:text-indigo-700">Cookie Policy</Link></li>
              <li><Link href="/do-not-sell" className="text-indigo-400 hover:text-indigo-700">Do Not Sell My Personal Info</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm text-blue-700 font-semibold mb-2 underline">SOCIAL MEDIA</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="https://facebook.com" className="text-indigo-400 hover:text-indigo-700">Facebook</Link></li>
              <li><Link href="https://facebook.com/sw" className="text-indigo-400 hover:text-indigo-700">Facebook (Swahili)</Link></li>
              <li><Link href="https://instagram.com" className="text-indigo-400 hover:text-indigo-700">Instagram</Link></li>
              <li><Link href="https://youtube.com" className="text-indigo-400 hover:text-indigo-700">YouTube</Link></li>
              <li><Link href="https://x.com" className="text-indigo-400 hover:text-indigo-700">X</Link></li>
              <li><Link href="https://t.me" className="text-indigo-400 hover:text-indigo-700">Telegram</Link></li>
              <li><Link href="https://tiktok.com" className="text-indigo-400 hover:text-indigo-700">TikTok</Link></li>
              <li><Link href="https://linkedin.com" className="text-indigo-400 hover:text-indigo-700">LinkedIn</Link></li>
              <li><Link href="https://pinterest.com" className="text-indigo-400 hover:text-indigo-700">Pinterest</Link></li>
              <li><Link href="https://mastodon.social" className="text-indigo-400 hover:text-indigo-700">Mastodon</Link></li>
              <li><Link href="https://wa.me" className="text-indigo-400 hover:text-indigo-700">WhatsApp</Link></li>
              <li><Link href="https://wa.me/sports" className="text-indigo-400 hover:text-indigo-700">WhatsApp (Sports)</Link></li>
            </ul>
          </div>

          {/* Contact Developer */}
          <div>
            <h3 className="text-sm text-blue-700 font-semibold mb-2 underline">CONTACT DEVELOPER</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/apps" className="text-indigo-400 hover:text-indigo-700">Our applications and solutions.</Link></li>
              <li className="text-indigo-400 text-sm">
                @:{" "}
                <a href="https://www.oirerevictor.com" className="hover:text-indigo-700">
                  https://www.oirerevictor.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6">
          <ul className="flex justify-center">
            <li className="text-indigo-400 text-sm hover:text-indigo-700 transition-colors">
              TheTrendKe MEDIA, 2025. All rights reserved.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
