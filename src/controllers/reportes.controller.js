import {getConnection} from './../database/database';
import jwt from "jsonwebtoken";

//FILTROS
const index = async(request, response) => {
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) =>{
            if(error){
                response.json(error.message)
            }else{
                userID = dataUser.user.id;
            }
        })
        var token = request.token;
        // response.json(token)

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT *, (SELECT computadoras.tipo_computadora FROM computadoras WHERE computadoras.id_computadora = registros.id_computadora) as tipo_computadora, (SELECT horarios.hora_inicio FROM horarios WHERE horarios.id_horario = registros.id_horario) as hora_inicio, (SELECT horarios.hora_fin FROM horarios WHERE horarios.id_horario = registros.id_horario) as hora_fin FROM registros");
        // response.send("DIMENCION"+result.length)
        
        if(result.length>0){
            response.json({
                data: result,
                message: 'success'
            })
        }else{
            response.json({message: 'No podemos obtener información'})
        }
    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

const porLaboratorio = async (request, response)=>{
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) =>{
            if(error){
                response.json(error.message)
            }else{
                userID = dataUser.user.id;
            }
        })
        var token = request.token;
        var {id} = request.params
        // response.json(token)

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT registros.id_computadora, horarios.hora_inicio, horarios.hora_fin, registros.fecha_registro, registros.hora_registro, registros.observaciones, CONCAT(estudiantes.nombre_estudiante, ' ', estudiantes.apellido_estudiante) as nombre_estudiante, computadoras.tipo_computadora as tipo_computadora FROM registros INNER JOIN usuarios ON usuarios.id_usuario = registros.id_usuario INNER JOIN estudiantes ON estudiantes.id_estudiante = usuarios.id_estudiante INNER JOIN horarios ON horarios.id_horario = registros.id_registro INNER JOIN computadoras ON computadoras.id_computadora = registros.id_computadora INNER JOIN laboratorios ON laboratorios.id_laboratorio = computadoras.id_laboratorio AND laboratorios.id_laboratorio = ?", id);
        // response.send("DIMENCION"+result.length)
        
        if(result.length>0){
            response.json({
                data: result,
                message: 'success'
            })
        }else{
            response.json({message: 'No podemos obtener información'})
        }
    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

const porHorario = async (request, response)=>{
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) =>{
            if(error){
                response.json(error.message)
            }else{
                userID = dataUser.user.id;
            }
        })
        var token = request.token;
        var {id} = request.params
        // response.json(token)

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT registros.id_computadora, horarios.hora_inicio, horarios.hora_fin, registros.fecha_registro, registros.hora_registro, registros.observaciones, CONCAT(estudiantes.nombre_estudiante, ' ', estudiantes.apellido_estudiante) as nombre_estudiante, computadoras.tipo_computadora as tipo_computadora FROM registros INNER JOIN usuarios ON usuarios.id_usuario = registros.id_usuario INNER JOIN estudiantes ON estudiantes.id_estudiante = usuarios.id_estudiante INNER JOIN computadoras ON computadoras.id_computadora = registros.id_computadora INNER JOIN horarios ON registros.id_horario = horarios.id_horario AND horarios.id_horario = ?", id);
        // response.send("DIMENCION"+result.length)
        if(result.length>0){
            response.json({
                data: result,
                message: 'success'
            })
        }else{
            response.json({message: 'No podemos obtener información'})
        }
    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

const porDocente = async (request, response)=>{
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) =>{
            if(error){
                response.json(error.message)
            }else{
                userID = dataUser.user.id;
            }
        })
        var token = request.token;
        var {id} = request.params
        // response.json(token)

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT registros.id_computadora, horarios.hora_inicio, horarios.hora_fin, registros.fecha_registro, registros.hora_registro, registros.observaciones, CONCAT(estudiantes.nombre_estudiante, ' ', estudiantes.apellido_estudiante) as nombre_estudiante, computadoras.tipo_computadora as tipo_computadora FROM registros INNER JOIN usuarios ON usuarios.id_usuario = registros.id_usuario INNER JOIN estudiantes ON estudiantes.id_estudiante = usuarios.id_estudiante INNER JOIN computadoras ON computadoras.id_computadora = registros.id_computadora  INNER JOIN horarios ON registros.id_horario = horarios.id_horario INNER JOIN asignacion_materias ON horarios.id_asignacion = asignacion_materias.id_asignacion INNER JOIN docentes ON docentes.id_docente = asignacion_materias.id_docente AND docentes.id_docente = ?", id);
        // response.send("DIMENCION"+result.length)
        if(result.length>0){
            response.json({
                data: result,
                message: 'success'
            })
        }else{
            response.json({message: 'No podemos obtener información'})
        }
    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}
const porMateria = async (request, response)=>{
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) =>{
            if(error){
                response.json(error.message)
            }else{
                userID = dataUser.user.id;
            }
        })
        var token = request.token;
        var {id} = request.params
        // response.json(token)

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT registros.id_computadora, horarios.hora_inicio, horarios.hora_fin, registros.fecha_registro, registros.hora_registro, registros.observaciones, CONCAT(estudiantes.nombre_estudiante, ' ', estudiantes.apellido_estudiante) as nombre_estudiante, computadoras.tipo_computadora as tipo_computadora FROM registros INNER JOIN usuarios ON usuarios.id_usuario = registros.id_usuario INNER JOIN estudiantes ON estudiantes.id_estudiante = usuarios.id_estudiante INNER JOIN computadoras ON computadoras.id_computadora = registros.id_computadora  INNER JOIN horarios ON registros.id_horario = horarios.id_horario INNER JOIN asignacion_materias ON horarios.id_asignacion = asignacion_materias.id_asignacion INNER JOIN materias ON materias.id_materia = asignacion_materias.id_materia AND materias.id_materia = ?", id);
        // response.send("DIMENCION"+result.length)
        if(result.length>0){
            response.json({
                data: result,
                message: 'success'
            })
        }else{
            response.json({message: 'No podemos obtener información'})
        }
    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

const obtenerHoras = async(request, response)=>{
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) =>{
            if(error){
                response.json(error.message)
            }else{
                userID = dataUser.user.id;
            }
        })
        var token = request.token;
        var {id} = request.params

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM horarios WHERE id_laboratorio = ?", id);
        // response.send("DIMENCION"+result.length)
        if(result.length>0){
            response.json({
                data: result,
                message: 'success'
            })
        }else{
            response.json({message: 'No podemos obtener información'})
        }
    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

export const methods = {
    porHorario,
    porLaboratorio,
    index,
    obtenerHoras,
    porDocente,
    porMateria
} 
