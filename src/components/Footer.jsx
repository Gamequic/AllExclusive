import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={styles.footer} id="contacto">
      <div style={styles.topLine} />
      <div className="footer-inner" style={styles.inner}>
        <div style={styles.brand}>
          <div style={styles.logo}>
            <span style={{ color: '#fff' }}>ALL</span>
            <span style={{ color: '#555' }}>EXCLUSIVE</span>
          </div>
          <p style={styles.tagline}>
            Moda de lujo desde México para el mundo.<br />
            Porque mereces lo exclusivo.
          </p>
          <div style={styles.social}>
            {[
              { id: 'fb', href: 'https://www.facebook.com/RopaExclusivaMexicoLLC', Icon: FbIcon },
              { id: 'ig', href: '#', Icon: IgIcon },
              { id: 'tk', href: '#', Icon: TkIcon },
            ].map(({ id, href, Icon }) => (
              <motion.a
                key={id}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={styles.socialLink}
                whileHover={{ borderColor: '#fff', color: '#fff', y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {[
          {
            title: 'Tienda',
            links: [
              { label: 'Colección', href: '#catalogo' },
              { label: 'Catálogo', href: '#catalogo' },
              { label: 'Camisetas', href: '#catalogo' },
              { label: 'Polos', href: '#catalogo' },
              { label: 'Camisas', href: '#catalogo' },
            ]
          },
          {
            title: 'Información',
            links: [
              { label: 'Nosotros', href: '#nosotros' },
              { label: 'Política de Envío', href: '#' },
              { label: 'Devoluciones', href: '#' },
              { label: 'Preguntas Frecuentes', href: '#' },
            ]
          },
          {
            title: 'Síguenos',
            links: [
              { label: 'Facebook', href: 'https://www.facebook.com/RopaExclusivaMexicoLLC', external: true },
              { label: 'Instagram', href: '#' },
              { label: 'TikTok', href: '#' },
            ]
          }
        ].map(col => (
          <div key={col.title} style={styles.col}>
            <h4 style={styles.colTitle}>{col.title}</h4>
            <ul style={styles.colLinks}>
              {col.links.map(link => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    style={styles.link}
                    whileHover={{ color: '#fff', x: 3 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={styles.bottom}>
        <div style={styles.bottomLine} />
        <div style={styles.bottomRow}>
          <p style={styles.copy}>© 2024 All Exclusive México. Todos los derechos reservados.</p>
          <p style={styles.credit}>
            Hecho con ♥ por{' '}
            <motion.a
              href="https://calleros.me"
              target="_blank"
              rel="noreferrer"
              style={styles.creditLink}
              whileHover={{ color: '#fff' }}
            >
              calleros.me
            </motion.a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FbIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
}
function IgIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
}
function TkIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.77-.22 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.19 8.19 0 004.79 1.53V6.82a4.85 4.85 0 01-1.02-.13z"/></svg>
}

const styles = {
  footer: {
    background: '#111',
    paddingTop: 72,
  },
  topLine: {
    height: 1,
    background: '#1e1e1e',
    marginBottom: 56,
  },
  inner: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: 56,
    maxWidth: 1300,
    margin: '0 auto',
    padding: '0 5% 56px',
  },
  brand: { display: 'flex', flexDirection: 'column', gap: 16 },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.2rem',
    fontWeight: 300,
    letterSpacing: '0.4em',
    display: 'flex',
    gap: 4,
  },
  tagline: {
    fontSize: '0.78rem',
    color: '#555',
    lineHeight: 1.75,
  },
  social: { display: 'flex', gap: 10 },
  socialLink: {
    width: 34, height: 34,
    border: '1px solid #2a2a2a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#555',
    cursor: 'pointer',
  },
  col: {},
  colTitle: {
    fontSize: '0.58rem',
    fontWeight: 700,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: 18,
  },
  colLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    listStyle: 'none',
  },
  link: {
    fontSize: '0.78rem',
    color: '#444',
    display: 'inline-block',
    cursor: 'pointer',
  },
  bottom: {
    maxWidth: 1300,
    margin: '0 auto',
    padding: '0 5% 36px',
  },
  bottomLine: { height: 1, background: '#1a1a1a', marginBottom: 22 },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  copy: { fontSize: '0.7rem', color: '#333' },
  credit: { fontSize: '0.7rem', color: '#333' },
  creditLink: { color: '#555', cursor: 'pointer' },
}
