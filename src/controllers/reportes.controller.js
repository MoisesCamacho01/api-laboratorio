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
        const result = await connection.query(`SELECT DISTINCTROW registros.id_registro, registros.id_horario, 
        laboratorios.nombre_laboratorio,
        laboratorios.piso_laboratorio,
        horarios.hora_inicio, horarios.hora_fin, registros.fecha_registro, registros.hora_registro, registros.observaciones, CONCAT(computadoras.tipo_computadora, ' ', computadoras.descripcion_computadora) as decripcion_computadora, 
        (SELECT 
        (SELECT CONCAT(estudiantes.nombre_estudiante, ' ', estudiantes.apellido_estudiante) as nombre_estudiante FROM estudiantes WHERE estudiantes.id_estudiante = usuarios.id_estudiante) as nombre_estudiante FROM usuarios WHERE usuarios.id_usuario= registros.id_usuario) as nombre_estudiante,
        CONCAT(docentes.nombre_docente, ' ', docentes.apellido_docente) as nombre_docente,
        materias.nombre_materia
        FROM registros
        INNER JOIN horarios ON registros.id_horario = horarios.id_horario
        INNER JOIN laboratorios ON horarios.id_laboratorio = laboratorios.id_laboratorio
        INNER JOIN computadoras ON registros.id_computadora = computadoras.id_computadora
        INNER JOIN asignacion_materias ON horarios.id_asignacion = asignacion_materias.id_asignacion
        INNER JOIN docentes ON asignacion_materias.id_docente = docentes.id_docente
        INNER JOIN materias ON asignacion_materias.id_materia = materias.id_materia
        INNER JOIN semestres ON horarios.id_semestre = semestres.id_semestre
        INNER JOIN carreras ON semestres.id_carrera = carreras.id_carrera`);
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
        var {id_laboratorio, dia} = request.body

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }
        let sentencia = ""
        if(id_laboratorio != ""){
            sentencia = `${sentencia} AND id_laboratorio = ${id_laboratorio}`
        }

        if(id_laboratorio != ""){
            sentencia = `${sentencia} AND dia = ${dia}`
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM horarios WHERE id_horario != 0 "+sentencia);
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

const filtros = async(request, response) =>{
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

        var {id_laboratorio, fecha_registro, fecha_registro2, dia, id_horario, materia, docente, carrera} = request.body
        let sentencia = ""
        if(id_laboratorio >0){
            sentencia = sentencia + "AND laboratorios.id_laboratorio = "+id_laboratorio
        }

        if((fecha_registro !="")&&(fecha_registro2 === "")){
            sentencia = `${sentencia} AND registros.fecha_registro = '${fecha_registro}'`
        }else if((fecha_registro !="")&&(fecha_registro2 !="")){
            sentencia = `${sentencia} AND registros.fecha_registro >= '${fecha_registro}' AND registros.fecha_registro <= '${fecha_registro2}'`
        }

        if(dia>0){
            sentencia = `${sentencia} AND horarios.dia = ${dia}`
        }

        if(id_horario>0){
            sentencia = `${sentencia} AND registros.id_horario = ${id_horario}`
        }

        if(materia>0){
            sentencia = `${sentencia} AND materias.id_materia = ${materia}`
        }
        if(docente>0){
            sentencia = `${sentencia} AND docentes.id_docente = ${docente}`
        }
        if(carrera>0){
            sentencia = `${sentencia} AND carreras.id_carrera = ${carrera}`
        }
        

        const connection = await getConnection();
        const result = await connection.query(`
        SELECT DISTINCTROW registros.id_registro, registros.id_horario, 
        laboratorios.nombre_laboratorio,
        laboratorios.piso_laboratorio,
        horarios.hora_inicio, horarios.hora_fin, registros.fecha_registro, registros.hora_registro, registros.observaciones, CONCAT(computadoras.tipo_computadora, ' ', computadoras.descripcion_computadora) as decripcion_computadora, 
        (SELECT 
        (SELECT CONCAT(estudiantes.nombre_estudiante, ' ', estudiantes.apellido_estudiante) as nombre_estudiante FROM estudiantes WHERE estudiantes.id_estudiante = usuarios.id_estudiante) as nombre_estudiante FROM usuarios WHERE usuarios.id_usuario= registros.id_usuario) as nombre_estudiante,
        CONCAT(docentes.nombre_docente, ' ', docentes.apellido_docente) as nombre_docente,
        materias.nombre_materia
        FROM registros
        INNER JOIN horarios ON registros.id_horario = horarios.id_horario
        INNER JOIN laboratorios ON horarios.id_laboratorio = laboratorios.id_laboratorio
        INNER JOIN computadoras ON registros.id_computadora = computadoras.id_computadora
        INNER JOIN asignacion_materias ON horarios.id_asignacion = asignacion_materias.id_asignacion
        INNER JOIN docentes ON asignacion_materias.id_docente = docentes.id_docente
        INNER JOIN materias ON asignacion_materias.id_materia = materias.id_materia
        INNER JOIN semestres ON horarios.id_semestre = semestres.id_semestre
        INNER JOIN carreras ON semestres.id_carrera = carreras.id_carrera ${sentencia}
        `);
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
    index,
    obtenerHoras,
    filtros
} 
