import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from './ProductCard'
import QuickView from './QuickView'

export default function Catalog({ onAddToCart }) {
  const [filter, setFilter] = useState('all')
  const [visible, setVisible] = useState(8)
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter)
  const shown = filtered.slice(0, visible)

  return (
    <section id="catalogo" style={styles.section}>
      {/* Header */}
      <motion.div
        style={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        <p style={styles.eyebrow}>Nuevos Ingresos</p>
        <h2 style={styles.title}>Lo Más Nuevo</h2>
        <div style={styles.titleUnderline} />
      </motion.div>

      {/* Filters */}
      <motion.div
        style={styles.filters}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.15 }}
      >
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat.id}
            style={{
              ...styles.filterBtn,
              ...(filter === cat.id ? styles.filterActive : {}),
            }}
            onClick={() => { setFilter(cat.id); setVisible(8) }}
            whileHover={{ borderColor: '#1a1a1a', color: '#1a1a1a' }}
            whileTap={{ scale: 0.97 }}
          >
            {cat.label}
            {filter === cat.id && (
              <motion.div style={styles.filterDot} layoutId="filterDot" />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div className="products-grid" layout>
        <AnimatePresence mode="popLayout">
          {shown.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={setQuickViewProduct}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load more */}
      {filtered.length > visible && (
        <motion.div style={styles.loadMoreWrap} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.button
            style={styles.loadMore}
            onClick={() => setVisible(v => v + 4)}
            whileHover={{ background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' }}
            whileTap={{ scale: 0.97 }}
          >
            Cargar más ({filtered.length - visible} restantes)
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {quickViewProduct && (
          <QuickView
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={onAddToCart}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

const styles = {
  section: {
    padding: '80px 5% 100px',
    background: '#f4f3f0',
  },
  header: {
    textAlign: 'center',
    marginBottom: 48,
  },
  eyebrow: {
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: 10,
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    fontWeight: 300,
    letterSpacing: '0.04em',
    color: '#1a1a1a',
    marginBottom: 14,
  },
  titleUnderline: {
    width: 36,
    height: 1,
    background: '#1a1a1a',
    margin: '0 auto',
  },
  filters: {
    display: 'flex',
    gap: 4,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 44,
  },
  filterBtn: {
    position: 'relative',
    padding: '9px 20px',
    border: '1px solid #ddd',
    background: '#fff',
    color: '#888',
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'color 0.2s, border-color 0.2s',
  },
  filterActive: {
    color: '#1a1a1a',
    borderColor: '#1a1a1a',
    background: '#fff',
  },
  filterDot: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    background: '#1a1a1a',
  },
  loadMoreWrap: {
    textAlign: 'center',
    marginTop: 44,
  },
  loadMore: {
    padding: '13px 40px',
    border: '1px solid #c8c5bf',
    background: 'transparent',
    color: '#888',
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
}
