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
        const result = await connection.query("SELECT * FROM horarios");
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

        var {id_laboratorio, id_semestre, hora_inicio, hora_fin, id_asignacion, fecha} = request.body;
        if((hora_inicio === undefined) || 
        (hora_fin === undefined) ||
        (fecha === undefined) ||
        (id_laboratorio === undefined)||
        (id_semestre === undefined)||
        (id_asignacion === undefined)
        ){
            response.json({message: "Llena todos los campos"})
        }
        const hora = {
            hora_inicio,
            hora_fin,
            fecha,
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

        var {id_laboratorio, id_semestre, hora_inicio, hora_fin, id_asignacion, fecha} = request.body;
        var {id} = request.params
        if((id_laboratorio === undefined) || 
        (id_semestre === undefined) ||
        (id_asignacion === undefined) ||
        (hora_fin === undefined) ||
        (hora_inicio === undefined) ||
        (fecha === undefined)
        ){
            response.json({message: "Llena todos los campos"})
        }
        const hora = {
            hora_inicio,
            hora_fin,
            fecha,
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
    getOne
};