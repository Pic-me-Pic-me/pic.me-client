import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

interface UseOnClickOutsideProps {
  ref: RefObject<HTMLElement>;
  handler: (event: Event) => void;
}

const useOnClickOutside = ({ ref, handler }: UseOnClickOutsideProps) => {
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handler(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);

  return handleClickOutside;
};

export default useOnClickOutside;
