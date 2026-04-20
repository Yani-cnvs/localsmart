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

app.listen(port, () => {
    console.log(`El servidor escucha en el puerto: ${port}`);
});