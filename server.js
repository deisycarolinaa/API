const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let productos = [
    { id: 1, nombre: "Arroz", precio: 50 },
    { id: 2, nombre: "Frijoles", precio: 30 },
    { id: 3, nombre: "bolso", precio: 200 }
];

app.get("/productos", (req, res) => {
    res.json(productos);
});

app.get("/producto/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json(producto);
});

app.post("/producto", (req, res) => {
    const { nombre, precio } = req.body;
    const id = productos.length + 1;
    const nuevoProducto = { id, nombre, precio };
    productos.push(nuevoProducto);
    res.status(201).json({ mensaje: "Producto agregado", producto: nuevoProducto });
});

app.put("/producto/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, precio } = req.body;
    const producto = productos.find(p => p.id === id);
    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    producto.nombre = nombre;
    producto.precio = precio;
    res.json({ mensaje: "Producto actualizado", producto });
});

app.delete("/producto/:id", (req, res) => {
    const id = parseInt(req.params.id);
    productos = productos.filter(p => p.id !== id);
    res.json({ mensaje: "Producto eliminado" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
