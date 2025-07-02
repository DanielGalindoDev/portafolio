import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const ContactCTA = () => {
  return (
    <section id="contacto" className="py-20 bg-gradient-to-r from-blue-900 to-slate-900">
      <div className="container px-6 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">
          ¿Listo para trabajar juntos?
        </h2>
        <p className="text-xl mb-8 text-blue-200 max-w-2xl mx-auto">
          Si tienes un proyecto en mente o quieres conocer más sobre mi trabajo, estaré encantado de conversar contigo.
        </p>
        <Link
          href="/contacto"
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          Contactar ahora <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};