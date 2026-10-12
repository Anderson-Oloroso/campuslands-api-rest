export function errorHandler(err, req, res, next) {
    console.error('🔴 [ERROR GLOBAL CAPTURADO]:', err.message || err);

    const codigoEstado = err.statusCode || 500;
    const mensajeRespuesta = err.message || 'Ocurrió un error interno en el servidor.';

    res.status(codigoEstado).json({
        error: mensajeRespuesta
    });
}