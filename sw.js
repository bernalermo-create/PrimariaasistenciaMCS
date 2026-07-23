// ═══════════════════════════════════════════════════════════════
// sw.js — Service Worker del Portal de Padres
// Colegio Miguel de Cervantes Saavedra I.E.D.
//
// Se encarga de: (1) que la página se pueda "instalar" como app, y
// (2) mostrar las notificaciones push cuando llegan con la pantalla
// apagada o el navegador cerrado.
//
// ⚠️ IMPORTANTE: reemplaza el objeto FIREBASE_CONFIG de abajo por el
// que te da Firebase al registrar tu app web — debe ser EXACTAMENTE
// el mismo que uses en padres.html. Ver GUIA_PORTAL_PADRES.md.
// ═══════════════════════════════════════════════════════════════

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const FIREBASE_CONFIG = {
  apiKey: "PEGA_AQUI_TU_API_KEY",
  authDomain: "PEGA_AQUI_TU_PROYECTO.firebaseapp.com",
  projectId: "PEGA_AQUI_TU_PROYECTO",
  messagingSenderId: "PEGA_AQUI_TU_SENDER_ID",
  appId: "PEGA_AQUI_TU_APP_ID"
};

firebase.initializeApp(FIREBASE_CONFIG);
const messaging = firebase.messaging();

// Notificación mientras el portal NO está abierto en primer plano
messaging.onBackgroundMessage((payload) => {
  const titulo = (payload.notification && payload.notification.title) || 'Aviso de asistencia';
  const opciones = {
    body: (payload.notification && payload.notification.body) || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: 'aviso-asistencia' // agrupa avisos seguidos en vez de amontonarlos
  };
  self.registration.showNotification(titulo, opciones);
});

// Al tocar la notificación, abre (o enfoca) el portal
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window', includeUncontrolled: true}).then((lista) => {
      for (const c of lista) { if ('focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow('./padres.html');
    })
  );
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
