const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const { Komentar } = require("./models");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/komentar", async (req, res) => {
  try {
    const results = await Komentar.findAll()
    return res.send({
      message: "Berhasil menampilkan data",
      data: results,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Gagal menampilkan data",
    });
  }
});

app.post("/komentar", async (req, res) => {
  try {
    const body = req.body
    const nama = body.nama
    const email = body.email
    const komentar = body.komentar
    await Komentar.create({
      nama: nama,
      email: email,
      komentar: komentar,
    });
    return res.send({
      message: "Berhasil menambahkan data",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Gagal menambahkan data",
    });
  } 
});

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
