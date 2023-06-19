import axios from 'axios';
import { SetterOrUpdater } from 'recoil';

export const registerWorker = async (setNotificationPermission?: SetterOrUpdater<boolean>) => {
  // (B1) 공유키
  const publicKey = 'YOUR-PUBLIC-KEY';

  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  // (B2) 서비스 워커 등록 및 확인
  const registration = await navigator.serviceWorker.register(swUrl);
  if (setNotificationPermission) setNotificationPermission(true);

  alert(registration.active);
  if (registration && registration.active) {
    // (B3)서버에 구독하기
    const subscription = await registration.pushManager.subscribe({
      applicationServerKey: process.env.REACT_APP_PUBLIC_SUBSCRIBE_KEY,
      userVisibleOnly: true,
    });
    console.log(JSON.stringify(subscription));

    await axios
      .post('https://with-picme-test-api.site/alarm/register', JSON.stringify(subscription))
      .then((res) => res.data)
      .then((txt) => console.log(txt))
      .catch((err) => console.error(err));
  }
};
