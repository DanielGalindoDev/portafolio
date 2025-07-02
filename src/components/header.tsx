"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Experiencia", href: "#experiencia" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-md py-3 border-b border-gray-200' 
        : 'bg-gradient-to-r from-blue-800 to-indigo-900 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo con efecto de destaque */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
        >
          <div className={`relative w-10 h-10 transition-all duration-300 group-hover:scale-110 ${
            scrolled ? 'bg-blue-600 p-1 rounded-lg' : 'bg-white/20 p-1 rounded-full'
          }`}>
            <Image
              src="/images/logo.png"
              alt="Logo Daniel Galindo"
              width={40}
              height={40}
              className={`object-contain ${
                scrolled ? 'filter brightness-0 invert' : ''
              }`}
              priority
            />
          </div>
          <span className={`text-xl font-semibold tracking-tight ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}>
            Daniel <span className={scrolled ? 'text-blue-600' : 'text-blue-300'}>Galindo</span>
          </span>
        </Link>

        {/* Navegación desktop con estilo contrastante */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                scrolled 
                  ? 'text-gray-600 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              <span className={`absolute left-1/2 -bottom-1 h-0.5 w-0 ${
                scrolled ? 'bg-blue-600' : 'bg-white'
              } transition-all duration-300 group-hover:w-[80%] group-hover:left-[10%]`}></span>
            </Link>
          ))}
        </nav>

        {/* Botón móvil con cambio de estilo */}
        <button
          className={`md:hidden p-2 rounded-lg transition-all ${
            open 
              ? scrolled 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-white/20 text-white'
              : scrolled 
                ? 'text-gray-600 hover:bg-gray-100' 
                : 'text-white/90 hover:bg-white/10'
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? (
            <X size={26} className="transition-transform duration-300" />
          ) : (
            <Menu size={26} className="transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Menú móvil con estilo adaptativo */}
      {open && (
        <div className={`md:hidden ${
          scrolled ? 'bg-white' : 'bg-indigo-900'
        } px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-4`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-base rounded-lg transition-all duration-200 ${
                scrolled 
                  ? 'text-gray-600 hover:bg-blue-50 hover:text-blue-600' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}