import { useState } from 'react'
import { motion } from 'framer-motion'

export default function QuickView({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null)

  return (
    <motion.div
      style={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        style={styles.modal}
        className="qv-grid"
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.button
          style={styles.closeBtn}
          onClick={onClose}
          whileHover={{ background: '#1a1a1a', color: '#fff' }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>

        <div style={styles.grid}>
          {/* Image */}
          <div className="qv-img-area" style={styles.imgArea}>
            {product.image ? (
              <img src={product.image} alt={product.name} style={styles.qvImg} />
            ) : (
              <PlaceholderSVG />
            )}
          </div>

          {/* Info */}
          <div style={styles.info}>
            <p style={styles.cat}>{product.category}</p>
            <h2 style={styles.name}>{product.name}</h2>
            <p style={styles.subtitle}>{product.subtitle}</p>
            <p style={styles.desc}>{product.description}</p>

            <div style={styles.priceRow}>
              <span style={styles.price}>${product.price.toLocaleString()} MXN</span>
              {product.originalPrice && (
                <span style={styles.origPrice}>${product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <div style={styles.sizeSection}>
              <p style={styles.label}>Talla</p>
              <div style={styles.sizes}>
                {product.sizes.map(s => (
                  <motion.button
                    key={s}
                    style={{
                      ...styles.sizeBtn,
                      ...(selectedSize === s ? styles.sizeBtnActive : {}),
                    }}
                    onClick={() => setSelectedSize(s)}
                    whileHover={{ borderColor: '#1a1a1a', color: '#1a1a1a' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              style={styles.addBtn}
              onClick={() => { onAddToCart(product); onClose() }}
              whileHover={{ background: '#333' }}
              whileTap={{ scale: 0.97 }}
            >
              Agregar al Carrito
            </motion.button>

            <p style={styles.shipping}>
              <span style={{ marginRight: 6 }}>✓</span>
              Envío gratis en compras mayores a $999 MXN
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function PlaceholderSVG() {
  return (
    <svg viewBox="0 0 120 220" style={{ width: '45%', maxWidth: 140, opacity: 0.15 }}>
      <ellipse cx="60" cy="26" rx="20" ry="22" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
      <path d="M40 48 Q26 65 24 100 L96 100 Q94 65 80 48 Z" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
      <path d="M24 100 L16 160 L38 160 L50 118 L70 118 L82 160 L104 160 L96 100 Z" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
    </svg>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backdropFilter: 'blur(6px)',
  },
  modal: {
    background: '#fff',
    border: '1px solid #e2e0db',
    width: '100%',
    maxWidth: 820,
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 34,
    height: 34,
    border: '1px solid #e2e0db',
    background: '#fff',
    color: '#888',
    fontSize: '0.78rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  imgArea: {
    minHeight: 420,
    background: '#f0eeeb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #e2e0db',
    overflow: 'hidden',
    position: 'relative',
  },
  qvImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    position: 'absolute',
    inset: 0,
  },
  info: {
    padding: '40px 36px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  cat: {
    fontSize: '0.58rem',
    fontWeight: 600,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: '#999',
  },
  name: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2rem',
    fontWeight: 400,
    color: '#1a1a1a',
    lineHeight: 1.1,
  },
  subtitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1rem',
    fontStyle: 'italic',
    color: '#888',
  },
  desc: {
    fontSize: '0.82rem',
    color: '#666',
    lineHeight: 1.7,
    marginTop: 4,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    marginTop: 4,
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#1a1a1a',
  },
  origPrice: {
    fontSize: '0.85rem',
    color: '#bbb',
    textDecoration: 'line-through',
  },
  sizeSection: { marginTop: 8 },
  label: {
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: 10,
  },
  sizes: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeBtn: {
    padding: '7px 14px',
    border: '1px solid #e2e0db',
    background: 'transparent',
    color: '#888',
    fontSize: '0.72rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  sizeBtnActive: {
    borderColor: '#1a1a1a',
    color: '#fff',
    background: '#1a1a1a',
  },
  addBtn: {
    marginTop: 8,
    padding: '15px',
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  shipping: {
    fontSize: '0.72rem',
    color: '#999',
    marginTop: 4,
  },
}
