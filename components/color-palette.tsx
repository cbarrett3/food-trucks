"use client"

import { ThemeToggle } from "./theme-toggle"

export function ColorPalette() {
  return (
    <div className="fixed bottom-4 left-4 p-4 bg-card rounded-lg shadow-lg border border-border max-w-xs z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">food truck palette</h3>
        <ThemeToggle />
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        <ColorSwatch color="oklch(0.75 0.15 60)" name="orange" />
        <ColorSwatch color="oklch(0.85 0.12 85)" name="yellow" />
        <ColorSwatch color="oklch(0.3 0.1 265)" name="blue" />
        <ColorSwatch color="oklch(0.65 0.12 145)" name="green" />
        <ColorSwatch color="oklch(0.55 0.1 60)" name="brown" />
      </div>
      
      <div className="mt-4 grid grid-cols-5 gap-2">
        <ColorSwatch color="var(--primary)" name="primary" />
        <ColorSwatch color="var(--secondary)" name="secondary" />
        <ColorSwatch color="var(--accent)" name="accent" />
        <ColorSwatch color="var(--muted)" name="muted" />
        <ColorSwatch color="var(--card)" name="card" />
      </div>
      
      <div className="text-xs mt-2 text-muted-foreground">toggle theme to see dark mode</div>
    </div>
  )
}

function ColorSwatch({ color, name }: { color: string; name: string }) {
  return (
    <div>
      <div 
        className="h-10 w-10 rounded-md border border-border" 
        style={{ backgroundColor: color }} 
        title={name}
      />
      <span className="text-xs">{name}</span>
    </div>
  )
}
