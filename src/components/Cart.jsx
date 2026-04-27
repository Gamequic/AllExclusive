import { motion, AnimatePresence } from 'framer-motion'

export default function Cart({ cart, isOpen, onClose, onChangeQty, onRemove, total, onCheckout }) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        style={styles.sidebar}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
      >
        <div style={styles.header}>
          <div>
            <h3 style={styles.title}>Carrito</h3>
            {cart.length > 0 && (
              <p style={styles.subtitle}>{cart.length} artículo{cart.length > 1 ? 's' : ''}</p>
            )}
          </div>
          <motion.button
            style={styles.closeBtn}
            onClick={onClose}
            whileHover={{ background: '#1a1a1a', color: '#fff' }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>

        <div style={styles.items}>
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div style={styles.empty} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <BagIcon />
                <p style={styles.emptyTitle}>Tu carrito está vacío</p>
                <p style={styles.emptySubtitle}>Agrega productos del catálogo</p>
                <motion.button
                  style={styles.exploreBtn}
                  onClick={onClose}
                  whileHover={{ background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' }}
                >
                  Explorar
                </motion.button>
              </motion.div>
            ) : (
              cart.map(item => (
                <motion.div
                  key={item.id}
                  style={styles.item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, padding: 0 }}
                  transition={{ duration: 0.25 }}
                  layout
                >
                  <div style={styles.itemImg}>
                    {item.image
                      ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <PlaceholderIcon />
                    }
                  </div>
                  <div style={styles.itemInfo}>
                    <p style={styles.itemName}>{item.name}</p>
                    <p style={styles.itemSub}>{item.subtitle}</p>
                    <p style={styles.itemPrice}>${(item.price * item.qty).toLocaleString()} MXN</p>
                    <div style={styles.qtyRow}>
                      <motion.button style={styles.qtyBtn} onClick={() => onChangeQty(item.id, -1)} whileTap={{ scale: 0.85 }}>−</motion.button>
                      <span style={styles.qty}>{item.qty}</span>
                      <motion.button style={styles.qtyBtn} onClick={() => onChangeQty(item.id, 1)} whileTap={{ scale: 0.85 }}>+</motion.button>
                      <motion.button style={styles.removeBtn} onClick={() => onRemove(item.id)} whileHover={{ color: '#c0392b' }}>
                        <TrashIcon />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div
              style={styles.footer}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Subtotal</span>
                <span style={styles.totalAmount}>${total.toLocaleString()} MXN</span>
              </div>
              <p style={styles.taxNote}>Impuestos y envío calculados al finalizar</p>
              <motion.button
                style={styles.checkoutBtn}
                onClick={onCheckout}
                whileHover={{ background: '#333' }}
                whileTap={{ scale: 0.98 }}
              >
                Proceder al Pago
              </motion.button>
              <motion.button
                style={styles.continueBtn}
                onClick={onClose}
                whileHover={{ color: '#1a1a1a' }}
              >
                Continuar comprando
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  )
}

function BagIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}
function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 60 100" style={{ width: '60%', opacity: 0.15 }}>
      <ellipse cx="30" cy="12" rx="10" ry="11" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
      <path d="M20 23 Q14 30 13 48 L47 48 Q46 30 40 23 Z" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
      <path d="M13 48 L10 75 L22 75 L26 58 L34 58 L38 75 L50 75 L47 48 Z" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
    </svg>
  )
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.35)',
    zIndex: 1100,
    backdropFilter: 'blur(2px)',
  },
  sidebar: {
    position: 'fixed',
    top: 0, right: 0,
    width: '100%',
    maxWidth: 400,
    height: '100vh',
    background: '#fff',
    zIndex: 1101,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid #e2e0db',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '22px 26px',
    borderBottom: '1px solid #e2e0db',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.4rem',
    fontWeight: 400,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '0.68rem',
    color: '#999',
    letterSpacing: '0.1em',
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    border: '1px solid #e2e0db',
    background: '#fff',
    color: '#999',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  items: {
    flex: 1,
    overflowY: 'auto',
    padding: '18px 26px',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: '100%',
    minHeight: 300,
    textAlign: 'center',
  },
  emptyTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.25rem',
    color: '#1a1a1a',
  },
  emptySubtitle: { fontSize: '0.78rem', color: '#999' },
  exploreBtn: {
    marginTop: 8,
    padding: '10px 28px',
    border: '1px solid #c8c5bf',
    background: 'transparent',
    color: '#888',
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  item: {
    display: 'flex',
    gap: 14,
    paddingBottom: 18,
    marginBottom: 18,
    borderBottom: '1px solid #e2e0db',
  },
  itemImg: {
    width: 68,
    height: 80,
    background: '#f0eeeb',
    border: '1px solid #e2e0db',
    flexShrink: 0,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: { flex: 1, display: 'flex', flexDirection: 'column', gap: 3 },
  itemName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '0.95rem',
    color: '#1a1a1a',
  },
  itemSub: { fontSize: '0.66rem', color: '#999', fontStyle: 'italic' },
  itemPrice: { fontSize: '0.83rem', fontWeight: 600, color: '#1a1a1a', marginTop: 2 },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    border: '1px solid #e2e0db',
    background: 'transparent',
    color: '#666',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  qty: { fontSize: '0.82rem', color: '#1a1a1a', minWidth: 16, textAlign: 'center' },
  removeBtn: {
    marginLeft: 'auto',
    color: '#bbb',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: 4,
  },
  footer: {
    padding: '18px 26px 28px',
    borderTop: '1px solid #e2e0db',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  totalLabel: { fontSize: '0.68rem', color: '#888', letterSpacing: '0.15em', textTransform: 'uppercase' },
  totalAmount: { fontSize: '1.15rem', fontWeight: 600, color: '#1a1a1a' },
  taxNote: { fontSize: '0.66rem', color: '#bbb' },
  checkoutBtn: {
    padding: '15px',
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    fontSize: '0.66rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  continueBtn: {
    background: 'transparent',
    border: 'none',
    color: '#999',
    fontSize: '0.66rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '4px 0',
  },
}
