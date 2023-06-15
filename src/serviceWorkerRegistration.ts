const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  //서비스 워커가 존재하면 실행
  // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    // 보안상의 이유로 navigator 설정
    console.log(publicUrl.origin, window.location.origin, '등록');
    if (publicUrl.origin !== window.location.origin) {
      return;
    }
    // 윈도우 로드 되었을떄, 알림 설정 확인 및 token 부여
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      console.log(swUrl);
      // 알림 권한 받기 전
      if (Notification.permission === 'default') {
        // 요청하기
        Notification.requestPermission().then((perm) => {
          if (Notification.permission === 'granted') {
            regWorker().catch((err) => console.error(err));
          } else {
            alert('Please allow notifications.');
          }
        });
      }
      // 승인 - GRANTED
      else if (Notification.permission === 'granted') {
        regWorker().catch((err) => console.error(err));
      }
      // 거부 - DENIED
      else {
        alert('알림 권한을 허용해주세요!');
      }
      // if (isLocalhost) {
      //   // This is running on localhost. Let's check if a service worker still exists or not.
      //   checkValidServiceWorker(swUrl, config);
      //   navigator.serviceWorker.ready.then(() => {
      //     console.log('This web app is being served cache-first by a service ');
      //   });
      // } else {
      //   registerValidSW(swUrl, config);
      // }
    });
  }
}
async function regWorker() {
  // (B1) YOUR PUBLIC KEY - CHANGE TO YOUR OWN!
  const publicKey = 'YOUR-PUBLIC-KEY';

  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  // (B2) REGISTER SERVICE WORKER
  navigator.serviceWorker
    .register(swUrl, { scope: '/' })
    .then((registration) => {
      console.log('Service worker registration succeeded:', registration);
    })
    .catch((err) => {
      console.log('Service worker registration failed:', err);
    });
  // (B3) SUBSCRIBE TO PUSH SERVER
  navigator.serviceWorker.ready.then((reg) => {
    reg.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      })
      .then(
        // (B3-1) OK - TEST PUSH NOTIFICATION
        (sub) => {
          fetch('/mypush', {
            method: 'POST',
            body: JSON.stringify(sub),
            headers: { 'content-type': 'application/json' },
          })
            .then((res) => res.text())
            .then((txt) => console.log(txt))
            .catch((err) => console.error(err));
        },

        // (B3-2) ERROR!
        (err) => console.error(err),
      );
  });
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        console.log(registration);
        if (installingWorker == null) {
          return;
        }
        console.log(installingWorker.state);
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://cra.link/PWA.',
              );
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
        console.log(navigator.serviceWorker);
        navigator.serviceWorker.ready
          .then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          })
          .catch((err) => console.log(err));
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
