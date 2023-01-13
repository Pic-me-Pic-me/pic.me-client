export const modifySliderRange = (nextRange: number, minRange: number, maxRange: number) => {
  if (nextRange < minRange) return minRange;
  if (nextRange > maxRange) return maxRange;
  return nextRange;
};
export const picmeSliderEvent = ({
  onDragChange,
  onDragEnd,
  stopPropagation,
}: {
  onDragChange?: (deltaX: number, deltaY: number) => void;
  onDragEnd?: (deltaX: number, deltaY: number) => void;
  stopPropagation?: boolean;
}) => {
  return {
    onTouchStart: (touchEvent: React.TouchEvent<HTMLUListElement>) => {
      if (stopPropagation) touchEvent.stopPropagation();

      const touchMoveHandler = (moveEvent: TouchEvent) => {
        const deltaX = moveEvent.touches[0].pageX - touchEvent.touches[0].pageX;
        const deltaY = moveEvent.touches[0].pageY - touchEvent.touches[0].pageY;
        onDragChange?.(deltaX, deltaY);
      };

      const touchEndHandler = (moveEvent: TouchEvent) => {
        const deltaX = moveEvent.changedTouches[0].pageX - touchEvent.changedTouches[0].pageX;
        const deltaY = moveEvent.changedTouches[0].pageY - touchEvent.changedTouches[0].pageY;
        onDragEnd?.(deltaX, deltaY);
        document.removeEventListener('touchmove', touchMoveHandler);
      };

      document.addEventListener('touchmove', touchMoveHandler, { passive: false });
      document.addEventListener('touchend', touchEndHandler, { once: true });
    },
  };
};
