/// <reference lib="webworker" />
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { skipWaiting, clientsClaim } from 'workbox-core';

declare const self: Window & ServiceWorkerGlobalScope;

export function register() {
    window.addEventListener('load', () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/js/service-worker.js')
        }
    });
}

skipWaiting();
clientsClaim();

console.log("manifest", self.__WB_MANIFEST);

const precacheManifest = self.__WB_MANIFEST || ["/index.html"];
precacheAndRoute(precacheManifest);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
    denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
});
registerRoute(navigationRoute);