import { useEffect } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { getCurrentWindow } from "@tauri-apps/api/window";

const SENSITIVITY = 0.55;

const springConfig = {
  stiffness: 420,
  damping: 32,
  mass: 0.6,
};

export function useWindowDragOffset() {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, springConfig);
  const y = useSpring(targetY, springConfig);

  useEffect(() => {
    const appWindow = getCurrentWindow();
    let lastX: number | null = null;
    let lastY: number | null = null;
    let offsetX = 0;
    let offsetY = 0;
    let unlisten: (() => void) | undefined;

    appWindow
      .onMoved(({ payload }) => {
        if (lastX === null || lastY === null) {
          lastX = payload.x;
          lastY = payload.y;
          return;
        }

        const dx = payload.x - lastX;
        const dy = payload.y - lastY;
        lastX = payload.x;
        lastY = payload.y;

        if (dx === 0 && dy === 0) return;

        offsetX += -dx * SENSITIVITY;
        offsetY += -dy * SENSITIVITY;
        targetX.set(offsetX);
        targetY.set(offsetY);
      })
      .then((fn) => {
        unlisten = fn;
      })
      .catch(() => {});

    return () => {
      unlisten?.();
    };
  }, [targetX, targetY]);

  return { x, y };
}
