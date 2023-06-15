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
