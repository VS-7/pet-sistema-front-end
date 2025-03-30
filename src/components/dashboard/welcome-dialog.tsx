'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface WelcomeDialogProps {
  open: boolean
  onProceed: () => void
}

export function WelcomeDialog({ open, onProceed }: WelcomeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}} >
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          <DialogTitle>Bem-vindo ao PET Docs!</DialogTitle>
          <DialogDescription>
            Para começar a usar o sistema, você precisa cadastrar seu grupo PET.
            Este é um passo obrigatório para tutores.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <Button 
            className="w-full"
            onClick={onProceed}
          >
            Ir para Cadastro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 