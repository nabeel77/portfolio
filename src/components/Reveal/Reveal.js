import { motion } from 'framer-motion';

// Fade + rise on scroll into view, matching the prototype reveal.
export const Reveal = ({ children, style, delay = 0 }) => (
  <motion.div
    style={style}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay }}
  >
    {children}
  </motion.div>
);
