"use client"

import * as React from "react"
import * as SidebarPrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"

const Sidebar = React.forwardRef<
  React.ElementRef<typeof SidebarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SidebarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SidebarPrimitive.Root
    ref={ref}
    className={cn(
      "w-[220px] flex flex-col bg-background border-r",
      className
    )}
    {...props}
  />
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 border-b", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto p-4", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 border-t", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter }
