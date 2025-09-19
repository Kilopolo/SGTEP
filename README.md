# Título del TFG: Sistema de Gestión de Tareas para Equipos Pequeños

## Descripción

Desarrollar un sistema de gestión de tareas simple y efectivo para equipos pequeños que les permita organizar, asignar y dar seguimiento a las tareas de manera eficiente. El objetivo es facilitar la colaboración y mejorar la productividad dentro del equipo.
**Estado:** Frontend (Vite + React + TypeScript + Tailwind) y Backend (Node.js + Express + Mongoose) funcionando.\

## Objetivos

1. Analizar las necesidades de gestión de tareas de equipos pequeños a través de encuestas o entrevistas.
2. Diseñar una interfaz de usuario intuitiva y fácil de usar para el sistema de gestión de tareas.
3. Implementar funcionalidades básicas, como la creación de tareas, asignación de responsables, establecimiento de fechas de vencimiento y seguimiento del progreso.
4. Incluir notificaciones y recordatorios para mantener a los usuarios informados sobre las tareas pendientes.
5. Realizar pruebas de usabilidad con usuarios objetivo para recoger retroalimentación y realizar mejoras.

## Funcionalidades
La aplicación consta de las siguientes funcionalidades principales:
### Notas
1. **Crear Notas**: Permite a los usuarios crear nuevas notas en la aplicación.
2. **Ver Notas**: Permite a los usuarios ver todas las notas existentes en la aplicación.
3. **Editar Notas**: Permite a los usuarios editar las notas existentes.
4. **Borrar Notas**: Permite a los usuarios eliminar notas de la aplicación.
5. **Compartir Notas**: Permite a los usuarios compartir sus notas con otros usuarios u otras plataformas.
### Usuarios
1. **Inicio de sesión**: Permite a los usuarios iniciar sesión en la aplicación para acceder a sus datos y funcionalidades personalizadas.
2. **Registro de usuario**: Permite a los usuarios registrarse en la aplicación para crear una cuenta personal.
3. **Borrar cuenta**: Permite a los usuarios eliminar permanentemente su cuenta de la aplicación.
### Vistas
1. **Crear Vistas**: Permite a los usuarios crear vistas personalizadas para organizar sus notas de manera específica.
2. **Ver Vistas**: Permite a los usuarios ver las vistas personalizadas creadas.
3. **Editar Vistas**: Permite a los usuarios editar las vistas personalizadas existentes.
4. **Borrar Vistas**: Permite a los usuarios eliminar vistas personalizadas.
5. **Compartir Vistas**: Permite a los usuarios compartir sus vistas personalizadas con otros usuarios.
### Internacionalización y Personalización

1. **Cambio de idioma**: Soporte para múltiples idiomas (ej. Español / Inglés) usando i18next.
2. **Modo oscuro y claro**: Los usuarios pueden alternar entre temas.

### Otros

1. **Ping/Health check**: Endpoint /ping y /api/health para verificar que el backend esté activo.
2. **Split-tunneling friendly**: La app puede conectarse a MongoDB incluso si se usa VPN, configurando DNS públicos.
3. **Front y Back deploy**: Frontend en Vercel, Backend en Render, con variables de entorno separadas.


---

## Contenido rápido

- `FRONT/` — Frontend con Vite, React, TypeScript, Tailwind, i18n y routing.
- `BACK/` — Backend con Node.js (ESM), Express, Mongoose (MongoDB Atlas), JWT auth.
- Script raíz para levantar ambos proyectos en paralelo.
- Endpoints clave: `/auth/*`, `/notes/*`, `/ping`, `/api/health`, `/profile` (protegido).
- Deploy recomendado: Front en Vercel, Back en Render (notas abajo).

---

## Requisitos (local)

- Node.js (>= 20.19.0 recomendado).
- npm (incluido en Node).
- Git.
- Cuenta en MongoDB Atlas (o Mongo local).
- (Opcional) Docker.

---

....

## Clonar y preparar (local)

### 1. Clona el repo y sitúate en la raíz:

```bash
git clone https://github.com/Kilopolo/SGTEP.git
cd SGTEP
```

### 2. Instalar dependencias

- **En la raíz (herramientas dev del monorepo)**
```bash
npm install
```
- **Backend**
```bash
cd BACK
npm install
```
- **Frontend**
```bash
cd ../FRONT
npm install
```
- **Volver a la raíz**
```bash
cd ..
```

### 3. Configurar variables de entorno

No comites `.env`. Copia y personaliza los ejemplos:

- **Backend (`BACK/.env`)**

```
PORT=5000
MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@<cluster>.mongodb.net/sgtepdb?retryWrites=true&w=majority&appName=SGTEP
JWT_SECRET=una_clave_muy_segura
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

- **Frontend (`FRONT/.env`)**

```
VITE_API_URL=http://localhost:5000
```

### 4. Variables de entorno en Producción

Configurar en Vercel (frontend) y Render (backend) según entorno:

- **Backend (`BACK/.env`)**

```
PORT=5000
MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@<cluster>.mongodb.net/sgtepdb?retryWrites=true&w=majority&appName=SGTEP
JWT_SECRET=una_clave_muy_segura
FRONTEND_URL=http://frontend.vercel.app
NODE_ENV=production
```


- **Frontend (`FRONT/.env`)**

```
VITE_API_URL= https://backend.onrender.com
```
### 5. Ejecutar proyectos en paralelo

Desde la raíz:
```bash
npm run dev
```
- Backend y frontend se levantan juntos.
- Para parar ambos: **Ctrl + C**


### 6. Deploy (Opcional)

#### Backend en Render

- **Backend en Render:** root: `BACK`, variables: `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`.
- **Frontend en Vercel:** root: `FRONT`, variables: `VITE_API_URL`.

---

## Seguridad y secretos

- No subas `.env` ni claves sensibles.
- Si se filtra una clave: **rota inmediatamente**.
- `JWT_SECRET` debe ser largo y seguro.


---


## Tecnologías

- **Frontend**: React, Vite, TypeScript, Tailwind, i18n, React Router.
- **Backend**: Node.js, Express, Mongoose, JWT, dotenv, bcrypt.
- **Base de datos**: MongoDB Atlas.
- **Infraestructura**: Vercel (frontend), Render (backend).
- **Herramientas adicionales**: ESLint, PostCSS, Swiper, Lucide Icons.


---

## Contribución

1. Haz fork del repo.
2. Crea rama: `git checkout -b feature/mi-cambio`.
3. Haz commits y PR contra `main`.
4. Consulta la [Guía de Contribución](CONTRIBUTIONS.md).

---

## Tablero de Trello

Puedes seguir nuestro progreso y conocer las tareas pendientes en nuestro tablero de Trello: [Prueba](#).

---

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## Contacto

Si tienes alguna pregunta o sugerencia, contáctanos en [pablo23dr@gmail.com](mailto\:pablo23dr@gmail.com) o abre un issue en este repositorio.

---

## Colaboradores

- Pablo Díaz Rubio


