import { useState } from 'react'
import './WindDownScreen.css'

/* Particle positions precomputed once so they don't reshuffle on re-render */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${3 + i * 5.4}%`,
  delay: `${((i * 0.42) % 5).toFixed(2)}s`,
  duration: `${(4.8 + (i % 4) * 0.7).toFixed(2)}s`,
  size: i % 4 === 0 ? 3 : 2,
}))

/*
  states:
    'modal'    → namedrop bg + blur overlay + center logo + bottom texts
    'sleeping' → pure black, logo levitating at 40% from top
    'extended' → plain wallpaper, nothing else
*/

export function WindDownScreen() {
  const [state, setState] = useState('modal')

  return (
    <div className={`winddown winddown--${state}`}>
      {/* Wallpaper */}
      <img
        className="winddown__bg"
        src="/Insidepage.jpg"
        alt=""
        aria-hidden
        draggable={false}
      />

      {/* iOS NameDrop / proximity-style background animation */}
      <div className="winddown__namedrop" aria-hidden>
        <div className="winddown__glow" />
        <div className="winddown__beam winddown__beam--1" />
        <div className="winddown__beam winddown__beam--2" />
        <div className="winddown__beam winddown__beam--3" />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="winddown__particle"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Dark blur overlay */}
      <div className="winddown__overlay" aria-hidden />

      {/* Center logo (always rendered so it can transition between states) */}
      <img
        src="/SleepOS.svg"
        alt="SleepOS"
        className="winddown__logo"
        draggable={false}
      />

      {/* Bottom text + buttons */}
      <div className="winddown__texts">
        <p className="winddown__heading">Your screen time ends</p>
        <button
          className="winddown__cta"
          onClick={() => setState('sleeping')}
        >
          I'll sleep
        </button>
        <button
          className="winddown__extend"
          onClick={() => setState('extended')}
        >
          Extend 15 mins
        </button>
      </div>
    </div>
  )
}
