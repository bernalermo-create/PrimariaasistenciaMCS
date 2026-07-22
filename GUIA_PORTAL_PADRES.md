# 👨‍👩‍👧 PORTAL DE PADRES — Guía de configuración
## Colegio Miguel de Cervantes Saavedra I.E.D.

Esta guía te lleva paso a paso por la única parte que yo no puedo hacer por ti:
crear tu proyecto gratuito de Firebase (de Google) y conectarlo. Todo lo demás
—el código, el portal, los botones— ya está listo en los archivos que te
entregué.

**Costo: $0.** Firebase tiene un plan gratuito (Spark) que alcanza de sobra
para un colegio, mientras no uses funciones de pago que aquí no necesitamos.

---

## Antes de empezar

Vas a necesitar:
- Una cuenta de Google (puede ser la misma que ya usas para el Google Sheet).
- 15-20 minutos, sin prisa.
- Tener ya publicado tu `control_asistencia.html` en algún sitio (GitHub
  Pages, Netlify, etc.) — vas a subir 4 archivos nuevos **a esa misma
  carpeta**: `padres.html`, `manifest.json`, `sw.js`, `icon-192.png`,
  `icon-512.png`.

---

## PARTE 1 — Crear el proyecto de Firebase

1. Ve a **console.firebase.google.com** y entra con tu cuenta de Google.
2. **Crear un proyecto** → ponle un nombre, por ejemplo `asistencia-mcs`.
3. Puedes desactivar Google Analytics si te pregunta (no lo necesitas).
4. Cuando termine de crearse, vas a quedar en el panel principal del
   proyecto.

## PARTE 2 — Registrar tu "app web" dentro del proyecto

1. En el panel principal, busca el ícono **`</>`** (Web) y dale clic para
   "agregar una app".
2. Ponle un apodo, por ejemplo `Portal de Padres`. **No** marques la casilla
   de Firebase Hosting (ya tienes tu propio sitio).
3. Firebase te va a mostrar un bloque de código con algo así:
   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "asistencia-mcs.firebaseapp.com",
     projectId: "asistencia-mcs",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef..."
   };
   ```
4. **Copia esos 5 valores** — los vas a necesitar en el Paso 5.

## PARTE 3 — Activar Cloud Messaging y generar la llave VAPID

1. En el menú de la izquierda: **⚙️ Configuración del proyecto** → pestaña
   **Cloud Messaging**.
2. Baja hasta **"Configuración web"** → **"Certificados push web"**.
3. Dale a **"Generar par de claves"**. Te va a aparecer una llave larga que
   empieza distinto cada vez (la "clave pública VAPID"). **Cópiala.**

## PARTE 4 — Generar la llave de la cuenta de servicio (para que Apps Script pueda enviar)

1. En la misma pantalla de Configuración del proyecto → pestaña **Cuentas de
   servicio**.
2. Dale a **"Generar nueva clave privada"** → confirma. Se descarga un
   archivo `.json` a tu computador — **guárdalo bien, no lo compartas, no lo
   subas a ningún sitio público.**
3. Ábrelo con el Bloc de notas. Vas a ver algo como:
   ```json
   {
     "type": "service_account",
     "project_id": "asistencia-mcs",
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxxxx@asistencia-mcs.iam.gserviceaccount.com",
     ...
   }
   ```
   Solo necesitas 3 valores de aquí: `project_id`, `private_key` (todo el
   texto largo, con los `\n` incluidos, tal cual) y `client_email`.

## PARTE 5 — Guardar las llaves sensibles en Apps Script (nunca en el HTML)

1. Abre tu proyecto de Apps Script (el de `Codigo_Asistencia.gs`).
2. **Extensiones del proyecto → Propiedades del proyecto → Propiedades del
   script → Agregar propiedad del script.**
3. Agrega estas 4 propiedades (nombre exacto a la izquierda, valor a la derecha):

   | Nombre de la propiedad | Valor |
   |---|---|
   | `FIREBASE_PROJECT_ID` | el `project_id` del Paso 4 |
   | `FIREBASE_CLIENT_EMAIL` | el `client_email` del Paso 4 |
   | `FIREBASE_PRIVATE_KEY` | el `private_key` completo del Paso 4 (con los `\n`) |
   | `PORTAL_PADRES_URL` | la URL pública de tu `padres.html`, ej: `https://tusitio.github.io/ASISTENCIA-MCS/padres.html` |

