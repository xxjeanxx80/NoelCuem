"use client"
import { useEffect, useMemo, useState } from "react"

function diff(target: Date) {
  const now = new Date()
  const ms = target.getTime() - now.getTime()
  const s = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(s / 86400)
  const hours = Math.floor((s % 86400) / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  return { days, hours, minutes, seconds, done: s <= 0 }
}

export default function Countdown() {
  const target = useMemo(() => new Date("2025-12-25T00:00:00+07:00"), [])
  const [state, setState] = useState(diff(target))
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setState(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  if (!mounted) return null
  if (state.done) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <span className="rounded-lg bg-gold px-4 py-2 text-night">Giáng Sinh đã đến</span>
        <span className="rounded-lg bg-christmasGreen px-4 py-2">Chúc em hạnh phúc</span>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      <Time value={state.days} label="Ngày" />
      <Time value={state.hours} label="Giờ" />
      <Time value={state.minutes} label="Phút" />
      <Time value={state.seconds} label="Giây" />
    </div>
  )
}

function Time({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-white/70">{label}</div>
    </div>
  )
}
