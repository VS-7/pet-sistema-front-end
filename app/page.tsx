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
            <h1 className="text-7xl font-bold mb-4">Simplificando a Gestão de Projetos no Programa de Educação Tutorial</h1>
            <p className="text-lg mb-8">Crie, gerencie e acompanhe documentos de Ensino, Pesquisa e Extensão de forma intuitiva e eficiente.</p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" variant="default">Saiba Mais</Button>
              <Button size="lg" variant="outline">Registrar</Button>
            </div>
          </div>
        </section>

  
        <section className="bg-white py-12 rounded-b-[90px] shadow-2xl relative z-10 -mb-24">
        </section>

        {/* Sobre Section */}
        <section className="bg-[#FFF1E6] py-24 relative z-0 pt-48">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 mb-12">
              <h2 className="text-4xl font-bold">Sobre</h2>
              <h3 className="text-4xl font-bold">O PET Docs</h3>
            </div>
            
            <div className="mt-12">
              <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  {/* Aqui você pode adicionar uma imagem relacionada ao PET */}
                  <div className="bg-[#FFD6E5] rounded-2xl h-full min-h-[300px] flex items-center justify-center">
                    <span className="text-gray-600">Imagem PET</span>
                  </div>
                </div>
                
                <div className="md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-semibold mb-4">O PET Docs</h4>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Plataforma PET</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Documentos PET</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      O PET Docs é uma plataforma desenvolvida para auxiliar grupos do Programa de Educação Tutorial na criação e organização de documentos de Ensino, Pesquisa e Extensão.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <span className="text-blue-600">🔹</span>
                        <span>Facilita o gerenciamento dos projetos acadêmicos.</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-blue-600">🔹</span>
                        <span>Garante maior organização e transparência.</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-blue-600">🔹</span>
                        <span>Otimiza a criação de relatórios e documentos.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-100 py-12 py-24">
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
