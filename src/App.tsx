
import { useEffect, useState } from 'react'
import Birthday from './component/Birthday'
import MemoryTimeline from './component/MemoryTimeline'
import LoveLetter from './component/LoveLetter'
import MiniGame from './component/MiniGame'
import Photobooth from './component/Photobooth'
import FinalSurprise from './component/FinalSurprise'

function App() {
  const [isOpened, setIsOpened] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showBirthday, setShowBirthday] = useState(false)
  const [showMemories, setShowMemories] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [showMiniGame, setShowMiniGame] = useState(false)
  const [showPhotobooth, setShowPhotobooth] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  useEffect(() => {
    if (!isOpened) return

    const timeout = window.setTimeout(() => {
      setShowWelcome(true)
    }, 850)

    return () => window.clearTimeout(timeout)
  }, [isOpened])

  // Final Surprise
  if (showFinal) {
    return (
      <FinalSurprise
        onRestart={() => {
          setIsOpened(false)
          setShowWelcome(false)
          setShowBirthday(false)
          setShowMemories(false)
          setShowLetter(false)
          setShowMiniGame(false)
          setShowPhotobooth(false)
          setShowFinal(false)
        }}
      />
    )
  }

  // Photobooth
  if (showPhotobooth) {
    return (
      <Photobooth
        onContinue={() => setShowFinal(true)}
      />
    )
  }

  // Mini Game
  if (showMiniGame) {
    return (
      <MiniGame
        onContinue={() => setShowPhotobooth(true)}
      />
    )
  }

  // Love Letter
  if (showLetter) {
    return (
      <LoveLetter
        onContinue={() => setShowMiniGame(true)}
      />
    )
  }

  // Memory Timeline
  if (showMemories) {
    return (
      <MemoryTimeline
        onContinue={() => setShowLetter(true)}
      />
    )
  }

  // Birthday Celebration
  if (showBirthday) {
    return (
      <Birthday
        onContinue={() => {
          setShowBirthday(false)
          setShowMemories(true)
        }}
      />
    )
  }

  // Opening dan Welcome
  return (
    <main className="opening-page">
      <div className="decor decor-left">✿</div>
      <div className="decor decor-right">♡</div>
      <div className="decor decor-top">✧</div>
      <div className="decor decor-bottom">✿</div>

      {!showWelcome ? (
        <section className="opening-content">
          <p className="eyebrow">
            A LITTLE SOMETHING FOR YOU
          </p>

          <h1 className="opening-title">
            A Little World
            <span>For Fika</span>
          </h1>

          <p className="opening-subtitle">
            Someone special deserves something special.
          </p>

          <div
            className={`envelope-wrapper ${isOpened ? 'is-open' : ''}`}
          >
            <div className="envelope">
              <div className="envelope-back" />

              <div className="envelope-paper">
                <span>For Fika ♡</span>
              </div>

              <div className="envelope-front" />
              <div className="envelope-flap" />
              <div className="envelope-seal">♡</div>
            </div>
          </div>

          <button
            className="open-button"
            onClick={() => setIsOpened(true)}
            disabled={isOpened}
          >
            {isOpened ? 'Opening your letter...' : 'Open Your Letter'}
          </button>

          <p className="hint">
            Made with love, especially for you
          </p>
        </section>
      ) : (
        <section className="welcome-content">
          <div className="welcome-icon">♡</div>

          <p className="eyebrow">
            A SPECIAL DAY FOR SOMEONE SPECIAL
          </p>

          <h1 className="welcome-title">
            Hello, <span>Fika!</span>
          </h1>

          <p className="welcome-message">
            Today is all about you.
            <br />
            I made a little world filled with love,
            memories, and wishes just for you.
          </p>

          <p className="welcome-signature">
            I hope you like it. ♡
          </p>

          <button
            type="button"
            className="welcome-next"
            onClick={() => setShowBirthday(true)}
          >
            Let's Begin <span>♡</span>
          </button>
        </section>
      )}

      <footer className="opening-footer">
        NURFIKA RAMADINA · MADE WITH LOVE
      </footer>
    </main>
  )
}

export default App
