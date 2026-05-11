import { useState } from 'react'
import { IphoneMock } from '../components/IphoneMock.jsx'
import { ReadinessScreen } from './ReadinessScreen.jsx'
import { WindDownScreen } from './WindDownScreen.jsx'
import './FeatureHub.css'

export const FEATURES = [
  {
    id: 0,
    key: 'readiness',
    label: 'Readiness',
    sub: "tonight's sleep status.",
    side: 'left',
  },
  {
    id: 1,
    key: 'winddown',
    label: 'Wind-down',
    sub: 'calm pre-sleep mode.',
    side: 'left',
  },
  {
    id: 2,
    key: 'tracking',
    label: 'Tracking',
    sub: 'overnight sleep sensing.',
    side: 'left',
  },
  {
    id: 3,
    key: 'wake',
    label: 'Wake',
    tag: 'Ring OS',
    sub: 'silent haptic alarm.',
    side: 'right',
  },
  {
    id: 4,
    key: 'recovery',
    label: 'Recovery',
    tag: 'Ring OS',
    sub: 'morning sleep summary.',
    side: 'right',
  },
  {
    id: 5,
    key: 'context',
    label: 'Context',
    tag: 'Ring OS',
    sub: 'lifestyle & environment logs.',
    side: 'right',
  },
]

/* ── Inline SVG icons (18×18 viewBox, currentColor) ── */
export function FeatureIcon({ featureKey }) {
  return (
    <svg className="fhub__svg" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      {featureKey === 'readiness' && (
        <path
          d="M13.5 9.75A5.75 5.75 0 1 1 7.25 4a4.25 4.25 0 0 0 6.25 5.75z"
          fill="currentColor"
        />
      )}
      {featureKey === 'winddown' && (
        <>
          <path
            d="M2.5 7c1.1-1.8 2.6-1.8 3.7 0 1.1 1.8 2.6 1.8 3.7 0 1.1-1.8 2.6-1.8 3.6 0"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          />
          <path
            d="M2.5 11c1.1-1.8 2.6-1.8 3.7 0 1.1 1.8 2.6 1.8 3.7 0 1.1-1.8 2.6-1.8 3.6 0"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          />
        </>
      )}
      {featureKey === 'tracking' && (
        <>
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="9" cy="9" r="2" fill="currentColor" />
        </>
      )}
      {featureKey === 'wake' && (
        <>
          <path
            d="M9 2a1 1 0 0 0-1 1v.35A5 5 0 0 0 4 8.2V11l-1 1.5h12L14 11V8.2A5 5 0 0 0 10 3.35V3a1 1 0 0 0-1-1z"
            fill="currentColor"
          />
          <path d="M7.5 14.5a1.5 1.5 0 0 0 3 0" fill="currentColor" />
        </>
      )}
      {featureKey === 'recovery' && (
        <>
          <path
            d="M9 4V2.5M4 9H2.5M13.5 9H15M5.5 5.5 4.4 4.4M12.5 5.5l1.1-1.1"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          />
          <path
            d="M4.5 13.5a4.5 4.5 0 0 1 9 0"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          />
          <path
            d="M2.5 13.5h13"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          />
        </>
      )}
      {featureKey === 'context' && (
        <>
          <rect x="2.5" y="2.5" width="5" height="5" rx="1.2" fill="currentColor" />
          <rect x="10.5" y="2.5" width="5" height="5" rx="1.2" fill="currentColor" />
          <rect x="2.5" y="10.5" width="5" height="5" rx="1.2" fill="currentColor" />
          <rect x="10.5" y="10.5" width="5" height="5" rx="1.2" fill="currentColor" />
        </>
      )}
    </svg>
  )
}

/* Stroke retry / reload icon — plain, no background */
function RetryIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path
        d="M11 6.5A4.5 4.5 0 1 1 9.5 3"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
      />
      <polyline
        points="8,1.2 10,3.2 8,5.2"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Side feature item ── */
function FeatureItem({ feature, isActive, onClick, onRetry, staggerIndex }) {
  return (
    <div
      className={`fhub-item-wrap fhub-item-wrap--${feature.side}${isActive ? ' fhub-item-wrap--active' : ''}`}
      style={{ '--i': staggerIndex }}
    >
      {/* Retry — sits outside the row, at the very start */}
      {isActive && (
        <button
          className="fhub-item__retry"
          aria-label={`Retry ${feature.label}`}
          onClick={onRetry}
        >
          <RetryIcon />
        </button>
      )}

      {/* Main select row */}
      <button
        className={`fhub-item fhub-item--${feature.side}${isActive ? ' fhub-item--active' : ''}`}
        onClick={onClick}
        aria-pressed={isActive}
      >
        {feature.side === 'right' && <span className="fhub-item__line" aria-hidden />}

        <span className="fhub-item__icon">
          <FeatureIcon featureKey={feature.key} />
        </span>

        <span className="fhub-item__text">
          <span className="fhub-item__name">
            {feature.label}
            {feature.tag && <span className="fhub-item__tag">{feature.tag}</span>}
          </span>
          <span className="fhub-item__sub">{feature.sub}</span>
        </span>

        {feature.side === 'left' && <span className="fhub-item__line" aria-hidden />}
      </button>
    </div>
  )
}

