import { useState } from 'react'
import { IphoneMock } from './components/IphoneMock.jsx'
import { Splash } from './screens/Splash.jsx'
import './App.css'

function App() {
  const [screen, setScreen] = useState('splash')

  return (
    <IphoneMock>
      {screen === 'splash' && (
        <Splash onContinue={() => setScreen('home')} />
      )}
      {screen === 'home' && (
        <main className="sleep-os">
          <header className="sleep-os__header">
            <span className="sleep-os__logo">SleepOS</span>
            <time className="sleep-os__clock" dateTime="22:30">10:30</time>
          </header>
          <section className="sleep-os__body">
            <h1 className="sleep-os__title">Ready to build</h1>
            <p className="sleep-os__hint">Splash screen done. Add more screens here.</p>
          </section>
        </main>
      )}
    </IphoneMock>
  )
}

export default App
