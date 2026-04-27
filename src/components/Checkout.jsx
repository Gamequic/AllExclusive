import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Checkout({ cart, total, isOpen, onClose, onComplete }) {
  const [step, setStep] = useState(1)
  const [cardNum, setCardNum] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [payMethod, setPayMethod] = useState('card')

  function handleClose() {
    onClose()
    setTimeout(() => setStep(1), 500)
  }

  function formatCard(v) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }
  function formatExpiry(v) {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length >= 2 ? d.slice(0, 2) + '/' + d.slice(2) : d
  }

  function placeOrder() {
    setStep('success')
    onComplete()
  }

  const steps = [
    { n: 1, label: 'Datos' },
    { n: 2, label: 'Envío' },
    { n: 3, label: 'Pago' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            style={styles.modal}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              style={styles.closeBtn}
              onClick={handleClose}
              whileHover={{ background: '#fff', color: '#000' }}
            >✕</motion.button>

            {step !== 'success' && (
              <div style={styles.stepNav}>
                {steps.map(({ n, label }, i) => (
                  <div key={n} style={styles.stepItem}>
                    <div style={{
                      ...styles.stepCircle,
                      background: step >= n ? '#1a1a1a' : 'transparent',
                      borderColor: step >= n ? '#1a1a1a' : '#e2e0db',
                      color: step >= n ? '#fff' : '#bbb',
                    }}>
                      {step > n ? '✓' : n}
                    </div>
                    <span style={{ ...styles.stepLabel, color: step >= n ? '#1a1a1a' : '#bbb' }}>{label}</span>
                    {i < steps.length - 1 && (
                      <div style={{ ...styles.stepLine, background: step > n ? '#1a1a1a' : '#e2e0db' }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && <StepPersonal key="s1" onNext={() => setStep(2)} />}
              {step === 2 && <StepShipping key="s2" onBack={() => setStep(1)} onNext={() => setStep(3)} />}
              {step === 3 && (
                <StepPayment
                  key="s3"
                  onBack={() => setStep(2)}
                  cart={cart}
                  total={total}
                  cardNum={cardNum}
                  setCardNum={v => setCardNum(formatCard(v))}
                  cardHolder={cardHolder}
                  setCardHolder={setCardHolder}
                  cardExpiry={cardExpiry}
                  setCardExpiry={v => setCardExpiry(formatExpiry(v))}
                  payMethod={payMethod}
                  setPayMethod={setPayMethod}
                  onPlace={placeOrder}
                />
              )}
              {step === 'success' && <StepSuccess key="success" onClose={handleClose} />}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const formVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
}

function StepPersonal({ onNext }) {
  return (
    <motion.div variants={formVariants} initial="initial" animate="animate" exit="exit">
      <h3 style={styles.stepTitle}>Datos Personales</h3>
      <div style={styles.form}>
        <div style={styles.row}>
          <Field label="Nombre" placeholder="Juan" />
          <Field label="Apellido" placeholder="García" />
        </div>
        <Field label="Correo Electrónico" placeholder="juan@correo.com" type="email" />
        <Field label="Teléfono" placeholder="+52 55 1234 5678" type="tel" />
        <NavBtn label="Continuar →" onClick={onNext} />
      </div>
    </motion.div>
  )
}

function StepShipping({ onBack, onNext }) {
  const [shipping, setShipping] = useState('standard')
  return (
    <motion.div variants={formVariants} initial="initial" animate="animate" exit="exit">
      <h3 style={styles.stepTitle}>Dirección de Envío</h3>
      <div style={styles.form}>
        <Field label="Calle y Número" placeholder="Av. Insurgentes 123" />
        <div style={styles.row}>
          <Field label="Ciudad" placeholder="CDMX" />
          <Field label="Estado" placeholder="Ciudad de México" />
        </div>
        <div style={styles.row}>
          <Field label="C.P." placeholder="06600" />
          <Field label="País" placeholder="México" defaultValue="México" />
        </div>
        <div style={styles.shippingOpts}>
          {[
            { id: 'standard', label: 'Estándar (5-7 días)', price: '$120 MXN' },
            { id: 'express', label: 'Express (2-3 días)', price: '$250 MXN' },
          ].map(opt => (
            <label key={opt.id} style={{ ...styles.shippingOpt, borderColor: shipping === opt.id ? '#fff' : '#222' }}>
              <input type="radio" name="shipping" checked={shipping === opt.id} onChange={() => setShipping(opt.id)} style={{ accentColor: '#fff' }} />
              <span>{opt.label}</span>
              <span style={{ marginLeft: 'auto', color: '#888', fontSize: '0.82rem' }}>{opt.price}</span>
            </label>
          ))}
        </div>
        <div style={styles.btnRow}>
          <NavBtn label="← Atrás" onClick={onBack} ghost />
          <NavBtn label="Continuar →" onClick={onNext} />
        </div>
      </div>
    </motion.div>
  )
}

function StepPayment({ onBack, cart, total, cardNum, setCardNum, cardHolder, setCardHolder, cardExpiry, setCardExpiry, payMethod, setPayMethod, onPlace }) {
  return (
    <motion.div variants={formVariants} initial="initial" animate="animate" exit="exit">
      <h3 style={styles.stepTitle}>Pago</h3>
      <div style={styles.demoBadge}>
        ⚠ MODO DEMO — Ningún pago es procesado
      </div>
      <div style={styles.payMethods}>
        {[
          { id: 'card', label: 'Tarjeta' },
          { id: 'oxxo', label: 'OXXO' },
          { id: 'transfer', label: 'Transferencia' },
        ].map(m => (
          <motion.button
            key={m.id}
            style={{ ...styles.payMethod, borderColor: payMethod === m.id ? '#fff' : '#222', color: payMethod === m.id ? '#fff' : '#444' }}
            onClick={() => setPayMethod(m.id)}
            whileTap={{ scale: 0.97 }}
          >
            {m.label}
          </motion.button>
        ))}
      </div>

      {payMethod === 'card' && (
        <div>
          {/* Card visual */}
          <div style={styles.cardVisual}>
            <div style={styles.chip} />
            <div style={styles.cardNumDisplay}>{cardNum || '•••• •••• •••• ••••'}</div>
            <div style={styles.cardBottom}>
              <div>
                <div style={styles.cardLabel}>Titular</div>
                <div style={styles.cardValue}>{cardHolder || 'NOMBRE APELLIDO'}</div>
              </div>
              <div>
                <div style={styles.cardLabel}>Expira</div>
                <div style={styles.cardValue}>{cardExpiry || 'MM/AA'}</div>
              </div>
            </div>
          </div>
          <div style={styles.form}>
            <Field label="Número" placeholder="1234 5678 9012 3456" value={cardNum} onChange={e => setCardNum(e.target.value)} maxLength={19} />
            <Field label="Nombre en tarjeta" placeholder="JUAN GARCIA" value={cardHolder} onChange={e => setCardHolder(e.target.value.toUpperCase())} />
            <div style={styles.row}>
              <Field label="Expiración" placeholder="MM/AA" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} maxLength={5} />
              <Field label="CVV" placeholder="123" maxLength={3} />
            </div>
          </div>
        </div>
      )}

      {payMethod === 'oxxo' && (
        <div style={styles.altPay}>
          <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.7 }}>
            Recibirás una referencia de pago por correo para pagar en cualquier tienda OXXO de México.
            El pago se confirma en 24-48 horas hábiles.
          </p>
        </div>
      )}

      {payMethod === 'transfer' && (
        <div style={styles.altPay}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['Banco', 'BBVA México'], ['CLABE', '012 345 678 901 234 5'], ['Beneficiario', 'All Exclusive México']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: '#888' }}>{k}</span>
                <span style={{ color: '#1a1a1a' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order summary */}
      <div style={styles.summary}>
        {cart.map(i => (
          <div key={i.id} style={styles.summaryRow}>
            <span style={{ color: '#888' }}>{i.name} ×{i.qty}</span>
            <span style={{ color: '#1a1a1a' }}>${(i.price * i.qty).toLocaleString()}</span>
          </div>
        ))}
        <div style={{ ...styles.summaryRow, borderTop: '1px solid #e2e0db', paddingTop: 10, marginTop: 4 }}>
          <span style={{ color: '#1a1a1a', fontWeight: 600 }}>Total</span>
          <span style={{ color: '#1a1a1a', fontWeight: 600 }}>${total.toLocaleString()} MXN</span>
        </div>
      </div>

      <div style={styles.btnRow}>
        <NavBtn label="← Atrás" onClick={onBack} ghost />
        <NavBtn label="Confirmar Pedido (Demo)" onClick={onPlace} />
      </div>
    </motion.div>
  )
}

function StepSuccess({ onClose }) {
  const orderNum = Math.floor(Math.random() * 90000) + 10000
  return (
    <motion.div
      style={styles.success}
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        style={styles.successCircle}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </motion.div>
      <h3 style={{ ...styles.stepTitle, textAlign: 'center' }}>¡Pedido Confirmado!</h3>
      <p style={{ color: '#666', textAlign: 'center', lineHeight: 1.7, fontSize: '0.85rem' }}>
        Gracias por tu compra en All Exclusive.<br/>
        Recibirás un correo con los detalles.
      </p>
      <div style={styles.orderNum}>Pedido #AE-{orderNum}</div>
      <NavBtn label="Continuar Comprando" onClick={onClose} />
    </motion.div>
  )
}

function Field({ label, placeholder, type = 'text', value, onChange, maxLength, defaultValue }) {
  return (
    <div style={styles.field}>
      {label && <label style={styles.fieldLabel}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        style={styles.input}
      />
    </div>
  )
}

function NavBtn({ label, onClick, ghost }) {
  return (
    <motion.button
      style={ghost ? styles.ghostBtn : styles.primaryBtn}
      onClick={onClick}
      whileHover={{ opacity: 0.85 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  )
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1300,
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
    maxWidth: 560,
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '40px',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16, right: 16,
    width: 32, height: 32,
    border: '1px solid #e2e0db',
    background: '#fff',
    color: '#999',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  stepNav: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 36,
    gap: 0,
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  stepCircle: {
    width: 28, height: 28,
    borderRadius: '50%',
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.72rem',
    fontWeight: 600,
    flexShrink: 0,
  },
  stepLabel: {
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  stepLine: {
    flex: 1,
    height: 1,
    margin: '0 8px',
  },
  stepTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem',
    fontWeight: 400,
    color: '#1a1a1a',
    marginBottom: 24,
  },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  fieldLabel: {
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#888',
  },
  input: {
    background: '#faf9f7',
    border: '1px solid #e2e0db',
    color: '#1a1a1a',
    padding: '12px 14px',
    fontSize: '0.88rem',
    outline: 'none',
    width: '100%',
  },
  shippingOpts: { display: 'flex', flexDirection: 'column', gap: 8 },
  shippingOpt: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 14px',
    border: '1px solid',
    cursor: 'pointer',
    fontSize: '0.82rem',
    color: '#666',
  },
  btnRow: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10, marginTop: 20 },
  primaryBtn: {
    padding: '14px',
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    width: '100%',
  },
  ghostBtn: {
    padding: '14px',
    background: 'transparent',
    color: '#888',
    border: '1px solid #e2e0db',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    width: '100%',
  },
  demoBadge: {
    padding: '10px 14px',
    background: '#faf9f7',
    border: '1px solid #e2e0db',
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    color: '#888',
    marginBottom: 20,
  },
  payMethods: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 8,
    marginBottom: 20,
  },
  payMethod: {
    padding: '12px',
    border: '1px solid',
    background: 'transparent',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  cardVisual: {
    background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
    border: '1px solid #333',
    padding: 24,
    marginBottom: 20,
    minHeight: 160,
    position: 'relative',
  },
  chip: {
    width: 38, height: 28,
    background: 'linear-gradient(135deg, #c8a96e, #e8cc8c)',
    borderRadius: 3,
    marginBottom: 20,
  },
  cardNumDisplay: {
    fontFamily: 'monospace',
    fontSize: '1.1rem',
    letterSpacing: '3px',
    color: '#fff',
    marginBottom: 20,
  },
  cardBottom: { display: 'flex', gap: 40 },
  cardLabel: { fontSize: '0.55rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 },
  cardValue: { fontSize: '0.8rem', color: '#fff', letterSpacing: '0.05em' },
  altPay: {
    background: '#faf9f7',
    border: '1px solid #e2e0db',
    padding: '20px',
    marginBottom: 16,
  },
  summary: {
    background: '#faf9f7',
    border: '1px solid #e2e0db',
    padding: '16px',
    margin: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
  },
  success: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    padding: '20px 0',
  },
  successCircle: {
    width: 80, height: 80,
    borderRadius: '50%',
    border: '1px solid #1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderNum: {
    padding: '10px 24px',
    border: '1px solid #e2e0db',
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    color: '#888',
  },
}
