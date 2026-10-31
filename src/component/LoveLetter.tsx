
import { useState } from 'react'
import { Heart, Mail, ArrowRight } from 'lucide-react'
import '../styles/love-letter.css'

interface LoveLetterProps {
  onContinue: () => void
}

function LoveLetter({ onContinue }: LoveLetterProps) {
  const [isLetterOpened, setIsLetterOpened] = useState(false)

  return (
    <main className="love-letter-page">
      <div className="love-letter-decoration decoration-one">♡</div>
      <div className="love-letter-decoration decoration-two">✿</div>
      <div className="love-letter-decoration decoration-three">✧</div>

      {!isLetterOpened ? (
        <section className="letter-intro">
          <span className="letter-eyebrow">
            A LETTER FROM MY HEART
          </span>

          <h1 className="letter-title">
            Something <em>for you</em>
          </h1>

          <p className="letter-subtitle">
            Ada sesuatu yang ingin aku sampaikan di hari spesialmu.
          </p>

          <button
            type="button"
            className="letter-envelope-button"
            onClick={() => setIsLetterOpened(true)}
            aria-label="Buka surat untuk Fika"
          >
            <div className="letter-envelope">
              <div className="letter-envelope-back" />
              <div className="letter-envelope-paper">
                <Heart size={25} />
              </div>
              <div className="letter-envelope-front" />
              <div className="letter-envelope-flap" />
              <div className="letter-envelope-seal">♡</div>
            </div>
          </button>

          <button
            type="button"
            className="letter-open-button"
            onClick={() => setIsLetterOpened(true)}
          >
            <Mail size={16} />
            Open My Letter
          </button>

          <p className="letter-hint">
            A little message, written just for you ♡
          </p>
        </section>
      ) : (
        <section className="letter-content">
          <div className="letter-paper">
            <div className="letter-paper-decoration">♡</div>

            <p className="letter-date">
              NOVEMBER 1 · YOUR SPECIAL DAY
            </p>

            <h2 className="letter-heading">
              Untuk Fika, <em>sayangku.</em>
            </h2>

            <div className="letter-body">
              <p>
                Selamat ulang tahun yang ke-22,
                Nurfika Ramadina sayang.
              </p>

              <p>
                1 November bukan sekadar tanggal di kalender buatku,
                tapi hari di mana takdir menghadirkan sosok paling
                berharga ke dunia ini. Terima kasih ya, Fika, sudah
                hadir dan menjadi alasan di balik bahagianya hariku.
                Di saat dunia terasa riuh dan melelahkan, berada di
                dekatmu selalu jadi tempat ternyaman untuk aku pulang.
              </p>

              <p>
                Terima kasih atas kehangatanmu, kesabaranmu, dan
                caramu mencintaiku yang begitu tulus. Di usiamu yang
                baru ini, aku berdoa semoga langkahmu selalu dirawat
                oleh kebaikan, impianmu dipeluk oleh keberhasilan,
                dan hatimu selalu dipenuhi kebahagiaan yang tak
                pernah usai. Tetaplah jadi Fika yang aku kenal
                dan cintai.
              </p>

              <p className="letter-closing">
                Happy birthday, my home, my universe,
                Nurfika Ramadina. 🤍
              </p>
            </div>

            <div className="letter-signature">
              <span>With all my love,</span>
              <strong>Forever yours ♡</strong>
            </div>

            <div className="letter-bottom-decoration">
              ✿
            </div>
          </div>

          <button
            type="button"
            className="letter-continue-button"
            onClick={onContinue}
          >
            Continue Our Story
            <ArrowRight size={17} />
          </button>
        </section>
      )}
    </main>
  )
}

export default LoveLetter
