
import { useState } from 'react'
import { Heart, Sparkles, Gift } from 'lucide-react'
import '../styles/mini-game.css'

interface MiniGameProps {
  onContinue: () => void
}

const heartItems = [
  { id: 1, message: 'Your smile makes my day better.' },
  { id: 2, message: 'You make ordinary days feel special.' },
  { id: 3, message: 'You deserve all the happiness.' },
  { id: 4, message: 'You are one of my favorite people.' },
  { id: 5, message: 'I am grateful to have you.' },
  { id: 6, message: 'There are still many memories to make.' },
]

function MiniGame({ onContinue }: MiniGameProps) {
  const [collectedHearts, setCollectedHearts] = useState<number[]>([])

  const isCompleted = collectedHearts.length >= 5

  const handleCollect = (id: number) => {
    if (collectedHearts.includes(id) || isCompleted) return

    setCollectedHearts((previous) => [...previous, id])
  }

  return (
    <main className="minigame-page">
      <div className="minigame-decoration minigame-decoration-one">✿</div>
      <div className="minigame-decoration minigame-decoration-two">♡</div>
      <div className="minigame-decoration minigame-decoration-three">✧</div>

      <section className="minigame-content">
        <p className="minigame-eyebrow">
          <Sparkles size={14} />
          A LITTLE GAME FOR YOU
        </p>

        <h1 className="minigame-title">
          Collect the <span>Hearts</span>
        </h1>

        <p className="minigame-description">
          Ada 6 hati tersembunyi di sini. Kumpulkan 5 hati untuk
          membuka kejutan kecil berikutnya!
        </p>

        <div className="minigame-score">
          <div className="minigame-score-label">
            <Heart size={17} fill="currentColor" />
            <span>Your Hearts</span>
          </div>

          <strong>{collectedHearts.length} / 5</strong>
        </div>

        <div className="minigame-progress">
          <div
            className="minigame-progress-fill"
            style={{
              width: `${Math.min((collectedHearts.length / 5) * 100, 100)}%`,
            }}
          />
        </div>

        {!isCompleted ? (
          <>
            <div className="heart-grid">
              {heartItems.map((item) => {
                const isCollected = collectedHearts.includes(item.id)

                return (
                  <button
                    key={item.id}
                    className={`heart-card ${isCollected ? 'collected' : ''}`}
                    onClick={() => handleCollect(item.id)}
                    disabled={isCollected}
                    aria-label={`Collect heart ${item.id}`}
                  >
                    <span className="heart-card-icon">
                      <Heart
                        size={34}
                        fill={isCollected ? 'currentColor' : 'none'}
                      />
                    </span>

                    <span className="heart-card-number">
                      {isCollected ? 'Collected ♡' : `Heart ${item.id}`}
                    </span>
                  </button>
                )
              })}
            </div>

            <p className="minigame-hint">
              Tap the hearts to collect them ♡
            </p>
          </>
        ) : (
          <div className="minigame-complete">
            <div className="minigame-complete-icon">
              <Gift size={38} />
              <Sparkles className="minigame-sparkle" size={20} />
            </div>

            <p className="minigame-complete-eyebrow">
              YOU DID IT!
            </p>

            <h2>You Collected All the Love!</h2>

            <p className="minigame-complete-message">
              {heartItems
                .filter((item) => collectedHearts.includes(item.id))
                .map((item) => item.message)
                .join(' ')}
            </p>

            <p className="minigame-final-message">
              And remember, there is always more love waiting for you. ♡
            </p>

            <button
              className="minigame-continue"
              onClick={onContinue}
            >
              Open Your Next Surprise
              <Heart size={16} fill="currentColor" />
            </button>
          </div>
          
        )}
      </section>

      <footer className="minigame-footer">
        A LITTLE GAME, MADE WITH LOVE
      </footer>
    </main>
  )
}

export default MiniGame
