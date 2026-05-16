//Importando librerías necesarias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const path = require ('path');

//A partir de aquí se crean las rutas para cada ennpoint
app.get('/roles', async(req,res) => {
    try {
        const[results] =await db.query('SELECT * FROM rol');
        res.json(results);}
        catch(error) {
            console.error(error);
            res.status(500).json({ error: 'Error en la consulta, intente nuevamente' });
        }
    });

app.get('/test', (req, res) => {
    res.json({ message: 'ok' });
});

app.get('/productos', async(req, res) => {
    try {
        const [results] = await db.query(`SELECT producto.id_producto, producto.nombre, producto.precio, producto.ubicacion,
            COALESCE(SUM(CASE
                WHEN historial_stock.tipo_movimiento = 'entrada' THEN historial_stock.cantidad
                WHEN historial_stock.tipo_movimiento = 'salida' THEN -historial_stock.cantidad
                ELSE 0
                END), 0) AS stock
            FROM producto
            LEFT JOIN historial_stock ON producto.id_producto = historial_stock.id_producto
            GROUP BY producto.id_producto`);
            res.json(results); }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en la consulta, intente nuevamente' });
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
    res.status(500).json({ error: 'Error en la consulta, intente nuevamente' });
}
});

app.post('/productos', async(req, res)=> {
    try {
        const {nombre, precio, stock, ubicacion, categoria} = req.body;
        const [resultado] = await db.query(
            'INSERT INTO producto (nombre, id_categoria, ubicacion, precio) VALUES (?, ?, ?, ?)',
            [nombre, categoria, ubicacion, precio]
        );
        const idProducto = resultado.insertId;
        await db.query(
            'INSERT INTO inventario (id_producto, stock_actual) VALUES (?, ?)',
            [idProducto, stock]
        );

        res.json({ message: 'Producto agregado!' });
    } catch (error) {
        console.error('ERROR REAL:', error);
        res.status(500).json({ error: error.message });
    }
});
app.delete('/productos/:id', async (req, res) => {
    const id= req.params.id;
    try {
        await db.query ('DELETE FROM historial_stock WHERE id_producto = ?', [id]);
        await db.query ('DELETE FROM inventario WHERE id_producto = ?', [id]);
        await db.query ('DELETE FROM producto WHERE id_producto = ?', [id]);
        res.json({ message: 'Producto eliminado!' });
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

app.get('/tareas-usuarios', async(req, res) => {
    try {
        const [results] = await db.query(`SELECT tarea.id_tarea, tarea.titulo, tarea.descripcion, tarea.fecha, tarea.estado, usuario.nombre AS usuario
            FROM tarea
            LEFT JOIN asignacion_tarea ON tarea.id_tarea = asignacion_tarea.id_tarea
            LEFT join usuario ON asignacion_tarea.id_usuario = usuario.id_usuario
            ORDER BY tarea.id_tarea DESC`);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta, intente nuevamente' });
    }
})

app.get('/incentivos', async (req, res) =>{
    try {
        const [rows]= await db.query ('SELECT * FROM incentivo');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al mostrar incentivos' });
    }
});
app.post('/incentivos', async (req, res) => {
    const {nombre, descripcion, puntos_requeridos} = req.body;
    try {
        await db.query(
            'INSERT INTO incentivo (nombre, descripcion, puntos_requeridos) VALUES (?, ?, ?)',
            [nombre, descripcion, puntos_requeridos]);
            res.json({ message: 'Incentivo creado!' });
        }catch (error){
            console.error(error);
            res.status(500).json({ error: 'Error al crear un nuevo incentivo' });
        }
});
app.put('/incentivos/:id', async(req, res) => {
    const id = req.params.id;
    const{ nombre, descripcion, puntos_requeridos} = req.body;
    try{
        await db.query('UPDATE incentivo SET nombre= ?, descripcion= ?, puntos_requeridos= ? WHERE id_incentivo= ?',
            [nombre, descripcion, puntos_requeridos, id]);
            res.json({ message: 'Incentivo actualizado' });
        } catch (error){
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar' });
        }
    });
app.delete('/incentivos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await db.query('DELETE FROM incentivo WHERE id_incentivo= ?', [id]);
        res.json({ message: 'Incentivo eliminado!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar.' });
    }
});

app.get('/puntos-incentivos', async(req, res) => {
    try {
        const [results] = await db.query(`SELECT usuario.nombre AS usuario, puntos_usuario.puntos_acumulados AS puntos, incentivo.nombre AS incentivo FROM usuario
            JOIN puntos_usuario ON usuario.id_usuario = puntos_usuario.id_usuario
            JOIN incentivo ON puntos_usuario.puntos_acumulados >= incentivo.puntos_requeridos`);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los incentivos.' });
    }
})


app.get('/alertas-stock', async (req, res) => {
    try { 
    const [results] = await db.query(`
    SELECT producto.nombre AS producto, inventario.stock_actual AS stock FROM inventario
    JOIN producto ON inventario.id_producto = producto.id_producto 
    WHERE inventario.stock_actual < 5`);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las alertas de stock.' });    
    }
});

app.get('/tareas', async(req, res) => {
        const[results] = await db.query('SELECT * FROM tarea');
        res.json(results);

});

app.post('/tareas', async(req, res) =>{
    const {titulo, descripcion, usuarios} = req.body;

    const [resultado] = await db.query(
        'INSERT INTO tarea (titulo, descripcion, fecha, estado) VALUES (?, ?, NOW(), ?)', [titulo, descripcion, 'pendiente']
    );
    const idTarea = resultado.insertId;
    for (let idUsuario of usuarios){
        await db.query('INSERT INTO asignacion_tarea (id_usuario, id_tarea) VALUES (?, ?)', [idUsuario, idTarea]);
    }
    res.json({ message: 'Tarea creada y asignada' });
});
app.put('/tareas/:id', async(req, res) => {
    const id= req.params.id;
    try{
        await db.query('UPDATE tarea SET estado = "completado" WHERE id_tarea = ?', [id]);
    res.json({ message: 'Tarea completada' });
}   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });}
});

