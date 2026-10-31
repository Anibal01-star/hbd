
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import {
  Camera,
  Download,
  ImagePlus,
  Heart,
  Sparkles,
  RotateCcw,
  ArrowRight,
} from 'lucide-react'
import '../styles/photobooth.css'

interface PhotoSettings {
  src: string | null
  zoom: number
  x: number
  y: number
}

interface PhotoboothProps {
  onContinue: () => void
}

const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 1800

const PHOTO_WIDTH = 460
const PHOTO_HEIGHT = 285
const PHOTO_GAP = 16

const STRIPS = [
  { x: 35, title: 'CAPTURE THE MOMENT' },
  { x: 625, title: 'FRAME THE MEMORY' },
]

const createEmptyPhotos = (): PhotoSettings[] =>
  Array.from({ length: 8 }, () => ({
    src: null,
    zoom: 1,
    x: 0,
    y: 0,
  }))

function Photobooth({ onContinue }: PhotoboothProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const imageCache = useRef<(HTMLImageElement | null)[]>(
    Array(8).fill(null),
  )

  const [photos, setPhotos] = useState<PhotoSettings[]>(createEmptyPhotos)
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [name, setName] = useState('NURFIKA RAMADINA')
  const [date, setDate] = useState('31.10.2026')
  const [location, setLocation] = useState('A LITTLE WORLD FOR FIKA')
  const [footerLeft, setFooterLeft] = useState('CAPTURE THE MOMENT')
  const [footerRight, setFooterRight] = useState('FRAME THE MEMORY')
  const [isDownloading, setIsDownloading] = useState(false)

  const drawCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return

    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    // Background burgundy
    ctx.fillStyle = '#681b29'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Background texture
    for (let y = 0; y < CANVAS_HEIGHT; y += 12) {
      for (let x = 0; x < CANVAS_WIDTH; x += 12) {
        const value = (x * 7 + y * 13) % 17

        ctx.fillStyle =
          value % 2 === 0
            ? 'rgba(255,255,255,0.045)'
            : 'rgba(30,0,0,0.06)'

        ctx.fillRect(x, y, 2, 2)
      }
    }

    // Decorative dotted outer border
    ctx.strokeStyle = '#f5dfc9'
    ctx.lineWidth = 2
    ctx.setLineDash([3, 12])
    ctx.strokeRect(15, 15, 1170, 1770)
    ctx.setLineDash([])

    STRIPS.forEach((strip, stripIndex) => {
      const cardX = strip.x
      const cardY = 45
      const cardWidth = 540
      const cardHeight = 1710

      // Cream paper card
      ctx.fillStyle = '#fff0df'
      ctx.fillRect(cardX, cardY, cardWidth, cardHeight)

      // Card outline
      ctx.strokeStyle = '#d5bda7'
      ctx.lineWidth = 3
      ctx.strokeRect(cardX + 10, cardY + 10, cardWidth - 20, cardHeight - 20)

      ctx.strokeStyle = '#b99e88'
      ctx.lineWidth = 1
      ctx.strokeRect(cardX + 18, cardY + 18, cardWidth - 36, cardHeight - 36)

      // Decorative top corners
      ctx.fillStyle = '#fff0df'

      for (const side of [0, 1]) {
        const cornerX = side === 0 ? cardX + 25 : cardX + cardWidth - 25

        ctx.beginPath()
        ctx.arc(cornerX, cardY + 35, 28, 0, Math.PI * 2)
        ctx.fill()
      }

      // Header
      ctx.textAlign = 'center'
      ctx.fillStyle = '#751e2b'
      ctx.font = 'bold 36px Georgia'
      ctx.fillText('FIKA.BOX', cardX + cardWidth / 2, cardY + 65)

      ctx.font = 'italic bold 21px Georgia'
      ctx.fillText(
        'by a little world studios',
        cardX + cardWidth / 2,
        cardY + 98,
      )

      // Header separator
      ctx.strokeStyle = '#b99e88'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(cardX + 18, cardY + 125)
      ctx.lineTo(cardX + cardWidth - 18, cardY + 125)
      ctx.stroke()

      // Ticket information grid
      const infoY = cardY + 125
      const infoHeight = 82
      const firstColumn = cardX + 260
      const secondColumn = cardX + 390

      ctx.beginPath()
      ctx.moveTo(firstColumn, infoY)
      ctx.lineTo(firstColumn, infoY + infoHeight)
      ctx.moveTo(secondColumn, infoY)
      ctx.lineTo(secondColumn, infoY + infoHeight)
      ctx.moveTo(cardX + 18, infoY + 40)
      ctx.lineTo(cardX + cardWidth - 18, infoY + 40)
      ctx.stroke()

      ctx.fillStyle = '#67483e'
      ctx.font = '19px Georgia'
      ctx.fillText('SPECIAL DAY', cardX + 130, infoY + 27)
      ctx.fillText('BOX', firstColumn + 65, infoY + 27)
      ctx.fillText('STUDIOS', secondColumn + 65, infoY + 27)

      ctx.fillStyle = '#7a2632'
      ctx.font = 'bold 23px Georgia'
      ctx.fillText(date, cardX + 130, infoY + 68)
      ctx.fillText('22', firstColumn + 65, infoY + 68)
      ctx.fillText('FIKA', secondColumn + 65, infoY + 68)

      // Photo frames
      const photoStartY = cardY + 230
      const firstPhotoIndex = stripIndex * 4

      for (let photoIndex = 0; photoIndex < 4; photoIndex++) {
        const globalIndex = firstPhotoIndex + photoIndex
        const photo = photos[globalIndex]
        const image = imageCache.current[globalIndex]

        const photoX = cardX + 40
        const photoY = photoStartY + photoIndex * (PHOTO_HEIGHT + PHOTO_GAP)

        // White photo border
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(
          photoX - 7,
          photoY - 7,
          PHOTO_WIDTH + 14,
          PHOTO_HEIGHT + 14,
        )

        ctx.fillStyle = '#e8dfd6'
        ctx.fillRect(photoX, photoY, PHOTO_WIDTH, PHOTO_HEIGHT)

        if (photo.src && image?.complete && image.naturalWidth > 0) {
          const scale =
            Math.max(
              PHOTO_WIDTH / image.naturalWidth,
              PHOTO_HEIGHT / image.naturalHeight,
            ) * photo.zoom

          const imageWidth = image.naturalWidth * scale
          const imageHeight = image.naturalHeight * scale

          const offsetX =
            (PHOTO_WIDTH - imageWidth) / 2 +
            (photo.x / 100) * PHOTO_WIDTH

          const offsetY =
            (PHOTO_HEIGHT - imageHeight) / 2 +
            (photo.y / 100) * PHOTO_HEIGHT

          ctx.save()
          ctx.beginPath()
          ctx.rect(photoX, photoY, PHOTO_WIDTH, PHOTO_HEIGHT)
          ctx.clip()

          ctx.drawImage(
            image,
            photoX + offsetX,
            photoY + offsetY,
            imageWidth,
            imageHeight,
          )

          ctx.restore()
        } else {
          ctx.fillStyle = '#a18d80'
          ctx.textAlign = 'center'
          ctx.font = '25px Georgia'
          ctx.fillText(
            `YOUR PHOTO ${globalIndex + 1}`,
            photoX + PHOTO_WIDTH / 2,
            photoY + PHOTO_HEIGHT / 2,
          )

          ctx.font = '17px Georgia'
          ctx.fillText(
            'Upload your memory',
            photoX + PHOTO_WIDTH / 2,
            photoY + PHOTO_HEIGHT / 2 + 35,
          )
        }
      }

      // Thank you ribbon
      const ribbonY = cardY + 1455

      ctx.fillStyle = '#fffdf8'
      ctx.fillRect(cardX + 18, ribbonY, cardWidth - 36, 38)

      ctx.fillStyle = '#70202b'
      ctx.font = 'bold 14px Georgia'
      ctx.textAlign = 'center'
      ctx.fillText(
        'THANK YOU  ★  SEE YOU  ★  THANK YOU  ★  SEE YOU',
        cardX + cardWidth / 2,
        ribbonY + 25,
      )

      // Footer title
      ctx.fillStyle = '#751e2b'
      ctx.font = 'bold 39px Georgia'
      ctx.fillText(
        stripIndex === 0 ? footerLeft : footerRight,
        cardX + cardWidth / 2,
        cardY + 1570,
        475,
      )

      ctx.fillStyle = '#201814'
      ctx.font = '34px Georgia'
      ctx.fillText('★', cardX + 50, cardY + 1578)
      ctx.fillText('★', cardX + cardWidth - 50, cardY + 1578)

      // Name and date
      ctx.fillStyle = '#63483c'
      ctx.font = 'italic 20px Georgia'
      ctx.fillText(name, cardX + cardWidth / 2, cardY + 1620, 450)

      ctx.font = '15px Georgia'
      ctx.fillText(
        location,
        cardX + cardWidth / 2,
        cardY + 1650,
        450,
      )
    })

    // Outer bottom decoration
    ctx.textAlign = 'center'
    ctx.fillStyle = '#f6e4d1'
    ctx.font = '17px Georgia'
    ctx.fillText('A LITTLE MEMORY TO KEEP FOREVER  ♥', 600, 1790)
  }

  useEffect(() => {
    photos.forEach((photo, index) => {
      if (!photo.src) {
        imageCache.current[index] = null
        return
      }

      if (imageCache.current[index]?.src === photo.src) return

      const image = new Image()

      image.onload = () => {
        imageCache.current[index] = image
        drawCanvas()
      }

      image.src = photo.src
    })

    drawCanvas()
  }, [photos, name, date, location, footerLeft, footerRight])

  const handleUpload = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Silakan pilih file gambar.')
      event.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result !== 'string') return

      imageCache.current[index] = null

      setPhotos((previous) =>
        previous.map((photo, photoIndex) =>
          photoIndex === index
            ? {
                src: reader.result as string,
                zoom: 1,
                x: 0,
                y: 0,
              }
            : photo,
        ),
      )

      setSelectedPhoto(index)
    }

    reader.onerror = () => {
      alert('Gagal membaca gambar. Silakan coba lagi.')
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const updatePhoto = (
    property: 'zoom' | 'x' | 'y',
    value: number,
  ) => {
    setPhotos((previous) =>
      previous.map((photo, index) =>
        index === selectedPhoto
          ? { ...photo, [property]: value }
          : photo,
      ),
    )
  }

  const resetSelectedPhoto = () => {
    setPhotos((previous) =>
      previous.map((photo, index) =>
        index === selectedPhoto
          ? { ...photo, zoom: 1, x: 0, y: 0 }
          : photo,
      ),
    )
  }

  const resetAll = () => {
    setPhotos(createEmptyPhotos())
    imageCache.current = Array(8).fill(null)
    setSelectedPhoto(0)
    setName('NURFIKA RAMADINA')
    setDate('31.10.2026')
    setLocation('A LITTLE WORLD FOR FIKA')
    setFooterLeft('CAPTURE THE MOMENT')
    setFooterRight('FRAME THE MEMORY')
  }

  const handleDownload = () => {
    const canvas = canvasRef.current

    if (!canvas) return

    drawCanvas()
    setIsDownloading(true)

    canvas.toBlob((blob) => {
      setIsDownloading(false)

      if (!blob) {
        alert('Gagal membuat gambar. Silakan coba lagi.')
        return
      }

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = 'Photobooth-Fika-8-Photos.png'

      document.body.appendChild(link)
      link.click()
      link.remove()

      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  const uploadedCount = photos.filter((photo) => photo.src).length
  const activePhoto = photos[selectedPhoto]

  return (
    <main className="photobooth-page">
      <div className="photobooth-decoration photobooth-decoration-left">
        <Heart size={35} />
      </div>

      <div className="photobooth-decoration photobooth-decoration-right">
        <Sparkles size={38} />
      </div>

      <section className="photobooth-header">
        <span className="photobooth-eyebrow">
          <Sparkles size={15} />
          YOUR PERSONAL PHOTOBOOTH
        </span>

        <h1>
          Selamat Ulang Tahun
          <span>ke-22, Sayang</span>
        </h1>

        <p>
          Eight little moments, captured in one beautiful memory.
        </p>
      </section>

      <section className="photobooth-workspace">
        <div className="photobooth-preview">
          <div className="photobooth-preview-heading">
            <div>
              <h2>Your Vintage Photobooth</h2>
              <p>Two strips, eight favorite memories.</p>
            </div>

            <span className="photobooth-counter">
              {uploadedCount}/8 Photos
            </span>
          </div>

          <div className="photobooth-canvas-wrapper">
            <canvas
              ref={canvasRef}
              className="photobooth-canvas"
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
            />
          </div>

          <p className="photobooth-preview-note">
            <Heart size={14} />
            Every picture tells a little story.
          </p>
        </div>

        <div className="photobooth-editor">
          <div className="photobooth-editor-heading">
            <span className="photobooth-editor-icon">
              <Camera size={20} />
            </span>

            <div>
              <h2>Create Your Photobooth</h2>
              <p>Customize your own photo strips.</p>
            </div>
          </div>

          <div className="photobooth-upload-section">
            <h3>01. Upload Eight Photos</h3>

            <p className="photobooth-description">
              Choose eight different photos for your two strips.
            </p>

            {[0, 1].map((stripIndex) => (
              <div className="photobooth-strip-group" key={stripIndex}>
                <h4>
                  {stripIndex === 0 ? 'Strip 1 · Left' : 'Strip 2 · Right'}
                </h4>

                <div className="photobooth-upload-grid">
                  {photos
                    .slice(stripIndex * 4, stripIndex * 4 + 4)
                    .map((photo, localIndex) => {
                      const index = stripIndex * 4 + localIndex

                      return (
                        <button
                          key={index}
                          type="button"
                          className={`photobooth-upload-card ${
                            selectedPhoto === index ? 'active' : ''
                          } ${photo.src ? 'has-image' : ''}`}
                          onClick={() => {
                            setSelectedPhoto(index)

                            if (!photo.src) {
                              fileInputRefs.current[index]?.click()
                            }
                          }}
                        >
                          {photo.src ? (
                            <img src={photo.src} alt={`Photo ${index + 1}`} />
                          ) : (
                            <span className="photobooth-upload-placeholder">
                              <ImagePlus size={23} />
                              <small>Photo {index + 1}</small>
                            </span>
                          )}

                          <span className="photobooth-upload-number">
                            {index + 1}
                          </span>

                          <input
                            ref={(element) => {
                              fileInputRefs.current[index] = element
                            }}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(event) => handleUpload(event, index)}
                          />
                        </button>
                      )
                    })}
                </div>
              </div>
            ))}

            <button
              type="button"
              className="photobooth-secondary-button"
              onClick={() =>
                fileInputRefs.current[selectedPhoto]?.click()
              }
            >
              <ImagePlus size={16} />
              {activePhoto.src ? 'Change Selected Photo' : 'Upload Selected Photo'}
            </button>
          </div>

          <div className="photobooth-editor-divider" />

          <div className="photobooth-adjust-section">
            <h3>02. Adjust Your Photo</h3>

            <p className="photobooth-description">
              Select a photo number to adjust its crop and position.
            </p>

            <div className="photobooth-photo-selector">
              {photos.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={
                    selectedPhoto === index
                      ? 'photobooth-selector-button active'
                      : 'photobooth-selector-button'
                  }
                  onClick={() => setSelectedPhoto(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="photobooth-range-control">
              <div className="photobooth-range-heading">
                <label htmlFor="photo-zoom">Zoom</label>
                <span>{activePhoto.zoom.toFixed(1)}x</span>
              </div>

              <input
                id="photo-zoom"
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={activePhoto.zoom}
                onChange={(event) =>
                  updatePhoto('zoom', Number(event.target.value))
                }
              />
            </div>

            <div className="photobooth-range-control">
              <div className="photobooth-range-heading">
                <label htmlFor="photo-horizontal">Horizontal Position</label>
                <span>{activePhoto.x}</span>
              </div>

              <input
                id="photo-horizontal"
                type="range"
                min="-100"
                max="100"
                value={activePhoto.x}
                onChange={(event) =>
                  updatePhoto('x', Number(event.target.value))
                }
              />
            </div>

            <div className="photobooth-range-control">
              <div className="photobooth-range-heading">
                <label htmlFor="photo-vertical">Vertical Position</label>
                <span>{activePhoto.y}</span>
              </div>

              <input
                id="photo-vertical"
                type="range"
                min="-100"
                max="100"
                value={activePhoto.y}
                onChange={(event) =>
                  updatePhoto('y', Number(event.target.value))
                }
              />
            </div>

            <button
              type="button"
              className="photobooth-reset-button"
              onClick={resetSelectedPhoto}
            >
              <RotateCcw size={15} />
              Reset Photo Position
            </button>
          </div>

          <div className="photobooth-editor-divider" />

          <div className="photobooth-caption-section">
            <h3>03. Customize Your Ticket</h3>

            <label htmlFor="booth-name">Name</label>
            <input
              id="booth-name"
              type="text"
              value={name}
              maxLength={35}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />

            <label htmlFor="booth-date">Date</label>
            <input
              id="booth-date"
              type="text"
              value={date}
              maxLength={20}
              onChange={(event) => setDate(event.target.value)}
              placeholder="31.10.2026"
            />

            <label htmlFor="booth-location">Small Text</label>
            <input
              id="booth-location"
              type="text"
              value={location}
              maxLength={35}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="A LITTLE WORLD FOR FIKA"
            />

            <label htmlFor="booth-footer-left">Left Strip Footer</label>
            <input
              id="booth-footer-left"
              type="text"
              value={footerLeft}
              maxLength={24}
              onChange={(event) => setFooterLeft(event.target.value)}
            />

            <label htmlFor="booth-footer-right">Right Strip Footer</label>
            <input
              id="booth-footer-right"
              type="text"
              value={footerRight}
              maxLength={24}
              onChange={(event) => setFooterRight(event.target.value)}
            />
          </div>

          <div className="photobooth-download-section">
            <button
              type="button"
              className="photobooth-download-button"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download size={18} />
              {isDownloading ? 'Preparing Image...' : 'Download Photobooth'}
            </button>

            <p>PNG format · 1200 × 1800 px · 2:3 ratio</p>
          </div>

          <button
            type="button"
            className="photobooth-reset-all"
            onClick={resetAll}
          >
            <RotateCcw size={14} />
            Reset Everything
          </button>
        </div>
      </section>

      <div className="photobooth-privacy">
        <Heart size={16} />
        <p>
          Your photos stay on your device. They are processed locally
          in your browser and are never uploaded to a server.
        </p>
      </div>

      <div className="photobooth-footer">
        <p>One more little surprise is waiting for you...</p>

        <button
          type="button"
          className="photobooth-continue-button"
          onClick={onContinue}
        >
          Continue to Your Surprise
          <ArrowRight size={17} />
        </button>
      </div>
    </main>
  )
}

export default Photobooth
