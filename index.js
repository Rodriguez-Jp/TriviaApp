import express from "express";
import router from "./routes/index.js";

const app = express();

//Definomos el puerto
const port = process.env.PORT || 4000;

//Habilitamos PUG
app.set("view engine", "pug");

//Agregamos el router
app.use("/", router);

//Definimos carpeta public
app.use(express.static("public"));

//Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
