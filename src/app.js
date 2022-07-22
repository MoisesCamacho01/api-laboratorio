import express, { request, response } from "express";
import morgan from "morgan";
import language from "./routes/language.routes"
import auth from "./routes/auth.routes"
import sendEmail from "./routes/send.routes"
import usuario from "./routes/usuario.routes"
import estudiante from "./routes/estudiante.routes"
import registro from "./routes/registroComputadora.routes"
import carreras from "./routes/carreras.routes"
import materias from "./routes/materias.routes"
import docentes from "./routes/docentes.routes"
import asignacion from "./routes/asignacionMateria.routes"
import semestres from "./routes/semestre.routes"
import matriculas from "./routes/matriculas.routes"
import horarios from "./routes/horarios.routes"
import computadoras from "./routes/computadoras.routes"
import reportes from "./routes/reportes.routes"
import laboratorios from "./routes/laboratorio.routes"

//CORS
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());


// setting 
const puerto = process.env.PORT || 4000;

app.set("port", puerto);

// middleware
app.use(morgan("dev"));

//INDEX
app.use(express.static('views'));

//Routes
app.use("/api", language) //cambio 
app.use("/auth", auth)
app.use("/send", sendEmail)
app.use("/usuario", usuario)
app.use("/estudiante", estudiante)
app.use("/registro", registro)
app.use("/carreras", carreras)
app.use("/materias", materias)
app.use("/docentes", docentes)
app.use("/asignacion", asignacion)
app.use("/semestres", semestres)
app.use("/matriculas", matriculas)
app.use("/horarios", horarios)
app.use("/computadoras", computadoras)
app.use("/reportes", reportes)
app.use("/laboratorios", laboratorios)

export default app;