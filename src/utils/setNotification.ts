import { SetterOrUpdater } from 'recoil';

export const regisertWorker = async (setNotificationPermission?: SetterOrUpdater<boolean>) => {
  // (B1) 공유키
  const publicKey = 'YOUR-PUBLIC-KEY';

  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  // (B2) 서비스 워커 등록 및 확인
  const registration = await navigator.serviceWorker.register(swUrl);
  if (setNotificationPermission && registration.active) setNotificationPermission(true);

  alert(registration.active);
  if (registration && registration.active) {
    // (B3)서버에 구독하기
    const subscription = await registration.pushManager.subscribe({
      applicationServerKey: publicKey,
      userVisibleOnly: true,
    });

    await fetch('/save-subscription', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    })
      .then((res) => res.text())
      .then((txt) => console.log(txt))
      .catch((err) => console.error(err));
  }
};
