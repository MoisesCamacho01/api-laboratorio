import express, { request, response } from "express";
import morgan from "morgan";
import language from "./routes/language.routes"
import auth from "./routes/auth.routes"
import sendEmail from "./routes/send.routes"
import usuario from "./routes/usuario.routes"

//CORS
const cors = require('cors');

const app=express();
app.use(express.json());

app.use(cors())


// setting 
const puerto  = process.env.PORT || 4000;

app.set("port", puerto);

// middleware
app.use(morgan("dev"));

//INDEX
app.use(express.static('views'));

//Routes
app.use("/api",language) //cambio ewe
app.use("/auth", auth)
app.use("/send", sendEmail)
app.use("/usuario", usuario)


export default app;