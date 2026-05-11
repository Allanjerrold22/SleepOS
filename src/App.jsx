import { useState, useCallback } from 'react'
import { IphoneMock } from './components/IphoneMock.jsx'
import { Splash } from './screens/Splash.jsx'
import { FeatureHub } from './screens/FeatureHub.jsx'
import './App.css'

const FADE_MS = 650

function App() {
  const [screen, setScreen] = useState('splash')
  const [activeFeature, setActiveFeature] = useState(0)
  const [fading, setFading] = useState(false)

  const handleGoHome = useCallback(() => {
    setFading(true)
    setTimeout(() => {
      setScreen('splash')
      setFading(false)
    }, FADE_MS)
  }, [])

  return (
    <>
      {screen === 'splash' ? (
        <IphoneMock>
          <Splash onContinue={() => setScreen('hub')} />
        </IphoneMock>
      ) : (
        <FeatureHub
          activeFeature={activeFeature}
          onSelect={setActiveFeature}
          onGoHome={handleGoHome}
        />
      )}

      {/* Full-screen black curtain for the hub → splash transition */}
      {fading && <div className="app-curtain" aria-hidden />}
    </>
  )
}

export default App