/* Shared full-bleed wrapper with mobile nav */
function FullBleedScreen({ children, activeFeature, onSelect }) {
  return (
    <div className="fphone fphone--fullbleed">
      {children}
      <nav className="fphone__nav" aria-label="Features">
        {FEATURES.map(f => (
          <button
            key={f.key}
            className={`fphone__nav-btn${f.id === activeFeature ? ' fphone__nav-btn--active' : ''}`}
            onClick={() => onSelect(f.id)}
            aria-label={f.label}
          >
            <FeatureIcon featureKey={f.key} />
            <span className="fphone__nav-label">{f.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

/* ── Phone screen content ── */
function PhoneContent({ feature, activeFeature, onSelect, retryKey }) {
  if (feature.key === 'readiness') {
    return (
      <FullBleedScreen activeFeature={activeFeature} onSelect={onSelect}>
        <ReadinessScreen key={retryKey} />
      </FullBleedScreen>
    )
  }

  if (feature.key === 'winddown') {
    return (
      <FullBleedScreen activeFeature={activeFeature} onSelect={onSelect}>
        <WindDownScreen key={retryKey} />
      </FullBleedScreen>
    )
  }

  return (
    <div className="fphone">
      {/* Status bar area (clears the Dynamic Island) */}
      <div className="fphone__statusbar">
        <span className="fphone__time">10:30</span>
      </div>

      {/* Placeholder body */}
      <div className="fphone__body">
        <div className="fphone__icon-box">
          <FeatureIcon featureKey={feature.key} />
        </div>
        <div className="fphone__meta">
          <h2 className="fphone__name">
            {feature.label}
          </h2>
          {feature.tag && <span className="fphone__tag">{feature.tag}</span>}
        </div>
        <p className="fphone__sub">{feature.sub}</p>
        <p className="fphone__proto-label">Interaction prototype coming soon</p>
      </div>

      {/* Mobile-only bottom feature nav */}
      <nav className="fphone__nav" aria-label="Features">
        {FEATURES.map(f => (
          <button
            key={f.key}
            className={`fphone__nav-btn${f.id === activeFeature ? ' fphone__nav-btn--active' : ''}`}
            onClick={() => onSelect(f.id)}
            aria-label={f.label}
          >
            <FeatureIcon featureKey={f.key} />
            <span className="fphone__nav-label">{f.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

/* ── Top bar ── */
function HubTopBar({ onGoHome }) {
  return (
    <div className="fhub__topbar">
      <button
        className="fhub__topbar-logo"
        onClick={onGoHome}
        aria-label="Back to splash screen"
      >
        <img src="/SleepOS.svg" alt="SleepOS" draggable={false} />
        <span>SleepOS</span>
      </button>

      <a
        className="fhub__topbar-portfolio"
        href="https://allanjerrold.framer.ai/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Allan&apos;s portfolio</span>
        {/* circle-arrow icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
          <path
            d="M5.5 10.5 10 6M10 6H6.5M10 6v3.5"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  )
}

/* ── Main export ── */
export function FeatureHub({ activeFeature, onSelect, onGoHome }) {
  const [retryCounts, setRetryCounts] = useState({})
  const leftFeatures = FEATURES.filter(f => f.side === 'left')
  const rightFeatures = FEATURES.filter(f => f.side === 'right')

  function handleRetry(featureKey) {
    setRetryCounts(prev => ({ ...prev, [featureKey]: (prev[featureKey] || 0) + 1 }))
  }

  const activeFeatureObj = FEATURES[activeFeature]
  const retryKey = `${activeFeatureObj.key}-${retryCounts[activeFeatureObj.key] || 0}`

  return (
    <div className="fhub">
      <div className="fhub__ambient ambient-bg" aria-hidden />
      <HubTopBar onGoHome={onGoHome} />
      <div className="fhub__inner">
        <aside className="fhub__side fhub__side--left" aria-label="App features">
          {leftFeatures.map((f, i) => (
            <FeatureItem
              key={f.key}
              feature={f}
              isActive={activeFeature === f.id}
              onClick={() => onSelect(f.id)}
              onRetry={() => handleRetry(f.key)}
              staggerIndex={i}
            />
          ))}
        </aside>

        <div className="fhub__phone">
          <IphoneMock modelName="iPhone 17 Pro" embedded>
            <PhoneContent
              key={activeFeatureObj.key}
              feature={activeFeatureObj}
              activeFeature={activeFeature}
              onSelect={onSelect}
              retryKey={retryKey}
            />
          </IphoneMock>
        </div>

        <aside className="fhub__side fhub__side--right" aria-label="Ring OS features">
          {rightFeatures.map((f, i) => (
            <FeatureItem
              key={f.key}
              feature={f}
              isActive={activeFeature === f.id}
              onClick={() => onSelect(f.id)}
              onRetry={() => handleRetry(f.key)}
              staggerIndex={i}
            />
          ))}
        </aside>
      </div>
    </div>
  )
}
