# 📋 CONTROL DE ASISTENCIA — SECCIÓN PRIMARIA
## Colegio Miguel de Cervantes Saavedra I.E.D.

Este proyecto es una copia independiente del de Secundaria — su propia hoja
de Google, su propio backend, su propia URL. No comparte nada con el otro,
así que los cambios que hagas en uno no afectan al otro.

---

## ✅ Los 3 cambios que pediste

1. **"Sección Primaria"** aparece en el login, el encabezado de la app, y
   en el portal de padres.
2. **Ya no existe el usuario de Monitor** — ni la pestaña de rol en el
   login, ni la opción de crearlo en Admin → Usuarios. Solo hay
   Docente/Coordinación.
3. **Selector de Jornada (Mañana/Tarde)** en Tomar Asistencia — cada curso
   pertenece a una jornada, y el selector filtra cuáles aparecen.

Todo lo demás (Dashboard, Reportes, WhatsApp, Portal de Padres con QR y
notificaciones push, Hojas QR, Auditoría, Días especiales, Justificar
inasistencias, etc.) quedó exactamente igual.

---

## 🕐 Configura el horario real desde Admin (ya no toca tocar código)

Al principio estas horas venían fijas en el código como punto de
partida. Ahora hay una pantalla para configurarlas tú mismo, cuando
quieras: **Admin → 🕐 Horario de jornadas**. Ahí puedes ajustar la hora
de inicio y fin de cada bloque (y el descanso) para Mañana y Tarde por
separado, y guardar — el cambio aplica de inmediato en Tomar Asistencia,
sin tocar ningún archivo.

Mientras no lo configures, estas son las horas de referencia que trae por
defecto:

| Bloque | Mañana | Tarde |
|---|---|---|
| 1 | 6:15 – 7:05 | 12:30 – 13:20 |
| 2 | 7:05 – 7:55 | 13:20 – 14:10 |
| 3 | 7:55 – 8:45 | 14:10 – 15:00 |
| 4 | 8:45 – 9:35 | 15:00 – 15:50 |
| Descanso | 9:35 – 10:00 | 15:50 – 16:10 |
| 5 | 10:00 – 10:50 | 16:10 – 17:00 |
| 6 | 10:50 – 11:40 | 17:00 – 17:50 |

---

## 🚀 Puesta en marcha

1. Abre tu hoja de Google (la del ID `1AuJ9SOBfBabd5YeTNLfeFpMhKzscw9v5Rbx5osBqSgI`)
   → **Extensiones → Apps Script**.
2. Borra todo y pega `Codigo_Asistencia_Primaria.gs` completo. Guarda.
3. Ejecuta **`initSheets`** una vez (crea todas las hojas).
4. Ejecuta **`crearAdminInicial`** una vez — usuario `Mcs2026`, contraseña
   `docente2026` (cámbiala apenas entres, igual que en el otro proyecto).
5. **Implementar → Nueva implementación** → tipo *Aplicación web* →
   ejecutar como *yo* → acceso *cualquier usuario* → copia la URL (ya
   debería coincidir con la que me diste: termina en
   `...RXlCsB6-pw/exec`).
6. Sube los 8 archivos de este paquete a un sitio nuevo (Netlify, igual
   que hiciste con el de Secundaria — puede ser un sitio totalmente
   aparte).

## 📚 Cargar tus cursos y estudiantes

A diferencia del proyecto de Secundaria, **aquí no vienen cursos
precargados** — la numeración de Primaria es distinta y no quise
adivinarla mal. Ve a **Admin → Cursos** y agrégalos uno por uno con su
jornada correspondiente (ej. `101` → Mañana, `102` → Tarde, como
corresponda en tu colegio). Después carga los estudiantes de cada uno
igual que ya sabes hacerlo (Admin → Estudiantes → Excel o pegando listas).

## 👨‍👩‍👧 Portal de Padres

Todo funciona igual que en Secundaria — solo tienes que repetir la
configuración de Firebase (o, si quieres, puedes reutilizar el mismo
proyecto de Firebase que ya creaste, y solo agregar este sitio nuevo como
una segunda "app web" dentro de ese mismo proyecto — te ahorra crear uno
desde cero). Sigue `GUIA_PORTAL_PADRES.md` si decides hacerlo aparte.
