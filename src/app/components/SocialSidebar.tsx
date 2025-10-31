"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { SiTelegram, SiMastodon, SiWhatsapp } from "react-icons/si";

export default function SocialIcons() {
  const socialMedia = [
    { name: "Facebook", href: "https://facebook.com", icon: <FaFacebook size={24} color="#1877F2" /> },
    { name: "Instagram", href: "https://instagram.com", icon: <FaInstagram size={24} color="#E4405F" /> },
    { name: "YouTube", href: "https://youtube.com", icon: <FaYoutube size={24} color="#FF0000" /> },
    { name: "X", href: "https://x.com", icon: <FaXTwitter size={24} color="#000000" /> },
    { name: "Telegram", href: "https://t.me", icon: <SiTelegram size={24} color="#0088CC" /> },
    { name: "TikTok", href: "https://tiktok.com", icon: <FaTiktok size={24} color="#010101" /> },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <FaLinkedin size={24} color="#0A66C2" /> },
    { name: "Pinterest", href: "https://pinterest.com", icon: <FaPinterest size={24} color="#E60023" /> },
    { name: "Mastodon", href: "https://mastodon.social", icon: <SiMastodon size={24} color="#6364FF" /> },
    { name: "WhatsApp", href: "https://wa.me", icon: <SiWhatsapp size={24} color="#25D366" /> },
  ];

  return (
    <div
      className="
        bg-white rounded-lg shadow-sm p-4
        flex md:flex-col items-center gap-4
        overflow-x-auto md:overflow-visible
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
      "
    >
      {socialMedia.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="hover:scale-110 transition-transform flex-shrink-0"
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
}