app.delete('/tareas/:id', async(req, res) => {
    const id = req.params.id;

    try {
        console.log('Eliminando tarea ID:', id);
        const [tarea] = await db.query('SELECT * FROM tarea WHERE id_tarea = ?', [id]);

        if(tarea.length === 0){
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        await db.query('DELETE FROM asignacion_tarea WHERE id_tarea = ?', [id]);
        await db.query('DELETE FROM tarea WHERE id_tarea = ?', [id]);

        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error('ERROR REAL AL ELIMINAR:', error);
        res.status(500).json({ error: error.message });
    }
});


app.get('/usuarios', async(req, res) => {
        const[results] = await db.query('SELECT * FROM usuario');
        res.json(results);
});


app.get('/tareas-completadas', async(req, res) =>{
        const[results] = await db.query(
            `SELECT tarea.id_tarea, tarea.titulo, tarea.descripcion, tarea.fecha, tarea.estado, usuario.nombre AS usuario
            FROM tarea
            LEFT JOIN asignacion_tarea ON tarea.id_tarea = asignacion_tarea.id_tarea
            LEFT JOIN usuario ON asignacion_tarea.id_usuario = usuario.id_usuario`);
        res.json(results);
})


app.post('/usuarios', async(req, res) => {
    const {nombre, correo, contrasena, rol} = req.body;

    try{
    const hash = await bcrypt.hash(contrasena, 10);
    const id_rol = rol === 'jefe' ? 1 : 2;

    await db.query('INSERT INTO usuario (nombre, correo, contrasena, id_rol) VALUES (?, ?, ?, ?)', [nombre, correo, hash, id_rol]);
    
    res.json({ message: 'Usuario creado' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
});
app.post('/login', async (req,res)=> {
    const {correo, contrasena} = req.body;
    try{
        const[rows] = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]
    );
    if(rows.length === 0) {
        return res.status(401).json({ error: 'No existe este usuario' });
    }
    const usuario = rows[0];
    const valido= await bcrypt.compare (contrasena, usuario.contrasena);
    if(!valido) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    res.json({
        rol: usuario.id_rol === 1 ? 'jefe' : 'vendedor',
        nombre: usuario.nombre
    });
} catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
}
});

app.delete('/usuarios/:id', async(req, res) => {
    const id= req.params.id;
    await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    res.json({ message: 'Usuario eliminado' });
});

app.get('/reportes', async(req, res) => {
    const [results]= await db.query('SELECT * FROM reporte ORDER BY fecha DESC');
    res.json(results);
});
app.post('/reportes', async(req, res) =>{
    try{
    const {descripcion} = req.body;
    await db.query('INSERT INTO reporte (descripcion, fecha) VALUES(?, NOW())', [descripcion]);
    res.json({ message: 'Reporte enviado' });
} catch(error) {
    console.error('ERROR:', error);
    res.status(500).json({ error: error.message });
}
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor escucha en el puerto: ${port}`);
});