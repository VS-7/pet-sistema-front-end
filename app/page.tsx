import * as React from "react";
import Navbar from "../src/components/Navbar"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 mt-26">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-600 to-blue-500 text-white py-80 text-white py-80 rounded-b-[90px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">Simplificando a Gestão de Projetos no Programa de Educação Tutorial</h1>
            <p className="text-lg mb-8">Crie, gerencie e acompanhe documentos de Ensino, Pesquisa e Extensão de forma intuitiva e eficiente.</p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" variant="default">Saiba Mais</Button>
              <Button size="lg" variant="outline">Registrar</Button>
            </div>
          </div>
        </section>
        <section className="bg-white py-8 rounded-b-[90px] shadow-md">

          
        </section>
        {/* Features Section */}
        <section className="py-20 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Recursos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Fácil de Usar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Interface intuitiva e fácil de navegar.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Proteção de dados e segurança em primeiro lugar.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Comunidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Conecte-se com outros tutores e petianos.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Como faço para me registrar?</AccordionTrigger>
                <AccordionContent>
                  <p>Você pode se registrar clicando no botão "Registrar" no topo da página.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>É seguro usar a plataforma?</AccordionTrigger>
                <AccordionContent>
                  <p>Sim, nossa plataforma prioriza a segurança dos dados dos usuários.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">© 2025 Pet Platform. Todos os direitos reservados.</span>
            <div className="flex space-x-4">
              <Button variant="link">Termos de Serviço</Button>
              <Button variant="link">Política de Privacidade</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
