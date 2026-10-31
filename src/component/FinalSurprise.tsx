
import { useState } from 'react'
import { Heart, Sparkles, RotateCcw, Star } from 'lucide-react'
import '../styles/final-surprise.css'

interface FinalSurpriseProps {
  onRestart: () => void
}

function FinalSurprise({ onRestart }: FinalSurpriseProps) {
  const [showMessage, setShowMessage] = useState(false)

  return (
    <main className="final-page">
      <div className="final-floating final-heart-one">♡</div>
      <div className="final-floating final-heart-two">♥</div>
      <div className="final-floating final-star-one">✧</div>
      <div className="final-floating final-star-two">✦</div>
      <div className="final-floating final-flower-one">✿</div>
      <div className="final-floating final-flower-two">❀</div>

      <section className="final-content">
        <div className="final-icon">
          <Heart size={43} fill="currentColor" />
          <Sparkles className="final-icon-sparkle" size={22} />
        </div>

        <p className="final-eyebrow">
          <Star size={12} fill="currentColor" />
          THE END OF THIS LITTLE JOURNEY
          <Star size={12} fill="currentColor" />
        </p>

        <h1 className="final-title">
          A Little World,
          <span>Just for You.</span>
        </h1>

        <p className="final-description">
          Dari sebuah amplop kecil hingga semua kenangan ini,
          ada satu hal yang ingin aku pastikan...
        </p>

        {!showMessage ? (
          <button
            className="final-reveal-button"
            onClick={() => setShowMessage(true)}
          >
            Reveal My Last Message
            <Heart size={16} fill="currentColor" />
          </button>
        ) : (
          <article className="final-message-card">
            <div className="final-card-decoration">♡</div>

            <p className="final-message-label">A MESSAGE FOR YOU</p>

            <h2>Dear Nurfika Ramadina,</h2>

            <p>
              Jika suatu hari nanti kamu merasa lelah, merasa tidak cukup
              baik, atau mulai meragukan dirimu sendiri, ingatlah bahwa
              kamu adalah seseorang yang sangat berharga.
            </p>

            <p>
              Jangan pernah merasa harus menjadi sempurna untuk pantas
              dicintai. Jadilah dirimu sendiri, tumbuh dengan caramu
              sendiri, dan jangan takut untuk mengejar apa yang membuatmu
              bahagia.
            </p>

            <p>
              Aku berharap tahun ini membawa lebih banyak alasan untuk
              tersenyum, lebih banyak kesempatan untuk berkembang, dan
              lebih banyak hal baik yang datang dalam hidupmu.
            </p>

            <p className="final-highlight">
              Happy Birthday, Fika.
              <br />
              May life always be gentle to your heart.
            </p>

            <div className="final-signature">
              <span>With love, always.</span>
              <strong>♡</strong>
            </div>
          </article>
        )}

        {showMessage && (
          <div className="final-bottom">
            <p>Thank you for being part of my little world.</p>

            <button
              className="final-restart-button"
              onClick={onRestart}
            >
              <RotateCcw size={15} />
              Start Our Story Again
            </button>
          </div>
        )}

        <p className="final-small-note">
          Made with love, especially for you.
        </p>
      </section>

      <footer className="final-footer">
        NURFIKA RAMADINA · FOREVER A SPECIAL PART OF MY STORY
      </footer>
    </main>
  )
}

export default FinalSurprise
