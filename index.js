const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

let pool;

(async () => {
  pool = await mysql.createPool(dbConfig);
})();

app.get("/buscar-casos/:ubigeo", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM malaria WHERE ubigeo = ?", [
      req.params.ubigeo,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ mensaje: "No se encontraron datos" });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/registrar-caso", async (req, res) => {
  try {
    const {
      ano,
      semana,
      departamento,
      provincia,
      distrito,
      ubigeo,
      falciparum,
      vivax,
    } = req.body;

    await pool.query(
      `INSERT INTO malaria (ano, semana, departamento, provincia, distrito, ubigeo, falciparum, vivax)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ano,
        semana,
        departamento,
        provincia,
        distrito,
        ubigeo,
        falciparum,
        vivax,
      ]
    );

    res.status(201).json({ mensaje: "Caso registrado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Microservicio corriendo en puerto 3000"));
