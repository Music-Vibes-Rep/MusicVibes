# 🎵 **MusicVibe** 🎶

**MusicVibe** es una red social enfocada en la música donde los usuarios pueden compartir sus gustos musicales, interactuar con otros, y descubrir nueva música. Este proyecto está en fase inicial de desarrollo. 🚀

<p align="center">
  <img src="src/public/assets/img/LogoFullNoBGW.png" alt="Descripción de la imagen" width="300"/>
</p>

---

## 🗂 **Estructura del Proyecto**

El proyecto está estructurado siguiendo el patrón **MVC** (Modelo-Vista-Controlador), usando **Node.js**, **Express**, **EJS**, y **TailwindCSS** para el diseño.

---

## 🛠 **Tecnologías Usadas**

- **Node.js**: 🟢 Entorno de ejecución para JavaScript del lado del servidor.
- **Express**: 🚀 Framework para Node.js que facilita la creación de servidores.
- **EJS**: 📄 Motor de plantillas que genera HTML dinámico.
- **TailwindCSS**: 🎨 Framework de CSS para un diseño responsivo y moderno.
- **MySQL2**: 🗄 Base de datos relacional para almacenar los datos de los usuarios.

---

## 📋 **Instalación**

### 🚀 **Prerrequisitos**

1. **Node.js y npm**: Si no tienes Node.js, puedes descargarlo [aquí](https://nodejs.org/).
2. **Base de datos MySQL**: Asegúrate de tener MySQL instalado y configurado en tu máquina si estás usando este gestor de bases de datos.

### ⚙️ **Pasos para instalar**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Music-Vibes-Rep/MusicVibes.git
   cd MusicVibes
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta el servidor:

   ```bash
   node server.js
   ```

4. Abre tu navegador y accede a [http://localhost:8081](http://localhost:8081) para ver la aplicación en acción.

---

## 🔍 **Estructura del Código**

### `server.js`

Este archivo es el encargado de configurar y arrancar el servidor Express. Aquí se definen las rutas principales y la configuración básica del servidor.

### `app.js`

En `app.js` se configura el middleware, las rutas y la conexión a la base de datos. Este archivo es importado por `server.js` para organizar el código.

### `views/`

La carpeta `views/` contiene las plantillas **EJS** que generan HTML dinámico, permitiendo que la información de los usuarios se presente de manera personalizada.

### `controllers/`

Los controladores contienen la lógica que se ejecuta cuando se llama a una ruta. Se encargan de procesar los datos, interactuar con la base de datos y pasar la información a las vistas.

### `models/`

Los modelos interactúan directamente con la base de datos. Contienen funciones para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos.

### `public/`

Aquí se encuentran los archivos estáticos (CSS, imágenes, JavaScript) que son referenciados en las vistas **EJS**. Esta carpeta es accesible para el navegador.

---

¡Gracias por tu interés en **MusicVibe**!