4. Guarda. **Estas 4 quedan solo en Apps Script — nunca las pegues en
   `padres.html` ni en `sw.js`.**

## PARTE 6 — Completar los archivos públicos (estos si van en el HTML)

Los 5 valores del Paso 2, y la llave VAPID del Paso 3, **sí son seguros de
que estén visibles en el navegador** (así funciona Firebase por diseño — no
son secretos, son identificadores).

1. Abre `padres.html` con un editor de texto y busca esto cerca del final:
   ```js
   const VAPID_PUBLIC_KEY = "PEGA_AQUI_TU_VAPID_PUBLIC_KEY";
   const FIREBASE_CONFIG = {
     apiKey: "PEGA_AQUI_TU_API_KEY",
     authDomain: "PEGA_AQUI_TU_PROYECTO.firebaseapp.com",
     projectId: "PEGA_AQUI_TU_PROYECTO",
     messagingSenderId: "PEGA_AQUI_TU_SENDER_ID",
     appId: "PEGA_AQUI_TU_APP_ID"
   };
   ```
   Reemplaza cada valor por el tuyo (Paso 2 y Paso 3).

2. Abre `sw.js` y haz exactamente lo mismo con el bloque `FIREBASE_CONFIG`
   que aparece ahí (debe quedar **idéntico** al de `padres.html`).

3. Sube los 5 archivos (`padres.html`, `sw.js` ya editados, más
   `manifest.json`, `icon-192.png`, `icon-512.png` tal cual te los di) a la
   **misma carpeta** donde está `control_asistencia.html`.

## PARTE 7 — Poner todo a andar

1. En Apps Script, pega el `Codigo_Asistencia.gs` nuevo (ya trae todo esto
   integrado) → **Implementar → Nueva versión**.
2. Sube el `control_asistencia.html` nuevo.
3. Entra como admin → **Admin → Configuración** → pega la URL pública de la
   carpeta donde publicaste `padres.html` (sin el nombre del archivo) →
   **Guardar URL del portal**.
4. Mismo panel → botón **🔑 Generar códigos para estudiantes nuevos** (le da
   un código único a cada estudiante que todavía no tenga uno).
5. En Apps Script, ejecuta la función **`configurarEnvioAutomatico`** una
   vez desde el editor — esto programa el envío diario automático
   (~2:30pm hora Colombia).

## PARTE 8 — Compartir el enlace con un acudiente

1. **Admin → Estudiantes → Gestionar estudiantes de este curso.**
2. Al lado de cada estudiante hay un botón **🔗 Portal padres** — ábrelo y
   verás el código QR y el enlace de ESE estudiante.
3. Puedes imprimir el QR (por ejemplo, pegado en el carné o en una
   circular), o copiar el enlace y mandarlo una sola vez por el medio que
   uses hoy (WhatsApp manual, correo, etc.).
4. El papá lo abre, ve la información de su hijo/a, y le da a **"🔔 Activar
   notificaciones"**. Desde ahí en adelante, cuando haya una novedad, le
   llega solo.

## PARTE 9 — Probarlo tú mismo antes de repartirlo

1. Abre el enlace de un estudiante de prueba, actívale las notificaciones.
2. Registra una inasistencia de ese estudiante en Tomar Asistencia.
3. En **Admin → Configuración → 📲 Enviar avisos de HOY ahora (prueba)** —
   dispara el envío inmediatamente, sin esperar a las 2:30pm.
4. Deberías recibir la notificación push (y el correo, si le pusiste email)
   en ese momento.

---

## Si algo no llega

- Revisa **Admin → Configuración** → que la URL del portal esté bien
  guardada.
- En Apps Script, **Ver → Registros de ejecución** después de correr el
  envío de prueba, para ver el detalle de cualquier error de Firebase.
- Los envíos también quedan guardados en la hoja **ENVIOS_LOG** de tu Google
  Sheet — ahí puedes ver, fila por fila, si cada intento fue "enviado" o
  "error" y por qué.
- Confirma que el `FIREBASE_CONFIG` sea **exactamente igual** en
  `padres.html` y en `sw.js` — es el error más común.

Cuando tengas esto probado y funcionando, cuéntame cómo te fue — si algo
falla en el primer intento (es normal con integraciones así), lo revisamos
juntos con el detalle exacto del error.
