import {getConnection} from './../database/database';
import jwt from "jsonwebtoken";

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
        const result = await connection.query(`SELECT horarios.id_horario, horarios.hora_inicio, horarios.hora_fin, horarios.dia, 
        (SELECT (SELECT CONCAT(docentes.nombre_docente, ' ', docentes.apellido_docente) FROM docentes WHERE docentes.id_docente = asignacion_materias.id_docente) FROM asignacion_materias WHERE asignacion_materias.id_asignacion = horarios.id_asignacion) as nombre_docente,
        (SELECT laboratorios.nombre_laboratorio FROM laboratorios WHERE laboratorios.id_laboratorio = horarios.id_laboratorio) as nombre_laboratorio,
        (SELECT semestres.nombre_semestre FROM semestres WHERE semestres.id_semestre = horarios.id_semestre) as nombre_semestre
        FROM horarios`);
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

const getOne = async(request, response) =>{
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
        const result = await connection.query("SELECT * FROM horarios WHERE id_horario = ?", id);
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

const registrar = async(request, response)=>{
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

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }

        var {id_laboratorio, id_semestre, hora_inicio, hora_fin, id_asignacion, dia} = request.body;
        if((hora_inicio === undefined) || 
        (hora_fin === undefined) ||
        (dia === undefined) ||
        (id_laboratorio === undefined)||
        (id_semestre === undefined)||
        (id_asignacion === undefined)
        ){
            response.json({message: "Llena todos los campos"})
        }
        const hora = {
            hora_inicio,
            hora_fin,
            dia,
            id_laboratorio,
            id_asignacion,
            id_semestre
        };

        const connection = await getConnection()
        await connection.query("INSERT INTO horarios SET ?", hora);
        response.json({ message: "success" });

    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

const actualizar = async (request, response)=>{
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

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }

        var {id_laboratorio, id_semestre, hora_inicio, hora_fin, id_asignacion, dia} = request.body;
        var {id} = request.params
        if((id_laboratorio === undefined) || 
        (id_semestre === undefined) ||
        (id_asignacion === undefined) ||
        (hora_fin === undefined) ||
        (hora_inicio === undefined) ||
        (dia === undefined)
        ){
            response.json({message: "Llena todos los campos"})
        }
        const hora = {
            hora_inicio,
            hora_fin,
            dia,
            id_laboratorio,
            id_asignacion,
            id_semestre
        };

        const connection = await getConnection()
        const result = await connection.query("UPDATE horarios SET ? WHERE id_horario = ?", [hora, id])
        if(result.affectedRows !== 0){
			response.json({message: "success"})
		}else{
			response.json({message: "No usar contraseñas anteriores"})
		}

    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

const eliminar = async (request, response)=>{
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

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }

        var {id} = request.params

        const connection = await getConnection()
        const result = await connection.query("DELETE FROM horarios WHERE id_horario = ?", id)
        if(result.affectedRows !== 0){
			response.json({message: "success"})
		}else{
			response.json({message: "No usar contraseñas anteriores"})
		}

    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }

}



export const methods = {
    index,
    registrar,
    actualizar,
    eliminar,
    getOne,
};