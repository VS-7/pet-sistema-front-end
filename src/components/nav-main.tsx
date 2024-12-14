"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import { Button } from "@/app/components/ui/button"

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  items?: {
    title: string
    url: string
  }[]
  isActive?: boolean
}

interface NavMainProps {
  items: NavItem[]
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2 p-4">
      {items.map((item, index) => {
        const Icon = item.icon
        const isActive = pathname === item.url || 
          pathname.startsWith(item.url + "/") ||
          item.items?.some(subItem => pathname === subItem.url)

        if (!item.items) {
          return (
            <Link href={item.url} key={index}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  isActive && "bg-secondary"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          )
        }

        return (
          <Accordion
            key={index}
            type="single"
            collapsible
            defaultValue={isActive ? item.title : undefined}
          >
            <AccordionItem value={item.title} className="border-none">
              <AccordionTrigger asChild>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-between gap-2",
                    isActive && "bg-secondary"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </div>
                </Button>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1 pt-2">
                  {item.items.map((subItem, subIndex) => {
                    const isSubItemActive = pathname === subItem.url
                    return (
                      <Link href={subItem.url} key={subIndex}>
                        <Button
                          variant={isSubItemActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start pl-8",
                            isSubItemActive && "bg-secondary"
                          )}
                        >
                          {subItem.title}
                        </Button>
                      </Link>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      })}
    </div>
  )
} 