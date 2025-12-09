import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';

interface CursorProps {
  variant: 'default' | 'text';
  height?: number;
}

export const Cursor = ({ variant, height = 24 }: CursorProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const background = useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.15), transparent 80%)`;

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{ background }}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-100 shadow-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: 'var(--text-secondary)'
        }}
        animate={{
          // Si c'est du texte, on devient une barre fine (2px) de la hauteur du texte
          // Sinon, on reste un cercle (20px)
          width: variant === 'text' ? 2 : 20,
          height: variant === 'text' ? height : 20,
          borderRadius: variant === 'text' ? 0 : 9999,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
};
