import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.article
      style={styles.card}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image area */}
      <div style={styles.imgWrap}>
        {product.image && !imgError ? (
          <motion.img
            src={product.image}
            alt={product.name}
            style={styles.productImg}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={styles.placeholder}>
            <PlaceholderIcon />
          </div>
        )}

        {/* Tag */}
        {product.tag && (
          <span style={{
            ...styles.tag,
            background: product.tag.includes('%') ? '#c0392b' : '#1a1a1a',
          }}>
            {product.tag}
          </span>
        )}

        {/* Hover actions */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              style={styles.actions}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                style={styles.actionBtn}
                onClick={() => onQuickView(product)}
                whileHover={{ background: '#1a1a1a', color: '#fff' }}
                whileTap={{ scale: 0.93 }}
                title="Vista rápida"
              >
                <EyeIcon />
              </motion.button>
              <motion.button
                style={{ ...styles.actionBtn, ...styles.actionBtnFilled }}
                onClick={() => onAddToCart(product)}
                whileHover={{ background: '#333' }}
                whileTap={{ scale: 0.93 }}
                title="Agregar al carrito"
              >
                <BagIcon />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div style={styles.info}>
        <span style={styles.category}>{categoryLabel(product.category)}</span>
        <h3 style={styles.name}>{product.name}</h3>
        <div style={styles.footer}>
          <div>
            <span style={styles.price}>${product.price.toLocaleString()} MXN</span>
            {product.originalPrice && (
              <span style={styles.origPrice}>${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <motion.button
            style={styles.addBtn}
            onClick={() => onAddToCart(product)}
            whileHover={{ background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' }}
            whileTap={{ scale: 0.92 }}
          >
            +
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

function categoryLabel(cat) {
  return { camisetas: 'Camiseta', polos: 'Polo', camisas: 'Camisa' }[cat] || cat
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}
function BagIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}
function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 60 80" style={{ width: 40, opacity: 0.15 }}>
      <ellipse cx="30" cy="12" rx="10" ry="11" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
      <path d="M20 23 Q14 30 13 48 L47 48 Q46 30 40 23 Z" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
      <path d="M13 48 L10 75 L22 75 L26 58 L34 58 L38 75 L50 75 L47 48 Z" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
    </svg>
  )
}

const styles = {
  card: {
    background: '#fff',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  imgWrap: {
    position: 'relative',
    height: 320,
    background: '#f0eeeb',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    display: 'block',
  },
  placeholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  tag: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 2,
    padding: '4px 10px',
    color: '#fff',
    fontSize: '0.56rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  actions: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    zIndex: 2,
    display: 'flex',
    gap: 6,
  },
  actionBtn: {
    width: 36,
    height: 36,
    border: '1px solid rgba(26,26,26,0.25)',
    background: 'rgba(255,255,255,0.88)',
    color: '#1a1a1a',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  actionBtnFilled: {
    background: '#1a1a1a',
    color: '#fff',
    borderColor: '#1a1a1a',
  },
  info: {
    padding: '14px 16px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    flex: 1,
  },
  category: {
    fontSize: '0.56rem',
    fontWeight: 600,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: 2,
  },
  name: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.1rem',
    fontWeight: 400,
    color: '#1a1a1a',
    lineHeight: 1.2,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 10,
  },
  price: {
    fontSize: '0.88rem',
    fontWeight: 600,
    color: '#1a1a1a',
    display: 'block',
  },
  origPrice: {
    fontSize: '0.72rem',
    color: '#bbb',
    textDecoration: 'line-through',
    display: 'block',
    marginTop: 1,
  },
  addBtn: {
    width: 32,
    height: 32,
    border: '1px solid #e2e0db',
    color: '#888',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    lineHeight: 1,
  },
}
