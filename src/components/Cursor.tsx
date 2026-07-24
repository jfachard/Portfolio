import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface CursorProps {
  variant: 'default' | 'text';
  height?: number;
}

export const Cursor = ({ variant, height = 24 }: CursorProps) => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [onAccent, setOnAccent] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsPointerDevice(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!isPointerDevice) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      setOnAccent(!!el?.closest('#contact'));
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY, isPointerDevice]);

  if (!isPointerDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-100"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: onAccent ? 'var(--bg-color)' : 'var(--accent)',
      }}
      animate={{
        width: variant === 'text' ? 2 : 18,
        height: variant === 'text' ? height : 18,
        borderRadius: variant === 'text' ? 0 : 9999,
        opacity: variant === 'text' ? 0.95 : 0.85,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  );
};
