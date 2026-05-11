import './Splash.css'

export function Splash({ onContinue }) {
  return (
    <div className="splash">
      <div className="splash__bg" aria-hidden />

      <div className="splash__center">
        <img
          className="splash__logo"
          src="/SleepOS.svg"
          alt="SleepOS"
          draggable={false}
        />
        <p className="splash__wordmark">SleepOS</p>
      </div>

      <div className="splash__footer">
        <button className="splash__cta" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  )
}
