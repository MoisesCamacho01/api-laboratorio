import {getConnection} from "../database/database";
import jwt from "jsonwebtoken";

const computadorasDisponibles = async (request, response)=>{
    var userID = 0;
    jwt.verify(request.token, 'secretKey', (error, dataUser) =>{
        if(error){
            response.json(error.message)
        }else{
            userID = dataUser.user.id; //USUARIOS
        }
    })

    try {
        var token = request.token;
        var {dia, hora, fecha} = request.body;
        if((token === undefined) || (fecha === undefined) || (dia === undefined) || (hora === undefined)){
            response.json({message: "A ocurrido un problema"});
        };

        const connection = await getConnection();
        const result = await connection.query("SELECT id_estudiante FROM usuarios WHERE id_usuario=?", userID);

        if(typeof result[0] !== 'undefined'){
            const result = await connection.query(`SELECT horarios.id_horario, computadoras.id_computadora, computadoras.descripcion_computadora, computadoras.tipo_computadora, computadoras.estado_computadora, laboratorios.id_laboratorio FROM usuarios INNER JOIN estudiantes ON usuarios.id_estudiante = estudiantes.id_estudiante INNER JOIN matriculas ON estudiantes.id_estudiante = matriculas.id_estudiante INNER JOIN asignacion_materias ON matriculas.id_asignacion = asignacion_materias.id_asignacion INNER JOIN horarios ON asignacion_materias.id_asignacion = horarios.id_asignacion INNER JOIN laboratorios ON horarios.id_laboratorio = laboratorios.id_laboratorio INNER JOIN computadoras ON laboratorios.id_laboratorio = computadoras.id_laboratorio AND (horarios.hora_inicio <= '${hora}' AND horarios.hora_fin >'${hora}') AND dia = ${dia} AND usuarios.id_usuario = ${userID}`);

            // INVALIDO
            let datosComputadora = [];

            result.forEach(row => {
                let anidado = {
                    "id_computadora": row.id_computadora,
                    "tipo_computadora": row.tipo_computadora,
                    "descripcion_computadora": row.descripcion_computadora,
                    "estado_computadora": row.estado_computadora,
                    "id_laboratorio": row.id_laboratorio,
                    "id_usuario": userID,
                    "id_horario": row.id_horario,
                    "fecha_registro": fecha,
                    "hora_registro": hora
                }
                datosComputadora.push(anidado)
            });        

            response.json({
                data : datosComputadora,
                message : "success"
            });

        }else{
            response.json({message: "A ocurrido un problema"});
        }

    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

const registro = async(request, response) => {
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) => {
            if (error) {
                response.json(error.message)
            } else {
                userID = dataUser.user.id;
            }
        })
        var token = request.token;

        var {id_usuario, fecha_registro, id_horario, hora_registro, id_computadora, observaciones} = request.body;
        if((id_usuario === undefined) || (id_horario === undefined) || (fecha_registro === undefined) || (hora_registro === undefined)
        || (id_computadora === undefined) || observaciones === undefined ){
            response.json({message: "A ocurrido un problema"});
        };
         
        const usuario = {
            id_horario,
            fecha_registro,
            hora_registro,
            observaciones,
            id_usuario,
            id_computadora
        };
        const connection = await getConnection();
        await connection.query("INSERT INTO registros SET ?", usuario);
        response.json({token:"0", message: "success" });

    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

const hay = async(request, response) =>{
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
        const result = await connection.query("SELECT registros.fecha_registro, registros.hora_registro, (SELECT horarios.hora_inicio FROM horarios WHERE horarios.id_horario = registros.id_horario) AS hora_inicio, (SELECT horarios.hora_fin FROM horarios WHERE horarios.id_horario = registros.id_horario) AS hora_fin FROM `registros`WHERE id_usuario = ? order by id_registro DESC LIMIT 1", userID);
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

const historial = async(request, response) =>{
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
        const result = await connection.query("SELECT registros.id_registro, (SELECT horarios.hora_inicio FROM horarios WHERE horarios.id_horario = registros.id_horario) as hora_inicio, (SELECT horarios.hora_fin FROM horarios WHERE horarios.id_horario = registros.id_horario) as hora_fin, registros.fecha_registro, registros.hora_registro, registros.observaciones, (SELECT computadoras.tipo_computadora FROM computadoras WHERE computadoras.id_computadora = registros.id_computadora) as tipo_computadora FROM registros WHERE registros.id_usuario = ?", userID);
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
    computadorasDisponibles,
    registro,
    hay,
    historial,
}