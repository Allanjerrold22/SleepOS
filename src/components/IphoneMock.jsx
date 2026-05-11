import './IphoneMock.css'

/**
 * Desktop: realistic iPhone Pro chassis (correct aspect, bezel, depth).
 * Narrow viewports: full-bleed mobile layout (no decorative frame).
 */
export function IphoneMock({ children, modelName = 'iPhone 17 Pro' }) {
  return (
    <div className="iphone-mock" data-model={modelName}>
      <div className="iphone-mock__stage">
        <div className="iphone-mock__chassis">
          <div className="iphone-mock__mute" aria-hidden />
          <div className="iphone-mock__volume iphone-mock__volume--up" aria-hidden />
          <div className="iphone-mock__volume iphone-mock__volume--down" aria-hidden />
          <div className="iphone-mock__power" aria-hidden />
          <div className="iphone-mock__glass">
            <div className="iphone-mock__bezel-ring">
              <div className="iphone-mock__island" aria-hidden />
              <div className="iphone-mock__screen">{children}</div>
              <div className="iphone-mock__home-bar" aria-hidden />
            </div>
            <div className="iphone-mock__glare" aria-hidden />
          </div>
        </div>
        <p className="iphone-mock__caption">{modelName} · preview</p>
      </div>
    </div>
  )
}
