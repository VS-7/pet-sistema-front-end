"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useNotificationStore } from "@/src/stores/notificationStore"
import { useAuthStore } from "@/src/stores/authStore"

export function NewsSection() {
  const { notifications, loading, fetchUserNotifications } = useNotificationStore()
  const { user } = useAuthStore()

  useEffect(() => {
    if (user?.id) {
      fetchUserNotifications(user.id)
    }
  }, [user?.id, fetchUserNotifications])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notícias e Acesso Rápido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Acesso Rápido */}
          <div>
            <h3 className="font-medium mb-3">Acesso Rápido</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Criar Novo Projeto
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Adicionar Documento
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Emitir Certificado
              </Button>
            </div>
          </div>

          {/* Notificações Recentes */}
          <div>
            <h3 className="font-medium mb-3">Notificações Recentes</h3>
            {loading ? (
              <div>Carregando notificações...</div>
            ) : (
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.lida ? 'bg-gray-50' : 'bg-blue-50'
                    }`}
                  >
                    <h4 className="text-sm font-medium">{notification.titulo}</h4>
                    <p className="text-xs text-gray-500 mt-1">{notification.mensagem}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {new Date(notification.dataCriacao).toLocaleDateString()}
                      </span>
                      {!notification.lida && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => useNotificationStore.getState().markAsRead(notification.id)}
                        >
                          Marcar como lida
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}