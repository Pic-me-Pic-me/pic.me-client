import { useEffect } from 'react';

interface useOnClickOutsideProps {
  ref: React.RefObject<HTMLElement>;
  handler: (event: Event) => void;
}

const useOnClickOutside = ({ ref, handler }: useOnClickOutsideProps) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
