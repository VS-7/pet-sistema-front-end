import * as React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md shadow-md z-10 rounded-xl border border-white/20 max-w-5xl w-full mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center py-4">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="/logo.png" alt="Logo" />
            </Avatar>
            <span className="ml-3 text-xl font-bold text-white">Pet Platform</span>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-white">Produtos</a>
            <a href="#" className="text-white">Assinaturas</a>
            <a href="#" className="text-white">Contato</a>
            <Link href="/login" className="text-white">Logar</Link>
            <Button variant="default" className="text-white bg-white text-blue-600">Criar Conta</Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 