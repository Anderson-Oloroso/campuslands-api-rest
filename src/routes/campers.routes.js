import { Router } from 'express';
import { campers } from '../data/campers.db.js';
import { validarCamper } from '../middlewares/validator.js';

const router = Router();

// 1. [GET] /api/campers - Listar todos los campers
router.get('/', (req, res) => {
    res.status(200).json({
        total: campers.length,
        data: campers
    });
});

// 2. [GET] /api/campers/:id - Obtener un camper por ID
router.get('/:id', (req, res)=>{
    const idBuscado = parseInt(req.params.id, 10);
    if (isNaN(idBuscado)){
        return res.status(400).json({
            error: "El ID debe de ser un numero entero válido."
        });
    }

    const camperEncontrado = campers.find(c => c.id === idBuscado);
    if(!camperEncontrado){
        return res.status(404).json({
            error: `No se encontró un camper con ID ${idBuscado}.`
        });
    }

    res.status(200).json({
        mensaje: `Camper encontrado exitosament.`,
        camper: camperEncontrado
    });
});

// 3. [POST] /api/campers
router.post('/', validarCamper, (req, res) =>{
    const { nombre, modulo, nivel } = req.body;

    //Generacion de ID automaicamente basado en el máximo existente
    const nuevoId = campers.length > 0 ? Math.max(...campers.map((c)=>c.id))+1 : 1;

    const nuevoCamper = {
        id: nuevoId,
        nombre: nombre.trim(),
        modulo: modulo.trim(),
        nivel: nivel.trim()
    };

    campers.push(nuevoCamper);

    res.status(201).json({
        mensaje: "Camper registrado exitosamente en memoria.",
        camper: nuevoCamper
    });
});

// 4. [PUT] /api/campers/:id - Actualizar registros
router.put("/:id", validarCamper, (req, res)=>{
    const idBuscado = parseInt(req.params.id, 10);
    if (isNaN(idBuscado)){
        return res.status(400).json({
            error: "El ID debe de ser un numero entero válido."
        });
    }

    const indice = campers.findIndex((c)=> c.id === idBuscado);

    if(indice === -1){
        return res.status(404).json({
            error: `No es posible actualizar: No existe camper con ID ${idBuscado}`
        });
    }

    const { nombre, modulo, nivel } = req.body;

    campers[indice] = {
        id: idBuscado,
        nombre: nombre.trim(),
        modulo: modulo.trim(),
        nivel: nivel.trim()
    };

    res.status(200).json({
        mensaje: `Camper con ID ${idBuscado} actualizado exitosamente.`,
        camper: campers[indice]
    });
});

// 4. [DELETE] api/campers/:id - Eliminar un camper
router.delete('/:id', (req, res)=>{
    const idBuscado = parseInt(req.params.id, 10);

    if(isNaN(idBuscado)){
        return res.status(400).json({
            error: 'El parametro ID debe de ser un número entero válido.'
        });
    }

    const indice = campers.findIndex((c)=> c.id === idBuscado);

    if (indice === -1){
        return res.status(404).json({
            error: `No es posible eliminar: No existe camper con ID ${idBuscado}.`
        });
    };

    // Extraer y remover
    const [camperEliminado] = campers.splice(indice, 1);

    res.status(200).json({
        mensaje:`Camper con ID ${idBuscado} eliminado exitosamente`,
        data: camperEliminado
    });
})

export default router;