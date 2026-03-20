📌 Descripción

Este proyecto consiste en una aplicación web tipo CRUD que permite crear, visualizar, actualizar y eliminar registros mediante una API REST desarrollada en JavaScript (Node.js + Express) y una base de datos PostgreSQL.

El frontend está construido con HTML, CSS y JavaScript puro, y se comunica con la API mediante fetch.

El proyecto está completamente dockerizado, permitiendo ejecutar frontend, backend y base de datos mediante docker-compose.

🧱 Tecnologías utilizadas

Frontend: HTML, CSS, JavaScript

Backend: Node.js + Express

Base de datos: PostgreSQL

Contenedores: Docker + Docker Compose

🏗️ Estructura del proyecto
frontend/
├── public/                 # Frontend (HTML, JS)
│   ├── index.html
│   ├── create.html
│   ├── edit.html
│   ├── show.html
│   └── js/
│       ├── api.js
│       ├── config.js
│       ├── create.js
│       ├── edit.js
│       ├── index.js
│       └── show.js
│
├── src/                    # Backend (lógica separada)
│   ├── app.js
│   ├── db.js
│   └── routes/
│       └── products.routes.js
│
├── server.js               # Punto de entrada del backend
├── package.json
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── init.sql                # Script de inicialización
├── .env
├── .env.example
└── .gitignore
🚀 Cómo ejecutar el proyecto

Ubicarse en la carpeta frontend:

cd frontend

Ejecutar Docker:

docker-compose up --build

Acceder a:

Frontend:
👉 http://localhost:8088

API:
👉 http://localhost:8080/products

🔌 Endpoints de la API
Método	Endpoint	Descripción
GET	/products	Obtener todos los registros
GET	/products/:id	Obtener un registro por ID
POST	/products	Crear un registro
PUT	/products/:id	Actualizar completamente
PATCH	/products/:id	Actualización parcial
DELETE	/products/:id	Eliminar un registro
✏️ Estructura de datos

Cada registro contiene los siguientes campos:

{
  "id": 1,
  "campo1": "texto",
  "campo2": "texto",
  "campo3": "texto",
  "campo4": 1,
  "campo5": 1.5,
  "campo6": true
}
🧠 Funcionalidades clave

CRUD completo (Create, Read, Update, Delete)

Endpoint PATCH para actualizaciones parciales

Manejo de JSON en backend

Comunicación frontend-backend mediante fetch

Manejo de errores en frontend

🐳 Docker

El proyecto incluye 3 servicios:

frontend → Nginx sirviendo archivos estáticos

backend → API en Node.js

db → PostgreSQL

Base de datos

La base de datos se inicializa automáticamente con:

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  campo1 TEXT NOT NULL,
  campo2 TEXT NOT NULL,
  campo3 TEXT NOT NULL,
  campo4 INTEGER NOT NULL,
  campo5 DOUBLE PRECISION NOT NULL,
  campo6 BOOLEAN NOT NULL
);

Este script se ejecuta automáticamente al primer arranque del contenedor.

⚙️ Variables de entorno

Archivo .env:

DB_HOST=db
DB_PORT=5432
DB_NAME=jobsimulator
DB_USER=user
DB_PASSWORD=password

APP_PORT=3000

Archivo .env.example (sin valores reales):

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
APP_PORT=
🔒 Consideraciones técnicas

Se utiliza pg con Pool para manejar conexiones a PostgreSQL

La aplicación espera a que la base de datos esté disponible antes de iniciar

Se implementa CORS para permitir comunicación entre frontend y backend

Se utilizan consultas parametrizadas para evitar SQL injection

📌 Notas importantes

No se debe usar localhost para la conexión entre contenedores, se usa el nombre del servicio (db)

El script init.sql solo se ejecuta en el primer arranque

Si se desea reinicializar la base de datos:

docker-compose down -v
docker-compose up --build
📈 Nivel alcanzado

✔ Nivel 3 — Senior

Cumple con:

PostgreSQL como base de datos

Endpoint PATCH funcional

.env.example documentado

.gitignore configurado

Script SQL automático

Separación de responsabilidades en el backend

Dockerización completa