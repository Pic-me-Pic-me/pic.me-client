import { SetterOrUpdater } from 'recoil';

import { client } from '../lib/axios';

export const registerWorker = async (setNotificationPermission?: SetterOrUpdater<string>) => {
  // (B1) 공유키
  const publicKey = process.env.REACT_APP_PUBLIC_SUBSCRIBE_KEY;

  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  // (B2) 서비스 워커 등록 및 확인
  const registration = await navigator.serviceWorker.register(swUrl);
  if (setNotificationPermission) {
    setNotificationPermission('install');
    if (registration.active) setNotificationPermission('activate');
  }

  if (registration.active) {
    // (B3)서버에 구독하기
    const subscription = await registration.pushManager.subscribe({
      applicationServerKey: publicKey,
      userVisibleOnly: true,
    });
    console.log(JSON.stringify(subscription));

    await client
      .post('alarm/register', subscription)
      .then((res) => res.data)
      .then((txt) => console.log(txt))
      .catch((err) => console.error(err));
  }
};
