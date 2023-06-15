export const regisertWorker = async () => {
  // (B1) YOUR PUBLIC KEY - CHANGE TO YOUR OWN!
  const publicKey = 'YOUR-PUBLIC-KEY';

  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  // (B2) REGISTER SERVICE WORKER
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service worker registration succeeded:', registration);
    })
    .catch((err) => {
      console.log('Service worker registration failed:', err);
    });
  // (B3) SUBSCRIBE TO PUSH SERVER
  navigator.serviceWorker.ready.then((reg) => {
    console.log(reg);
    console.log(window);
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
    // },

    // (B3-2) ERROR!
    // (err) => console.error(err),
    //   );
  });
};
