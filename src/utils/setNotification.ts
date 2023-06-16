declare global {
  interface Window {
    safari?: any;
  }
}
export const regisertWorker = async () => {
  // (B1) 공유키
  const publicKey = 'YOUR-PUBLIC-KEY';

  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  // (B2) 서비스 워커 등록 및 확인
  const registration = await navigator.serviceWorker.register(swUrl);
  // .then((registration) => {
  //   console.log('Service worker registration succeeded:', registration);
  // })
  // .catch((err) => {
  //   console.log('Service worker registration failed:', err);
  // });
  console.log(registration);
  if (registration) {
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
  //   }
  // reg.pushManager
  //   .subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: publicKey,
  //   })
  //   .then(
  //     // (B3-1) OK - TEST PUSH NOTIFICATION
  //     (sub) => {
  //       fetch('/mypush', {
  //         method: 'POST',
  //         body: JSON.stringify(sub),
  //         headers: { 'content-type': 'application/json' },
  //       })
  //         .then((res) => res.text())
  //         .then((txt) => console.log(txt))
  //         .catch((err) => console.error(err));
  //     },

  //     // (B3-2) ERROR!
  //     (err) => console.error(err),
  //   );
};
