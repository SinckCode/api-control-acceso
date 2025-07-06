# 🚀 API de Control de Acceso con Node.js + Express

Este repositorio contiene una API RESTful desarrollada en **Node.js** y **Express**, que permite gestionar un sistema de **control de acceso**, registro de eventos y monitoreo de estacionamiento.  
La API es consumida por un ESP32 que se encarga de la interacción física (lectores RFID, servomotor, sensores, LEDs).

---

## 🧭 Características Principales

✅ Autenticación de usuarios por RFID y correo electrónico.  
✅ Control de apertura y cierre de plumas.  
✅ Actualización del estado de estacionamiento (ocupado/libre).  
✅ Registro de logs de accesos.  
✅ Control de buzzer (alerta sonora).  
✅ Rutas independientes para cada funcionalidad.  
✅ Base de datos MySQL (scripts incluidos).

---

## 📂 Estructura del Proyecto

```
api-control-acceso/
├── bd/                 # Scripts de base de datos (DDL y DML)
│   ├── ddl_control_acceso.sql
│   └── dml_control_acceso.sql
├── config/             # Configuración de conexión a MySQL
│   └── database.js
├── controllers/        # Lógica de negocio
│   ├── accessController.js
│   ├── authUserController.js
│   ├── authUsersController.js
│   ├── buzzerController.js
│   ├── logsController.js
│   ├── parkingController.js
│   ├── plumaController.js
│   ├── pluma2Controller.js
│   └── userController.js
├── models/             # Modelos de datos
│   ├── accessLogsModel.js
│   ├── authUserModel.js
│   ├── parkingModel.js
│   ├── parkingStatusModel.js
│   └── userModel.js
├── routes/             # Rutas de la API
│   ├── accessRoutes.js
│   ├── authRoutes.js
│   ├── authUsersRoutes.js
│   ├── buzzerRoutes.js
│   ├── logsRoutes.js
│   ├── parkingRoutes.js
│   ├── plumaRoutes.js
│   ├── pluma2Routes.js
│   └── userRoutes.js
├── index.js            # Punto de entrada del servidor
├── package.json        # Dependencias y scripts
└── .env                # Variables de entorno (no se incluye en este repo)
```

---

## ⚙️ Requisitos

- **Node.js** >= 14
- **MySQL** >= 5.7
- **npm**

---

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/api-control-acceso.git
   cd api-control-acceso
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crea un archivo `.env` en la raíz con el siguiente contenido:
   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   DB_DATABASE=control_acceso
   PORT=3000
   ```

4. **Importar la base de datos**
   - Ejecuta los scripts de `bd/ddl_control_acceso.sql` y `bd/dml_control_acceso.sql` en tu servidor MySQL.

5. **Iniciar el servidor**
   ```bash
   npm start
   ```

---

## 🌐 Endpoints Principales

Aquí se listan las rutas más importantes:

### 📘 Autenticación

| Método | Ruta                         | Descripción                               |
|--------|------------------------------|-------------------------------------------|
| POST   | `/api/auth/rfid-login`       | Autenticación por RFID                   |
| POST   | `/api/auth/login`            | Autenticación por email/contraseña       |

---

### 🚦 Control de Pluma

| Método | Ruta                       | Descripción                       |
|--------|----------------------------|-----------------------------------|
| GET    | `/api/pluma/status`        | Obtener estado de la pluma       |
| PUT    | `/api/pluma/open`          | Abrir la pluma                   |
| PUT    | `/api/pluma/close`         | Cerrar la pluma                  |
| PUT    | `/api/pluma2/open`         | Abrir la segunda pluma           |
| PUT    | `/api/pluma2/close`        | Cerrar la segunda pluma          |

---

### 🅿️ Estado de Estacionamiento

| Método | Ruta                               | Descripción                      |
|--------|------------------------------------|----------------------------------|
| PATCH  | `/api/parking/status/:spotId`      | Actualizar estado de un espacio |
| GET    | `/api/parking/status/:spotId`      | Consultar estado de un espacio  |

---

### 🔔 Buzzer

| Método | Ruta                  | Descripción              |
|--------|-----------------------|--------------------------|
| PUT    | `/api/buzzer/on`      | Activar buzzer          |
| PUT    | `/api/buzzer/off`     | Desactivar buzzer       |

---

### 🗂️ Logs de Accesos

| Método | Ruta            | Descripción                  |
|--------|-----------------|------------------------------|
| GET    | `/api/logs`     | Obtener todos los registros |

---

## 🧪 Ejemplo de Solicitud

**Autenticación RFID**

```http
POST /api/auth/rfid-login
Content-Type: application/json

{
  "rfid_uid": "ABCD1234EF56"
}
```

---

## ⚡ Scripts disponibles

| Script           | Descripción                    |
|------------------|--------------------------------|
| `npm start`      | Iniciar servidor en producción|
| `npm run dev`    | Iniciar con **nodemon**       |

---

## 📝 Notas Importantes

- El archivo `.env` **no se incluye** en este repositorio por seguridad.
- La API usa **MySQL**, asegúrate de tener la base creada y los datos importados.
- La autenticación RFID espera el UID de la tarjeta en formato hexadecimal.

---

## 🙌 Contribuciones

Si deseas contribuir:

- Haz un **Fork**
- Crea tu rama
- Realiza tus cambios
- Envía un **Pull Request**

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT.

---

## 📬 Contacto

Si tienes preguntas o sugerencias, puedes escribirme a:

📧 [tu-email@ejemplo.com]

---
