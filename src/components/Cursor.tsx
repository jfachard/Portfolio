import { useEffect, useRef, useState } from 'react';
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

  const onAccentRef = useRef(false);
  const overInteractiveRef = useRef(false);
  const rafHit = useRef(0);
  const lastClient = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy follow — less "laggy trail" feel
  const springConfig = { damping: 28, stiffness: 900, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsPointerDevice(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!isPointerDevice) return;

    const runHitTest = () => {
      rafHit.current = 0;
      const { x, y } = lastClient.current;
      const el = document.elementFromPoint(x, y);

      const accent = !!el?.closest('#contact');
      if (accent !== onAccentRef.current) {
        onAccentRef.current = accent;
        setOnAccent(accent);
      }

      const hit = el?.closest(INTERACTIVE) as HTMLElement | null;
      const disabled =
        !!hit &&
        (hit.hasAttribute('disabled') ||
          hit.getAttribute('aria-disabled') === 'true' ||
          !!hit.closest('[aria-disabled="true"]'));
      const interactive = !!hit && !disabled;
      if (interactive !== overInteractiveRef.current) {
        overInteractiveRef.current = interactive;
        setOverInteractive(interactive);
      }
    };

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      lastClient.current = { x: e.clientX, y: e.clientY };

      // Hit-test at most once per frame
      if (!rafHit.current) {
        rafHit.current = requestAnimationFrame(runHitTest);
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafHit.current) cancelAnimationFrame(rafHit.current);
    };
  }, [mouseX, mouseY, isPointerDevice]);

  if (!isPointerDevice) return null;

  const effective: CursorVariant = overInteractive ? 'pointer' : variant;
  const color = onAccent ? 'var(--bg-color)' : 'var(--accent)';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-100 will-change-transform"
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
      transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
    />
  );
};
