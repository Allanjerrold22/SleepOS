import { useState, useEffect, useRef } from 'react'
import './ReadinessScreen.css'

const TOTAL_SECONDS = 5 * 60

function formatSeconds(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}

/* Single digit slot: old digit exits down, new digit enters from top */
function FlipDigit({ char }) {
  const [current, setCurrent]   = useState(char)
  const [previous, setPrevious] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (char === current) return
    clearTimeout(timerRef.current)
    setPrevious(current)
    setCurrent(char)
    timerRef.current = setTimeout(() => setPrevious(null), 380)
    return () => clearTimeout(timerRef.current)
  }, [char]) // eslint-disable-line react-hooks/exhaustive-deps

  if (char === ':') return <span className="flip-digit flip-digit--colon">:</span>

  return (
    <span className="flip-digit">
      {previous !== null && (
        <span key={`out-${previous}`} className="flip-digit__char flip-digit__char--out">
          {previous}
        </span>
      )}
      <span key={`in-${current}`} className="flip-digit__char flip-digit__char--in">
        {current}
      </span>
    </span>
  )
}

/* Splits a time string into per-character FlipDigit slots */
function SplitTimer({ value }) {
  return (
    <span className="split-timer">
      {value.split('').map((char, i) => (
        <FlipDigit key={i} char={char} />
      ))}
    </span>
  )
}

/* ── 7-day streak wheel ── */

/* rgb values for each status so we can apply 0.6 alpha */
const STATUS_RGB = {
  great:  '48, 209, 88',
  good:   '255, 214, 10',
  fair:   '255, 159, 10',
  poor:   '255, 69, 58',
}

function statusFill(status) {
  const rgb = STATUS_RGB[status]
  return rgb ? `rgba(${rgb}, 0.6)` : 'rgba(255,255,255,0.10)'
}

/* Thicker stroke icons (strokeWidth 2) */
function StatusIcon({ status }) {
  const iconColor = status === 'good' ? '#1a1a00' : '#fff'
  if (status === 'great') return (
    <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
      <path d="M1.8 5.2 4 7.2l4.2-4.4" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  if (status === 'good') return (
    <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
      <path d="M7.2 3A3.2 3.2 0 1 1 3 6.8" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
  if (status === 'fair') return (
    <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
      <path d="M5 1.8v3.6" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="5" cy="7.8" r="0.9" fill={iconColor}/>
    </svg>
  )
  if (status === 'poor') return (
    <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
      <path d="M2.8 2.8l4.4 4.4M7.2 2.8l-4.4 4.4" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
  return null
}

const WEEK_DATA = [
  { day: 'M', status: 'great' },
  { day: 'T', status: 'good'  },
  { day: 'W', status: 'fair'  },
  { day: 'T', status: 'great' },
  { day: 'F', status: 'poor'  },
  { day: 'S', status: 'great' },
  { day: 'S', status: 'great', today: true },
]

function WeekStreak() {
  return (
    <div className="week-streak">
      {WEEK_DATA.map((d, i) => (
        <div key={i} className={`week-streak__day${d.today ? ' week-streak__day--today' : ''}`}>
          <div
            className="week-streak__circle"
            style={{ background: statusFill(d.status) }}
            aria-label={`${d.day}: ${d.status}`}
          >
            <StatusIcon status={d.status} />
          </div>
          <span className="week-streak__label">{d.day}</span>
        </div>
      ))}
    </div>
  )
}

/*
  timerPhase:
    'init'    – shows "5 min" label (before countdown starts)
    'running' – live countdown with per-second blur animation
    'done'    – shows "0:00"
*/

export function ReadinessScreen() {
  const [islandPhase, setIslandPhase] = useState('idle')
  const [timerPhase, setTimerPhase] = useState('init')
  const [seconds, setSeconds]       = useState(TOTAL_SECONDS)

  /* Island animation */
  useEffect(() => {
    const t1 = setTimeout(() => setIslandPhase('expanding'), 900)
    const t2 = setTimeout(() => setIslandPhase('expanded'),  1450)
    const t3 = setTimeout(() => setIslandPhase('compact'),   3450)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  /* Timer: start after island settles */
  useEffect(() => {
    const start = setTimeout(() => {
      setTimerPhase('running')
    }, 1800)
    return () => clearTimeout(start)
  }, [])

  useEffect(() => {
    if (timerPhase !== 'running') return
    if (seconds <= 0) { setTimerPhase('done'); return }

    const id = setInterval(() => {
      setSeconds(s => {
        const next = s - 1
        if (next <= 0) { setTimerPhase('done'); return 0 }
        return next
      })
    }, 1000)

    return () => clearInterval(id)
  }, [timerPhase, seconds])

  function handleIslandClick() {
    if (islandPhase === 'compact')   setIslandPhase('expanded')
    else if (islandPhase === 'expanded') setIslandPhase('compact')
  }

  /* What to show in the timer slot */
  const timerDisplay = timerPhase === 'init'
    ? '5 min'
    : formatSeconds(seconds)

  return (
    <div className="readiness">
      <img className="readiness__bg" src="/Insidepage.jpg" alt="" aria-hidden draggable={false} />
      <div className="readiness__vignette" aria-hidden />

      <button
        className={`readiness__island readiness__island--${islandPhase}`}
        onClick={handleIslandClick}
        aria-expanded={islandPhase === 'expanded'}
        aria-label={`Bedtime in ${timerDisplay}`}
      >
        <div className="readiness__compact-row">
          <div className="readiness__logo-wrap">
            <img src="/SleepOS.svg" alt="" className="readiness__logo" draggable={false} />
          </div>

          <div className="readiness__timer-block">
            <span className="readiness__eyebrow">Bedtime in</span>
            {timerPhase === 'init'
              ? <span className="readiness__timer">{timerDisplay}</span>
              : <SplitTimer value={timerDisplay} />
            }
            <span className="readiness__goal">Goal: 8 h in bed</span>
          </div>
        </div>

        <div className="readiness__expanded-body">
          <div className="readiness__divider" aria-hidden />
          <div className="readiness__row">
            <span className="readiness__row-label">Target window</span>
            <span className="readiness__row-value">11:00 PM – 7:00 AM</span>
          </div>
          <div className="readiness__divider" aria-hidden />

          {/* 7-day streak circles */}
          <WeekStreak />

          <div className="readiness__divider" aria-hidden />
          <div className="readiness__row">
            <span className="readiness__row-label">Tonight</span>
            <span className="readiness__row-value readiness__row-value--green">On track</span>
          </div>
          <p className="readiness__hint">Tap to dismiss</p>
        </div>
      </button>
    </div>
  )
}
