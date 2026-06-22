import express from "express";

const app = express();

app.use(express.json());

// Se mantiene la variable "tareas" pero el contenido ahora son objetos físicos
let tareas = [
    {
        id: 1,
        titulo: "Mesa",
        descripcion: "esto es una mesa de madera",
        estado: "pendiente",
        pasos: "1. limpiar la superficie, 2. lijar los bordes"
    },
    {
        id: 2,
        titulo: "Silla",
        descripcion: "esto es una silla de oficina",
        estado: "pendiente",
        pasos: "1. ajustar la altura, 2. cambiar las ruedas"
    },
    {
        id: 3,
        titulo: "Lampara",
        descripcion: "esto es una lampara de escritorio",
        estado: "completada",
        pasos: "1. cambiar la bombilla, 2. conectar a la corriente"
    }
];

// Mostrar todas las tareas
app.get("/tareas", (req, res) => {
    res.status(200).json({
        msg: "La lista de tareas es esta",
        tareas
    });
});

// Buscar por nombre
app.get("/nombre/:titulo", (req, res) => {
    const { titulo } = req.params;

    const tareasFiltradas = tareas.filter(
        tarea => tarea.titulo.toLowerCase().includes(titulo.toLowerCase())
    );

    res.status(200).json({
        msg: "Tareas encontradas",
        tareas: tareasFiltradas
    });
});

// Pendientes
app.get("/pendientes", (req, res) => {
    const pendientes = tareas.filter(
        tarea => tarea.estado === "pendiente"
    );

    res.status(200).json({
        msg: "Listado de tareas pendientes",
        tareas: pendientes
    });
});

// Completadas
app.get("/completadas", (req, res) => {
    const completadas = tareas.filter(
        tarea => tarea.estado === "completada"
    );

    res.status(200).json({
        msg: "Listado de tareas completadas",
        tareas: completadas
    });
});

// Agregar tareas nuevas (Nuevos objetos)
app.post("/nuevo", (req, res) => {

    let nuevasTareas = [
        {
            id: 4,
            titulo: "Espejo",
            descripcion: "esto es un espejo de pared",
            estado: "pendiente",
            pasos: "1. limpiar con limpiavidrios, 2. colgar en la sala"
        },
        {
            id: 5,
            titulo: "Reloj",
            descripcion: "esto es un reloj de pared",
            estado: "pendiente",
            pasos: "1. poner baterias, 2. ajustar la hora"
        },
        {
            id: 6,
            titulo: "Cuadro",
            descripcion: "esto es un cuadro decorativo",
            estado: "pendiente",
            pasos: "1. medir el espacio, 2. clavar en la pared"
        }
    ];

    tareas.push(...nuevasTareas);

    res.status(201).json({
        msg: "Nuevas tareas agregadas",
        tareas
    });
});

// Restaurar tareas originales
app.post("/regreso", (req, res) => {

    tareas = [
        {
            id: 1,
            titulo: "Mesa",
            descripcion: "esto es una mesa de madera",
            estado: "pendiente",
            pasos: "1. limpiar la superficie, 2. lijar los bordes"
        },
        {
            id: 2,
            titulo: "Silla",
            descripcion: "esto es una silla de oficina",
            estado: "pendiente",
            pasos: "1. ajustar la altura, 2. cambiar las ruedas"
        },
        {
            id: 3,
            titulo: "Lampara",
            descripcion: "esto es una lampara de escritorio",
            estado: "completada",
            pasos: "1. cambiar la bombilla, 2. conectar a la corriente"
        }
    ];

    res.status(200).json({
        msg: "Lista restaurada",
        tareas
    });
});

// Actualizar tarea completa
app.patch("/actualizartarea/:id", (req, res) => {

    const { id } = req.params;

    tareas = tareas.map(tarea =>
        tarea.id === parseInt(id)
            ? {
                ...tarea,
                titulo: "Totalidad",
                descripcion: "esto es una totalidad",
                estado: "completada",
                pasos: "1. sumar, 2. restar, 3. dividir" // Mantenido igual a tu patch original
            }
            : tarea
    );

    res.status(200).json({
        msg: `La tarea con id ${id} fue actualizada`,
        tareas
    });
});

// Actualizar estado
app.patch("/actualizarestado/:id/:estado", (req, res) => {

    const { id, estado } = req.params;

    tareas = tareas.map(tarea =>
        tarea.id === parseInt(id)
            ? { ...tarea, estado }
            : tarea
    );

    res.status(200).json({
        msg: `Estado actualizado`,
        tareas
    });
});

// Eliminar tarea
app.delete("/eliminar/:id", (req, res) => {

    const { id } = req.params;

    tareas = tareas.filter(
        tarea => tarea.id !== parseInt(id)
    );

    res.status(200).json({
        msg: `La tarea con id ${id} fue eliminada`,
        tareas
    });
});

// Iniciar servidor
app.listen(5000, () => {
    console.log("Servidor en puerto 5000");
});