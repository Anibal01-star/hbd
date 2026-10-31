
import { useEffect, useRef, useState } from 'react'
import { Heart, ArrowDown, ArrowRight, Camera } from 'lucide-react'
import '../styles/memory-timeline.css'

interface Memory {
  date: string
  title: string
  description: string
  image: string
  label: string
}

interface MemoryTimelineProps {
  onContinue: () => void
}

const memories: Memory[] = [
  {
    date: 'OUR FIRST MOMENT',
    title: 'The Beginning of Us',
    description:
      'Setiap cerita indah pasti memiliki awal. Dan aku bersyukur, ceritaku dimulai dengan mengenalmu.',
    image: '/images/memory-1.jpg',
    label: 'A beautiful beginning',
  },
  {
    date: 'A SPECIAL DAY',
    title: 'One of My Favorite Memories',
    description:
      'Mungkin terlihat sederhana, tetapi momen seperti ini selalu punya tempat tersendiri di hatiku.',
    image: '/images/memory-2.jpg',
    label: 'A moment to remember',
  },
  {
    date: 'LITTLE HAPPINESS',
    title: 'The Little Things',
    description:
      'Aku suka bagaimana hal-hal kecil bersamamu bisa menjadi sesuatu yang begitu berarti.',
    image: '/images/memory-3.jpg',
    label: 'Little things, big feelings',
  },
  {
    date: 'AND MANY MORE...',
    title: 'Our Story Continues',
    description:
      'Masih banyak cerita yang belum kita tulis. Semoga kita punya lebih banyak waktu untuk menciptakannya bersama.',
    image: '/images/memory-4.jpg',
    label: 'To many more memories',
  },
]

function MemoryTimeline({ onContinue }: MemoryTimelineProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index
            )

            setVisibleItems((previous) =>
              previous.includes(index)
                ? previous
                : [...previous, index]
            )
          }
        })
      },
      { threshold: 0.15 }
    )

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="memory-page">

      {/* Decorations */}
      <div className="memory-decoration memory-flower">✿</div>
      <div className="memory-decoration memory-heart">♡</div>
      <div className="memory-decoration memory-star">✧</div>

      {/* Header */}
      <header className="memory-header">
        <span className="memory-eyebrow">
          A COLLECTION OF OUR MOMENTS
        </span>

        <h1 className="memory-main-title">
          Every Little Moment
          <br />
          <em>With You</em>
        </h1>

        <p className="memory-intro">
          Some moments become memories.
          <br />
          Some people become a part of our hearts.
        </p>

        <div className="memory-heart-divider">
          <span />
          ♡
          <span />
        </div>

        <div className="memory-scroll-hint">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={15} />
        </div>
      </header>

      {/* Timeline */}
      <section className="memory-timeline">

        <div className="timeline-line" />

        {memories.map((memory, index) => (
          <div
            key={index}
            ref={(element) => {
              itemRefs.current[index] = element
            }}
            data-index={index}
            className={`memory-item ${
              index % 2 === 0 ? 'memory-left' : 'memory-right'
            } ${visibleItems.includes(index) ? 'memory-visible' : ''}`}
          >

            {/* Timeline dot */}
            <div className="memory-dot">
              <Heart size={13} fill="currentColor" />
            </div>

            {/* Memory Card */}
            <article className="memory-card">

              <div className="memory-photo">
                <div className="memory-photo-placeholder">
                  <Camera size={30} />
                  <span>Our Photo</span>
                  <small>Replace with your picture ♡</small>
                </div>

                <img
                  src={memory.image}
                  alt={memory.title}
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />

                <span className="memory-photo-number">
                  MEMORY 0{index + 1}
                </span>
              </div>

              <div className="memory-card-content">

                <span className="memory-date">
                  {memory.date}
                </span>

                <h2>{memory.title}</h2>

                <p>{memory.description}</p>

                <div className="memory-label">
                  <Heart size={12} fill="currentColor" />
                  {memory.label}
                </div>

              </div>

            </article>

          </div>
        ))}

      </section>

      {/* Ending */}
      <section className="memory-ending">

        <div className="memory-ending-icon">♡</div>

        <span className="memory-eyebrow">
          THIS IS JUST THE BEGINNING
        </span>

        <h2>
          And the best part
          <br />
          <em>is yet to come.</em>
        </h2>

        <p>
          Terima kasih sudah menjadi bagian dari
          cerita yang ingin terus aku lanjutkan.
          Semoga masih banyak kenangan indah
          yang bisa kita buat bersama.
        </p>

        <div className="memory-ending-signature">
          With love, always. ♡
        </div>

        <button
          className="memory-continue-button"
          onClick={onContinue}
        >
          Read My Letter
          <ArrowRight size={17} />
        </button>

      </section>

      <footer className="memory-footer">
        MADE WITH LOVE FOR NURFIKA RAMADINA ♡
      </footer>

    </main>
  )
}

export default MemoryTimeline
