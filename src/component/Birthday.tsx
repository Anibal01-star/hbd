import { useState, type CSSProperties } from 'react'
import '../styles/birthday.css'

type BirthdayProps = {
  onContinue: () => void
}

const confettiPieces = Array.from({ length: 32 }, (_, index) => index)

function Birthday({ onContinue }: BirthdayProps) {
  const [wishMade, setWishMade] = useState(false)

  return (
    <main className="birthday-page">
      <div className="birthday-decor decor-left" aria-hidden="true">✿</div>
      <div className="birthday-decor decor-right" aria-hidden="true">♡</div>
      <div className="birthday-decor decor-top" aria-hidden="true">✧</div>
      <div className="birthday-decor decor-bottom" aria-hidden="true">✿</div>

      {wishMade && (
        <div className="confetti-container" aria-hidden="true">
          {confettiPieces.map((piece) => {
            const style: CSSProperties = {
              left: `${(piece * 37) % 100}%`,
              animationDelay: `${(piece % 12) * -0.22}s`,
              animationDuration: `${2.8 + (piece % 5) * 0.2}s`,
            }

            return (
              <span
                className={`confetti confetti-${(piece % 7) + 1}`}
                key={piece}
                style={style}
              />
            )
          })}
        </div>
      )}

      <section className="birthday-content">
        <p className="birthday-eyebrow">A LITTLE WORLD MADE JUST FOR YOU</p>
        <h1 className="birthday-title">
          Happy Birthday,
          <br />
          <em>Fika!</em>
        </h1>
        <p className="birthday-description">
          Make a wish and let this special day remind you how loved you are.
        </p>

        <div
          className={`cake-scene${wishMade ? ' candles-blown' : ''}`}
          role="img"
          aria-label={wishMade ? 'Birthday cake with candles blown out' : 'Birthday cake with three lit candles'}
        >
          <span className="cake-sparkle sparkle-one" aria-hidden="true">✧</span>
          <span className="cake-sparkle sparkle-two" aria-hidden="true">✦</span>
          <span className="cake-sparkle sparkle-three" aria-hidden="true">✧</span>

          <div className="candles" aria-hidden="true">
            {[0, 1, 2].map((candle) => (
              <div className="candle" key={candle}>
                <div className="candle-stick" />
                <div className="flame">
                  <div className="flame-inner" />
                </div>
              </div>
            ))}
          </div>

          <div className="cake-top" aria-hidden="true">
            <div className="cake-icing" />
            <span>♡</span>
          </div>
          <div className="cake-middle" aria-hidden="true">
            <div className="icing-drip drip-one" />
            <div className="icing-drip drip-two" />
            <div className="icing-drip drip-three" />
            <span className="cake-decoration">✿</span>
            <span className="cake-decoration cake-decoration-two">♡</span>
          </div>
          <div className="cake-bottom" aria-hidden="true">
            <span>FIKA</span>
          </div>
          <div className="cake-plate" aria-hidden="true" />
        </div>

        {!wishMade ? (
          <section className="wish-section" aria-live="polite">
            <p className="wish-instruction">Close your eyes and make a wish...</p>
            <button className="wish-button" onClick={() => setWishMade(true)}>
              Blow Out the Candles ♡
            </button>
          </section>
        ) : (
          <section className="birthday-surprise" aria-live="polite">
            <div className="surprise-icon" aria-hidden="true">♡</div>
            <h2>
              Make a wish,
              <br />
              <em>dear Fika!</em>
            </h2>
            <p>
              May your year ahead be filled with laughter, lovely surprises,
              and all the happiness your heart can hold.
            </p>
            <p className="surprise-signature">With all my love, always. ♡</p>
            <button className="wish-button continue-button" onClick={onContinue}>
              Back to the Beginning →
            </button>
          </section>
        )}
      </section>

      <footer className="birthday-footer">MADE WITH LOVE FOR NURFIKA RAMADINA ♡</footer>
    </main>
  )
}

export default Birthday