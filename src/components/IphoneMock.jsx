import './IphoneMock.css'

/**
 * Desktop: realistic iPhone Pro chassis (correct aspect, bezel, depth).
 * Narrow viewports: full-bleed mobile layout (no decorative frame).
 */
/**
 * embedded=true  → sits inside a parent layout (FeatureHub); loses
 * its own full-height stage wrapper on desktop so the parent can control sizing.
 * On mobile it always fills the viewport regardless of this prop.
 */
export function IphoneMock({ children, modelName = 'iPhone 17 Pro', embedded = false }) {
  return (
    <div className={`iphone-mock${embedded ? ' iphone-mock--embedded' : ''}`} data-model={modelName}>
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
