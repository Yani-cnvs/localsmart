const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req,res) =>{
    res.send('Servidor funcionando!');
});

const db = require('./config/db');

app.get('/roles', async(req,res) => {
    try {
        const[results] =await db.query('SELECT * FROM rol');
        res.json(results);}
        catch(error) {
            console.error(error);
            res.status(500).send('Error en la consulta, intente nuevamente');
        }
    });

app.get('/test', (req, res) => {
    res.send('ok');
});

app.get('/productos', async(req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM producto');
        res.json(results); }
        catch (error) {
            console.error(error);
            res.status(500).send('Error en la consulta, intente nuevamente');
        }
});

app.get('/productos-categoria', async(req,res) => {
    try {
        const [results] = await db.query(`SELECT producto.nombre, producto.precio, categoria.nombre AS categoria
            FROM producto
            JOIN categoria ON producto.id_categoria = categoria.id_categoria`);
        res.json(results);
} catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta, intente nuevamente');
}
});

app.get('/tareas-usuarios', async(req, res) => {
    try {
        const [results] = await db.query(`SELECT usuario.nombre AS usuario, tarea.titulo AS tarea, tarea.estado FROM asignacion_tarea
            JOIN usuario ON asignacion_tarea.id_usuario = usuario.id_usuario
            JOIN tarea ON asignacion_tarea.id_tarea = tarea.id_tarea`);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta, intente nuevamente');
    }
})

app.listen(port, () => {
    console.log(`El servidor escucha en el puerto: ${port}`);
});