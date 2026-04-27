import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ cartCount, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#catalogo', label: 'Colección' },
    { href: '#catalogo', label: 'Catálogo' },
    { href: '#nosotros', label: 'Nosotros' },
  ]

  return (
    <>
      {/* Announcement bar */}
      <div style={styles.announcement}>
        <div style={styles.announcementInner}>
          {['Envío gratis en pedidos +$999 MXN', '·', 'Nueva Colección 2024', '·', 'Envío gratis en pedidos +$999 MXN', '·', 'Nueva Colección 2024', '·'].map((t, i) => (
            <span key={i} style={styles.announcementItem}>{t}</span>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <nav style={styles.nav}>
        <motion.a href="#inicio" style={styles.logo} whileHover={{ opacity: 0.6 }}>
          <span style={styles.logoAll}>ALL</span>
          <span style={styles.logoExclusive}>EXCLUSIVE</span>
        </motion.a>

        <ul className="nav-links-desktop" style={styles.navLinks}>
          {links.map(({ href, label }) => (
            <li key={label}>
              <motion.a href={href} style={styles.navLink} whileHover={{ color: '#000', opacity: 1 }}>
                {label}
              </motion.a>
            </li>
          ))}
        </ul>

        <div style={styles.actions}>
          <motion.button
            style={styles.cartBtn}
            onClick={onCartOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CartIcon />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key="badge"
                  style={styles.cartBadge}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            className="hamburger-btn"
            style={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            whileTap={{ scale: 0.9 }}
          >
            <HamburgerIcon open={menuOpen} />
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              style={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              style={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
            >
              <ul style={styles.mobileLinks}>
                {links.map(({ href, label }, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                  >
                    <a href={href} style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}

function HamburgerIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  )
}

const styles = {
  announcement: {
    background: '#1a1a1a',
    overflow: 'hidden',
    height: 34,
    display: 'flex',
    alignItems: 'center',
  },
  announcementInner: {
    display: 'flex',
    gap: 32,
    whiteSpace: 'nowrap',
    animation: 'marqueeScroll 22s linear infinite',
  },
  announcementItem: {
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#ccc',
    flexShrink: 0,
  },
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: '#fff',
    borderBottom: '1px solid #e2e0db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 5%',
    height: 62,
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.3rem',
    fontWeight: 300,
    letterSpacing: '0.3em',
    display: 'flex',
    gap: 3,
    cursor: 'pointer',
  },
  logoAll: { color: '#000' },
  logoExclusive: { color: '#888' },
  navLinks: {
    display: 'flex',
    gap: 40,
    listStyle: 'none',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  navLink: {
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#888',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  cartBtn: {
    position: 'relative',
    color: '#1a1a1a',
    padding: 6,
    display: 'flex',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: '#1a1a1a',
    color: '#fff',
    fontSize: '0.58rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburger: {
    color: '#1a1a1a',
    display: 'none',
    padding: 4,
  },
  mobileOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 998,
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '75%',
    maxWidth: 300,
    height: '100vh',
    background: '#fff',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeft: '1px solid #e2e0db',
  },
  mobileLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    listStyle: 'none',
    textAlign: 'center',
  },
  mobileLink: {
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
}
