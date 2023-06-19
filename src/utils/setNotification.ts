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
    console.log(subscription);

    await axios
      .post('https://with-picme-test-api.site/alarm/register', {
        endpoint:
          'https://fcm.googleapis.com/fcm/send/fpXesUpN8GM:APA91bFAMWS7om8l0VsAEPmQQaqS2RThzlvVC3KQYR1yCAKg7eSkrP0bhk2nm2tw0imK-FDTP-bsI-LJiA1RejxF-WNx8ifVT_Xd4tAXdbnSKdHLjitzNflXBrYBzEV7y9fCUjuNPu-G',
        expirationTime: null,
        keys: {
          p256dh: 'BEJG2Q0x-NX5gnPWp_n87QRUarBoqcJtKcIa2yeYHGoPRUYnpQx_qzAM-ONpNHO5t2gwJgDy6AbP2FP2ROYY1pw',
          auth: 'd52vwwW4lKfButCXgT0LQQ',
        },
      })
      .then((res) => res.data)
      .then((txt) => console.log(txt))
      .catch((err) => console.error(err));
  }
};
