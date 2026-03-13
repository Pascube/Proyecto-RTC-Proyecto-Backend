# Proyecto Backend - API de Videojuegos y Usuarios

API REST construida con Node.js, Express y MongoDB que permite gestionar usuarios, sus imágenes de perfil y una lista de videojuegos favoritos.

## 🚀 Tecnologías utilizadas
* **Node.js & Express**: Servidor y rutas.
* **MongoDB Atlas**: Base de datos NoSQL.
* **Cloudinary**: Almacenamiento de imágenes en la nube.
* **JWT (JSON Web Token)**: Autenticación segura.
* **Bcrypt**: Encriptación de contraseñas.

## 🛠️ Instalación y uso
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar dependencias.
3. Crear un archivo `.env` siguiendo el ejemplo de `.env.example`.
4. Ejecutar `node seed.js` para poblar la base de datos de juegos.
5. Ejecutar `npm run dev` para iniciar el servidor.

## 🛣️ Endpoints principales

### Usuarios
* `POST /api/users/register`: Registro con imagen (form-data).
* `POST /api/users/login`: Login para obtener el Token.
* `GET /api/users`: Lista de usuarios (Solo Admin).
* `POST /api/users/favorites`: Añadir juego a favoritos (Requiere Token).

### Juegos
* `GET /api/games`: Lista todos los juegos.
* `POST /api/games`: Crear nuevo juego (Solo Admin).