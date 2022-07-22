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
        const result = await connection.query("SELECT *, (SELECT computadoras.tipo_computadora FROM computadoras WHERE computadoras.id_laboratorio = 1 AND computadoras.id_computadora = registros.id_computadora) as tipo_computadora, (SELECT horarios.hora_inicio FROM horarios WHERE horarios.id_horario = registros.id_horario) as hora_inicio, (SELECT horarios.hora_fin FROM horarios WHERE horarios.id_horario = registros.id_horario) as hora_fin FROM registros", id);
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
        const result = await connection.query("SELECT *, (SELECT computadoras.tipo_computadora FROM computadoras WHERE computadoras.id_laboratorio = 1 AND computadoras.id_computadora = registros.id_computadora) as tipo_computadora, (SELECT horarios.hora_inicio FROM horarios WHERE horarios.id_horario = registros.id_horario) as hora_inicio, (SELECT horarios.hora_fin FROM horarios WHERE horarios.id_horario = registros.id_horario) as hora_fin FROM registros", id);
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
    index
} 
