import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export type CursorVariant = 'default' | 'text' | 'pointer';

interface CursorProps {
  variant: CursorVariant;
  height?: number;
}

const INTERACTIVE =
  'a, button, [role="button"], [data-cursor="pointer"], summary, input, textarea, select, label[for]';

export const Cursor = ({ variant, height = 24 }: CursorProps) => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [onAccent, setOnAccent] = useState(false);
  const [overInteractive, setOverInteractive] = useState(false);
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

      const hit = el?.closest(INTERACTIVE) as HTMLElement | null;
      const disabled =
        hit?.hasAttribute('disabled') ||
        hit?.getAttribute('aria-disabled') === 'true' ||
        hit?.closest('[aria-disabled="true"]');
      setOverInteractive(!!hit && !disabled);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY, isPointerDevice]);

  if (!isPointerDevice) return null;

  const effective: CursorVariant = overInteractive ? 'pointer' : variant;
  const color = onAccent ? 'var(--bg-color)' : 'var(--accent)';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-100"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: effective === 'pointer' ? 'transparent' : color,
        border:
          effective === 'pointer'
            ? `1.5px solid ${onAccent ? 'var(--bg-color)' : 'var(--accent)'}`
            : '1.5px solid transparent',
      }}
      animate={{
        width: effective === 'text' ? 2 : effective === 'pointer' ? 44 : 18,
        height: effective === 'text' ? height : effective === 'pointer' ? 44 : 18,
        borderRadius: effective === 'text' ? 0 : 9999,
        opacity: effective === 'pointer' ? 1 : effective === 'text' ? 0.95 : 0.85,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    />
  );
};
