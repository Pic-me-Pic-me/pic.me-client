import { useLayoutEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const STATUS_BAR_COLOR = {
  LANDING_PAGE: '#FF6A69',
  AUTH_PAGE: '#1E1F21',
  GENERAL_PAGE: '#FFFFFF',
};

export const STATUS_BAR_COLOR_USAGE = new Map([
  ['/', STATUS_BAR_COLOR.LANDING_PAGE],
  ['/login', STATUS_BAR_COLOR.AUTH_PAGE],
  ['/mypage', STATUS_BAR_COLOR.AUTH_PAGE],
]);

const useStatusBarColor = () => {
  const location = useLocation();

  const statusBarColor = useMemo(
    () => STATUS_BAR_COLOR_USAGE.get(location.pathname) ?? STATUS_BAR_COLOR.GENERAL_PAGE,
    [location],
  );

  useLayoutEffect(() => {
    const metaElement = document.getElementById('status-bar');
    if (!metaElement) return;
    (metaElement as HTMLMetaElement).content = statusBarColor;
    // return () => {
    //   (metaElement as HTMLMetaElement).content = STATUS_BAR_COLOR.GENERAL_PAGE;
    // };
  }, [statusBarColor]);
};

export default useStatusBarColor;
