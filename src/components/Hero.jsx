import { motion } from 'framer-motion'

const B = import.meta.env.BASE_URL

const TOP_CELLS = [
  {
    src: `${B}scraped/img_3.jpg`,
    label: 'All Exclusive',
    sub: 'Polos Premium',
    href: '#catalogo',
  },
  {
    src: `${B}scraped/img_6.jpg`,
    label: 'All Exclusive',
    sub: 'Art Series',
    href: '#catalogo',
  },
]

const BOTTOM_CELLS = [
  {
    src: `${B}scraped/img_10.jpg`,
    label: 'All Exclusive',
    sub: 'Limited Edition',
    href: '#catalogo',
  },
  {
    src: `${B}scraped/img_5.jpg`,
    label: 'All Exclusive',
    sub: 'Street Series',
    href: '#catalogo',
  },
  {
    src: `${B}scraped/img_7.jpg`,
    label: 'All Exclusive',
    sub: 'Versace Inspired',
    href: '#catalogo',
  },
]

export default function Hero() {
  return (
    <section id="inicio" style={styles.section}>
      {/* Top row — 2 large panels */}
      <div className="hero-grid">
        {TOP_CELLS.map((cell, i) => (
          <HeroCell key={i} cell={cell} tall />
        ))}
      </div>

      {/* Bottom row — 3 smaller panels */}
      <div className="hero-row-bottom">
        {BOTTOM_CELLS.map((cell, i) => (
          <HeroCell key={i} cell={cell} />
        ))}
      </div>
    </section>
  )
}

function HeroCell({ cell, tall }) {
  return (
    <motion.div
      style={{ ...styles.cell, height: tall ? 540 : 380 }}
      whileHover="hover"
      initial="rest"
    >
      {/* Photo */}
      <motion.div
        style={{ ...styles.imgWrap }}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={cell.src}
          alt={cell.sub}
          style={styles.img}
          loading="lazy"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div style={styles.gradient} />

      {/* Bottom info */}
      <div style={styles.info}>
        <div style={styles.infoLeft}>
          <p style={styles.brand}>{cell.label}</p>
          <p style={styles.sub}>{cell.sub}</p>
        </div>
        <motion.a
          href={cell.href}
          style={styles.shopBtn}
          variants={{
            rest: { background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' },
            hover: { background: '#fff', color: '#000', borderColor: '#fff' },
          }}
          transition={{ duration: 0.25 }}
        >
          Shop
        </motion.a>
      </div>
    </motion.div>
  )
}

const styles = {
  section: {
    background: '#e2e0db',
  },
  cell: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    background: '#d8d6d0',
  },
  imgWrap: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    display: 'block',
  },
  gradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, transparent 65%)',
    pointerEvents: 'none',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px 22px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  infoLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  brand: {
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.7)',
  },
  sub: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.25rem',
    fontWeight: 400,
    color: '#fff',
    letterSpacing: '0.02em',
  },
  shopBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 20px',
    border: '1px solid',
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    flexShrink: 0,
    backdropFilter: 'blur(4px)',
  },
}
