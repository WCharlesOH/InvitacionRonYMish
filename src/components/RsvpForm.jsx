import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  User,
  Phone,
  Check,
  X,
  Loader2,
  Heart,
  PartyPopper,
} from 'lucide-react';
import Section, { FadeItem } from './ui/Section.jsx';
import Divider from './ui/Divider.jsx';
import Botanical from './ui/Botanical.jsx';
import eventData from '../data/eventData.json';
import { submitRsvp } from '../services/rsvpService.js';

const EMPTY = { nombre_completo: '', asistencia: '', telefono: '' };

export default function RsvpForm() {
  const { rsvp } = eventData;
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  // Remember whether the guest confirmed attendance so the success modal
  // can show the right icon even after the form fields are reset.
  const [submittedAttending, setSubmittedAttending] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const setAsistencia = (value) => {
    setForm((f) => ({ ...f, asistencia: value }));
    setErrors((prev) => ({ ...prev, asistencia: undefined }));
  };

  /** Validate all three required fields. */
  function validate() {
    const next = {};
    if (!form.nombre_completo.trim() || form.nombre_completo.trim().length < 3) {
      next.nombre_completo = 'Por favor ingresa tu nombre completo.';
    }
    if (!form.asistencia) {
      next.asistencia = 'Selecciona una opción.';
    }
    const phoneDigits = form.telefono.replace(/[^\d]/g, '');
    if (!form.telefono.trim()) {
      next.telefono = 'Por favor ingresa tu teléfono.';
    } else if (phoneDigits.length < 7) {
      next.telefono = 'Ingresa un número de teléfono válido.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validate()) return;

    setStatus('loading');
    try {
      const result = await submitRsvp({
        nombre_completo: form.nombre_completo.trim(),
        asistencia: form.asistencia,
        telefono: form.telefono.trim(),
      });
      if (result.ok) {
        setSubmittedAttending(form.asistencia === 'si');
        setStatus('success');
        setForm(EMPTY);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <Section id="rsvp" className="section-pad relative">
      <div className="mx-auto max-w-xl text-center">
        <FadeItem>
          <p className="eyebrow mb-4">{rsvp.eyebrow}</p>
          <h2 className="font-display text-3xl text-ink sm:text-5xl">
            {rsvp.title}
          </h2>
          <Divider className="my-8" icon="leaf" />
          <p className="mx-auto max-w-md font-serif text-lg text-ink/70">
            {rsvp.subtitle}
          </p>
        </FadeItem>

        <FadeItem delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="card-luxe relative mt-10 overflow-hidden px-6 py-9 text-left sm:px-10 sm:py-11"
          >
            <Botanical
              position="bottom-left"
              className="bottom-0 left-0 opacity-15"
              size={150}
            />

            {/* Nombre completo */}
            <div className="relative z-10">
              <label
                htmlFor="nombre_completo"
                className="mb-2 block font-sans text-xs uppercase tracking-wide2 text-gold-deep"
              >
                Nombre completo
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
                  strokeWidth={1.5}
                />
                <input
                  id="nombre_completo"
                  name="nombre_completo"
                  type="text"
                  autoComplete="name"
                  value={form.nombre_completo}
                  onChange={update('nombre_completo')}
                  placeholder="Tu nombre y apellido"
                  aria-invalid={!!errors.nombre_completo}
                  aria-describedby={
                    errors.nombre_completo ? 'err-nombre' : undefined
                  }
                  className="w-full rounded-xl border border-gold/40 bg-white py-3 pl-11 pr-4 font-sans text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>
              {errors.nombre_completo && (
                <p id="err-nombre" className="mt-2 text-xs text-red-600">
                  {errors.nombre_completo}
                </p>
              )}
            </div>

            {/* Asistencia */}
            <fieldset className="relative z-10 mt-6">
              <legend className="mb-2 block font-sans text-xs uppercase tracking-wide2 text-gold-deep">
                ¿Nos acompañarás?
              </legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ToggleOption
                  active={form.asistencia === 'si'}
                  onClick={() => setAsistencia('si')}
                  icon={<Check className="h-4 w-4" strokeWidth={2} />}
                  label="Sí, asistiré"
                />
                <ToggleOption
                  active={form.asistencia === 'no'}
                  onClick={() => setAsistencia('no')}
                  icon={<X className="h-4 w-4" strokeWidth={2} />}
                  label="No podré asistir"
                />
              </div>
              {errors.asistencia && (
                <p className="mt-2 text-xs text-red-600">
                  {errors.asistencia}
                </p>
              )}
            </fieldset>

            {/* Teléfono */}
            <div className="relative z-10 mt-6">
              <label
                htmlFor="telefono"
                className="mb-2 block font-sans text-xs uppercase tracking-wide2 text-gold-deep"
              >
                Teléfono
              </label>
              <div className="relative">
                <Phone
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
                  strokeWidth={1.5}
                />
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.telefono}
                  onChange={update('telefono')}
                  placeholder="+51 999 999 999"
                  aria-invalid={!!errors.telefono}
                  aria-describedby={errors.telefono ? 'err-telefono' : undefined}
                  className="w-full rounded-xl border border-gold/40 bg-white py-3 pl-11 pr-4 font-sans text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>
              {errors.telefono && (
                <p id="err-telefono" className="mt-2 text-xs text-red-600">
                  {errors.telefono}
                </p>
              )}
            </div>

            {status === 'error' && (
              <p
                role="alert"
                className="relative z-10 mt-5 rounded-lg border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                Ocurrió un problema al enviar tu confirmación. Por favor
                inténtalo nuevamente.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-gold relative z-10 mt-8 w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin-slow" strokeWidth={2} />
                  Enviando…
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4" strokeWidth={2} />
                  Confirmar Asistencia
                </>
              )}
            </button>

            <p className="relative z-10 mt-5 text-center font-sans text-xs text-ink-soft">
              {rsvp.deadline}
            </p>
          </form>
        </FadeItem>
      </div>

      {/* Success modal */}
      <AnimatePresence>
        {status === 'success' && (
          <SuccessModal
            attending={submittedAttending}
            title={rsvp.successTitle}
            message={rsvp.successMessage}
            onClose={() => setStatus('idle')}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

/** A single attendance toggle button. */
function ToggleOption({ active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-sans text-sm font-medium transition-all duration-300 ${
        active
          ? 'border-gold bg-gold/15 text-gold-deep shadow-gold'
          : 'border-gold/25 bg-white text-ink/70 hover:border-gold/50 hover:text-ink'
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          active ? 'border-gold bg-gold text-obsidian' : 'border-ink-soft/50'
        }`}
      >
        {active ? icon : null}
      </span>
      {label}
    </button>
  );
}

/** Gold gratitude modal shown on successful submission. */
function SuccessModal({ attending, title, message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-success-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="card-luxe relative z-10 w-full max-w-md overflow-hidden px-7 py-10 text-center"
      >
        <Botanical
          position="top-left"
          className="left-0 top-0 opacity-20"
          size={140}
        />
        <Botanical
          position="bottom-right"
          className="bottom-0 right-0 opacity-20"
          size={140}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 text-ink-soft transition-colors hover:text-gold-deep"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient shadow-gold-glow">
          {attending ? (
            <PartyPopper className="h-7 w-7 text-obsidian" strokeWidth={1.5} />
          ) : (
            <Heart className="h-7 w-7 text-obsidian" strokeWidth={1.5} />
          )}
        </span>

        <h3
          id="rsvp-success-title"
          className="mt-6 font-display text-2xl text-gold-foil sm:text-3xl"
        >
          {title}
        </h3>
        <p className="mx-auto mt-4 max-w-sm font-serif text-lg italic text-ink/80">
          {message}
        </p>

        <button type="button" onClick={onClose} className="btn-outline mt-8">
          Con cariño, cerrar
        </button>
      </motion.div>
    </motion.div>
  );
}
