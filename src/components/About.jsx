import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section ref={ref} id="nosotros" style={styles.section}>
      {/* Full-width banner — like Zap's "Welcome" section */}
      <div style={styles.banner}>
        <motion.div style={{ ...styles.bannerImg, y }}>
          <img
            src={`${import.meta.env.BASE_URL}scraped/img_1.jpg`}
            alt="All Exclusive Store"
            style={styles.img}
          />
        </motion.div>
        <div style={styles.bannerOverlay} />
        <motion.div
          style={styles.bannerContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={styles.eyebrow}>Bienvenido a</p>
          <h2 style={styles.bannerTitle}>All Exclusive</h2>
          <p style={styles.bannerSub}>
            Moda de lujo desde México para el mundo · Est. 2022
          </p>
          <motion.a
            href="#catalogo"
            style={styles.discoverBtn}
            whileHover={{ background: '#fff', color: '#000' }}
            whileTap={{ scale: 0.97 }}
          >
            Descubrir Más
          </motion.a>
        </motion.div>
      </div>

      {/* Feature cards */}
      <div style={styles.cards}>
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            style={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <span style={styles.cardIcon}>{card.icon}</span>
            <h4 style={styles.cardTitle}>{card.title}</h4>
            <p style={styles.cardDesc}>{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const CARDS = [
  { icon: '✦', title: 'Calidad Premium', desc: 'Materiales seleccionados con los más altos estándares internacionales.' },
  { icon: '◈', title: 'Orgullo Mexicano', desc: 'Diseño con identidad propia, hecho en México para el mundo.' },
  { icon: '◇', title: 'Envío Rápido', desc: 'Entrega segura a todo México y próximamente al mundo.' },
  { icon: '◉', title: 'Exclusividad', desc: 'Piezas únicas y en cantidades limitadas para cada colección.' },
]

const styles = {
  section: {
    background: '#fff',
  },
  banner: {
    position: 'relative',
    height: 520,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImg: {
    position: 'absolute',
    inset: '-10% 0',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '120%',
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block',
  },
  bannerOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.42)',
  },
  bannerContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '0 5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  eyebrow: {
    fontSize: '0.62rem',
    fontWeight: 500,
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.65)',
  },
  bannerTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
    fontWeight: 300,
    letterSpacing: '0.12em',
    color: '#fff',
    lineHeight: 1,
  },
  bannerSub: {
    fontSize: '0.72rem',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  discoverBtn: {
    marginTop: 8,
    display: 'inline-flex',
    alignItems: 'center',
    padding: '13px 36px',
    border: '1px solid rgba(255,255,255,0.6)',
    background: 'transparent',
    color: '#fff',
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    borderTop: '1px solid #e2e0db',
  },
  card: {
    padding: '40px 32px',
    borderRight: '1px solid #e2e0db',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  cardIcon: {
    fontSize: '1.2rem',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.1rem',
    fontWeight: 400,
    color: '#1a1a1a',
  },
  cardDesc: {
    fontSize: '0.78rem',
    color: '#888',
    lineHeight: 1.65,
  },
}
