import express, { request, response } from "express";
import morgan from "morgan";
import language from "./routes/language.routes"
import auth from "./routes/auth.routes"
import sendEmail from "./routes/send.routes"
import usuario from "./routes/usuario.routes"
import estudiante from "./routes/estudiante.routes"
import laboratorio from "./routes/laboratorio.routes"

//CORS
const cors = require('cors');

const app=express();
app.use(cors())
app.use(express.json());


// setting 
const puerto  = process.env.PORT || 4000;

app.set("port", puerto);

// middleware
app.use(morgan("dev"));

//INDEX
app.use(express.static('views'));

//Routes
app.use("/api",language) //cambio 
app.use("/auth", auth)
app.use("/send", sendEmail)
app.use("/usuario", usuario)
app.use("/estudiante", estudiante)
app.use("/laboratorio", laboratorio)

export default app;