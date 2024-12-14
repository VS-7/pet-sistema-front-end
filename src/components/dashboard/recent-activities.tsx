"use client"

import { useEffect } from "react"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Você precisará criar uma store para logs
interface Log {
  id: number
  message: string
  createdAt: string
}

export function RecentActivities() {
  // Aqui você usaria sua store de logs
  const logs: Log[] = []

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm">{log.message}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(log.createdAt), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
} 