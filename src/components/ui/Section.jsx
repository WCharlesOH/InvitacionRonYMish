import { motion } from 'framer-motion';

/**
 * Section — a semantic <section> that fades/slides its content into view
 * on scroll using Framer Motion. Children can be staggered by wrapping
 * them in <FadeItem>.
 */
export default function Section({
  id,
  className = '',
  children,
  as = 'section',
  ...rest
}) {
  const MotionTag = motion[as] || motion.section;
  return (
    <MotionTag
      id={id}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** A child element with a subtle staggered fade-up. */
export function FadeItem({ children, delay = 0, className = '', ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
