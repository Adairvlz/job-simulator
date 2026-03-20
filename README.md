# 📘 README — CRUD API con Docker y PostgreSQL

## 📌 Descripción

Este proyecto consiste en una aplicación web tipo CRUD que permite crear, visualizar, actualizar y eliminar registros mediante una API REST desarrollada en JavaScript (Node.js + Express) y una base de datos PostgreSQL.

El frontend está construido con HTML, CSS y JavaScript puro, y se comunica con la API mediante fetch.

El proyecto está completamente dockerizado, permitiendo ejecutar frontend, backend y base de datos mediante docker-compose.

---

## 🧱 Tecnologías utilizadas

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- Contenedores: Docker + Docker Compose

---

## 🏗️ Estructura del proyecto

frontend/
├── public/
├── src/
├── server.js
├── package.json
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── init.sql
├── .env
├── .env.example
└── .gitignore

---

## 🚀 Cómo ejecutar el proyecto

cd frontend
docker-compose up --build

Frontend: http://localhost:8088  
API: http://localhost:8080/products  

---

## 🔌 Endpoints

GET /products  
GET /products/:id  
POST /products  
PUT /products/:id  
PATCH /products/:id  
DELETE /products/:id  

---

## 📊 Estructura de datos

{
  "id": 1,
  "campo1": "texto",
  "campo2": "texto",
  "campo3": "texto",
  "campo4": 1,
  "campo5": 1.5,
  "campo6": true
}

---

## 🐳 Docker

Servicios:
- frontend
- backend
- db

---

## ⚙️ Variables de entorno

.env:

DB_HOST=db
DB_PORT=5432
DB_NAME=jobsimulator
DB_USER=user
DB_PASSWORD=password
APP_PORT=3000

.env.example:

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
APP_PORT=

---

## 📈 Nivel alcanzado

Nivel 3 — Senior
