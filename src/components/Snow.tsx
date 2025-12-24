"use client"
import { useEffect, useMemo } from "react"

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default function Snow() {
  const flakes = useMemo(() => Array.from({ length: 120 }, (_, i) => i), [])
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".snowflake")
    elements.forEach(el => {
      const size = random(3, 8)
      const left = random(0, 100)
      const duration = random(8, 16)
      const delay = random(0, 10)
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.left = `${left}%`
      el.style.animationDuration = `${duration}s`
      el.style.animationDelay = `${delay}s`
      el.style.opacity = `${random(0.5, 0.9)}`
    })
  }, [])
  return (
    <>
      {flakes.map(i => (
        <span key={i} className="snowflake animate-snow" />
      ))}
    </>
  )
}
