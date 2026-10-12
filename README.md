# API REST de Campers

API REST sencilla desarrollada con Node.js y Express para consultar y administrar campers. Los datos se guardan en un arreglo en memoria; no se utiliza una base de datos externa.

## Requisitos

- Node.js
- npm

## Instalación y ejecución

Instala las dependencias:

```bash
npm install
```

Inicia el servidor:

```bash
npm start
```

Para ejecutar el servidor en modo de desarrollo, con reinicio automático al cambiar archivos:

```bash
npm run dev
```

Por defecto, la API queda disponible en `http://localhost:3000`. Se puede elegir otro puerto configurando la variable de entorno `PORT`.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/` | Información de bienvenida y endpoints disponibles. |
| `GET` | `/api/campers` | Lista todos los campers. |
| `GET` | `/api/campers/:id` | Consulta un camper por su ID. |
| `POST` | `/api/campers` | Crea un camper. |
| `PUT` | `/api/campers/:id` | Actualiza todos los campos de un camper existente. |
| `DELETE` | `/api/campers/:id` | Elimina un camper existente. |

### Crear un camper

Envía una solicitud `POST` a `/api/campers` con `Content-Type: application/json` y un cuerpo como este:

```json
{
  "nombre": "Valeria Gómez",
  "modulo": "Node.js",
  "nivel": "Intermedio"
}
```

Los campos `nombre`, `modulo` y `nivel` son obligatorios y deben ser cadenas de texto no vacías. El ID se asigna automáticamente.

### Actualizar un camper

Envía una solicitud `PUT` a `/api/campers/:id` con el mismo formato JSON usado para crear. La actualización reemplaza los valores de `nombre`, `modulo` y `nivel`.

### Ejemplos de consulta

```text
GET    http://localhost:3000/api/campers
GET    http://localhost:3000/api/campers/21
POST   http://localhost:3000/api/campers
PUT    http://localhost:3000/api/campers/21
DELETE http://localhost:3000/api/campers/21
```

## Respuestas y errores

- `200`: consulta, actualización o eliminación exitosa.
- `201`: camper creado.
- `400`: ID inválido o datos de entrada que no cumplen la validación.
- `404`: camper o ruta no encontrados.
- `500`: error interno del servidor.

Las respuestas de error usan un objeto JSON con la propiedad `error`.

## Datos

Los registros iniciales y la función `reiniciarCampers()` están definidos en `src/data/campers.db.js`. Los cambios se mantienen solo mientras el proceso del servidor siga activo; al reiniciarlo, se vuelve a cargar el arreglo inicial.

## Estructura del proyecto

```text
src/
├── app.js
├── data/
│   └── campers.db.js
├── middlewares/
│   ├── errorHandler.js
│   ├── logger.js
│   └── validator.js
└── routes/
    └── campers.routes.js
```

## Pruebas

Actualmente, `package.json` no define un script de pruebas. Para agregarlas, primero se debe configurar el framework de testing y sus casos.