/// <reference lib="webworker" />

import { SetterOrUpdater } from 'recoil';
import { clientsClaim } from 'workbox-core';
// import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';

import { client } from './lib/axios';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

type PushMessage = {
  title: string;
  body: string;
};

const _version = 'v2';
const cacheName = 'v2';
const cacheList = ['Picme', 'PWA'];

const consoleMessage = (message: string) => {
  console.log(`Service Worker ${_version} : ${message}`);
};

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', () => {
  self.skipWaiting();
  caches.open(cacheName).then((cache) => {
    consoleMessage('Caching APP');
    return cache.addAll(cacheList);
  });
  consoleMessage('INSTALL');
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            consoleMessage('Removing old cache' + key);
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
  registerWorker();
  consoleMessage('ACTIVE');
});
self.addEventListener('push', (event: PushEvent) => {
  consoleMessage(event + '');

  const message = event.data?.json() as PushMessage;
  event.waitUntil(
    self.registration.showNotification(message.title, {
      body: message.body,
      icon: '/Pic.me_192.png',
    }),
  );
});
const registerWorker = async () => {
  // (B1) 공유키
  const publicKey = process.env.REACT_APP_PUBLIC_SUBSCRIBE_KEY;

  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  // (B2) 서비스 워커 등록 및 확인
  const registration = await navigator.serviceWorker.register(swUrl);

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
