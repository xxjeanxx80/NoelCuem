"use client"
import { useEffect, useMemo, useState } from "react"
import { CHRISTMAS_DATE } from "@/config"

/**
 * Tính toán thời gian còn lại đến thời điểm đích
 */
function calc(target: Date) {
  const now = new Date()
  const ms = target.getTime() - now.getTime()
  const s = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(s / 86400)
  const hours = Math.floor((s % 86400) / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  return { days, hours, minutes, seconds }
}

/**
 * Component đếm ngược thời gian đến Giáng Sinh
 * Hiển thị số ngày, giờ, phút, giây còn lại
 */
export default function DemoCountdown() {
  const target = useMemo(() => new Date(CHRISTMAS_DATE), [])
  const [mounted, setMounted] = useState(false)
  const [state, setState] = useState(calc(target))
  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setState(calc(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  if (!mounted) return null
  return (
    <div className="flex gap-3 md:gap-4 w-full md:w-auto justify-center">
      <Box value={state.days} label="Ngày" />
      <Box value={state.hours} label="Giờ" />
      <Box value={state.minutes} label="Phút" />
      <Box value={state.seconds} label="Giây" highlight />
    </div>
  )
}

function Box({ value, label, highlight }: { value: number; label: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex size-14 md:size-16 items-center justify-center rounded-2xl bg-surface-dark border border-white/10 shadow-inner">
        <p className={`${highlight ? "text-primary" : "text-white"} text-xl md:text-2xl font-bold`}>{value}</p>
      </div>
      <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{label}</p>
    </div>
  )
}
