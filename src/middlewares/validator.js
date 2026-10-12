export function validarCamper(req, res, next) {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({
            error: 'Se requiere un cuerpo JSON válido para la petición'
        });
    }

    const { nombre, modulo, nivel } = req.body;

    if (typeof nombre !== 'string' || nombre.trim().length === 0) {
        return res.status(400).json({
            error: 'El campo nombre es obligatorio y debe ser una cadena de texto no vacía.'
        });
    }

    if (typeof modulo !== 'string' || modulo.trim().length === 0) {
        return res.status(400).json({
            error: 'El campo modulo es obligatorio y debe ser una cadena de texto no vacía (ej: Node.js, Express, JavaScript, etc.).'
        });
    }

    if (typeof nivel !== 'string' || nivel.trim().length === 0) {
        return res.status(400).json({
            error: 'El campo nivel es obligatorio: [Básico, Intermedio, Avanzado].'
        });
    }

    next();
}