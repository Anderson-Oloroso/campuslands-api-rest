import express from 'express';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import campersRouter from './routes/campers.routes.js';

// Init App
const app = express();

// Global Middlewares
// Express parsea solicitudes entrantes al cuerpo en formato application/json
app.use(express.json());
app.use(logger);

// Auditoria - Middlewares personalizados para solicitudes entrantes
app.get('/', (req, res)=>{
    res.status(200).json({
        mensaje: "🚀 Bienvenido a la API REST de Campers con Express (Campuslands)",
        stack: "Node.js + Express + ECMAscript Modules (ESM)",
        almacenamiento: "Arreglo en memoria (Sin base de datos externa)",
        documentacion_endpoints: {
            listar_datos: "GET /api/campers",
            obtener_por_id: "GET /api/campers/:id",
            crear_nuevo: "POST /api/campers",
            actualizar: "PUT /api/campers/:id",
            eliminar: "DELETE /api/campers/:id"
        }
    });
});

// Montaje del enrutador Modular
app.use('/api/campers', campersRouter);

// Handler de rutas no encontradas (404)
app.use((req, res)=>{
    res.status(404).json({
        error: `🔴 Ruta '${req.originalUrl}' no encontrada en este servidor.`
    });
});

// Middleware global de manejo de errores
app.use(errorHandler);

// Iniciar El servidor si este archivo se ejecuta directamente
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test'){
    app.listen(PORT, ()=>{
        console.log(`================================================================`);
        console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
        console.log(`⭐ Endpoints CRUD disponibles en http://localhost:${PORT}/api/campers`);
        console.log(`💡 Presiona Ctrl + C para detener el servidor`);
        console.log(`================================================================`);
    });
}

export default app;