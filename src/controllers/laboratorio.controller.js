import {getConnection} from "./../database/database";
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
        var {fecha, hora} = request.body;
        if((token === undefined) || (fecha === undefined) || (hora === undefined)){
            response.json({message: "A ocurrido un problema"});
        };

        const connection = await getConnection();
        const result = await connection.query("SELECT id_estudiante FROM usuarios WHERE id_usuario=?", userID);

        if(typeof result[0] !== 'undefined'){
            const result = await connection.query(`
            SELECT matriculas.id_estudiante, matriculas.id_asignacion, (SELECT horarios.id_horario FROM horarios WHERE horarios.id_asignacion = matriculas.id_asignacion AND horarios.fecha = '${fecha}' AND horarios.hora_inicio <= '${hora}' AND horarios.hora_fin > '${hora}' ) as id_horario
            FROM matriculas WHERE matriculas.id_estudiante = ${userID}`);
            
            if(typeof result[0] !== 'undefined'){
                var id_horario = result[0].id_horario;

                const computadoras = await connection.query(`
                SELECT computadoras.id_computadora, computadoras.tipo_computadora, computadoras.descripcion_computadora,
                computadoras.estado_computadora, computadoras.id_laboratorio
                FROM computadoras
                WHERE computadoras.id_computadora 
                NOT IN (SELECT registros.id_computadora FROM registros WHERE registros.id_horario = ${id_horario});
                `);

                response.json(computadoras);

            }else{
                response.json({message: "A ocurrido un problema"});
            }
        }else{
            response.json({message: "A ocurrido un problema"});
        }

    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

export const methods = {
    computadorasDisponibles
}