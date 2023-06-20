/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
// import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';

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
