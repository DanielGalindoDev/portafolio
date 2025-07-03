'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Inicio", path: "/#inicio" },
    { name: "Proyectos", path: "/#proyectos" },
    { name: "Servicios", path: "/#servicios" },
    { name: "Sobre mi", path: "/AboutMe" },
  ];

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            transition: {
              type: "spring",
              damping: 25,
              stiffness: 150,
              mass: 0.5,
              delay: 0.1
            }
          }}
          exit={{ 
            y: -80, 
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
          className="fixed top-0 w-full z-50 h-16 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/30 dark:border-gray-700/30 shadow-sm backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 h-full">
            <div className="flex items-center justify-between h-full py-0">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.2, duration: 0.4 }
                }}
              >
                <Link 
                  href="/" 
                  className="flex items-center space-x-3 group relative"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative h-8 w-8">
                    <Image
                      src="/images/logo.png"
                      alt="Logo Daniel Galindo"
                      fill
                      className="object-contain dark:filter dark:brightness-0 dark:invert transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-blue-400/10 dark:bg-blue-500/10 transition-all duration-500" />
                  </div>
                  <span className="font-medium text-lg text-gray-800 dark:text-white/90 tracking-tight">
                    Daniel Galindo
                  </span>
                </Link>
              </motion.div>

              {/* Navegación */}
              <motion.nav 
                className="hidden md:flex items-center space-x-1"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.5 }
                }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="relative px-4 py-2.5 text-sm text-gray-700/90 dark:text-gray-300/90 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-1 left-4 right-4 h-px bg-blue-500/30 dark:bg-blue-400/30 group-hover:bg-blue-600/50 dark:group-hover:bg-blue-400/50 transition-all duration-500" />
                  </Link>
                ))}
              </motion.nav>

              {/* Botones */}
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.2, duration: 0.4 }
                }}
              >
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full p-2 bg-white/40 dark:bg-gray-800/40 border border-gray-200/30 dark:border-gray-700/30 text-gray-700/90 dark:text-gray-300/90 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-500"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 transition-all duration-300" />
                  ) : (
                    <Moon className="w-4 h-4 transition-all duration-300" />
                  )}
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden rounded-full p-2 bg-white/40 dark:bg-gray-800/40 border border-gray-200/30 dark:border-gray-700/30 text-gray-700/90 dark:text-gray-300/90 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-500"
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="w-4 h-4 transition-all duration-300" />
                  ) : (
                    <Menu className="w-4 h-4 transition-all duration-300" />
                  )}
                </button>
              </motion.div>
            </div>

            {/* Menú móvil */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: "auto", 
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3, ease: "easeOut" },
                      opacity: { duration: 0.2, delay: 0.1 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.2 },
                      opacity: { duration: 0.1 }
                    }
                  }}
                  className="md:hidden space-y-2 overflow-hidden"
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ 
                        x: 0, 
                        opacity: 1,
                        transition: { 
                          delay: 0.1 + index * 0.05,
                          duration: 0.3
                        }
                      }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 rounded-lg text-sm text-gray-700/90 dark:text-gray-300/90 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 font-medium"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}