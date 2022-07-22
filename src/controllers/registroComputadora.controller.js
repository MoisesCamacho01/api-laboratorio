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
                
                if(id_horario != null){
                    const computadoras = await connection.query(`
                    SELECT computadoras.id_computadora, computadoras.tipo_computadora, computadoras.descripcion_computadora,
                    computadoras.estado_computadora, computadoras.id_laboratorio
                    FROM computadoras
                    WHERE computadoras.ihod_computadora 
                    NOT IN (SELECT registros.id_computadora FROM registros WHERE registros.id_horario = ${id_horario});
                    `);

                    /*
                    id_registro = auto
                    id_horario
                    fecha_registro
                    hora_registro
                    observaciones
                    id_usuario
                    id_computadora
                    */

                    let datosComputadora = [];

                    computadoras.forEach(row => {
                        let anidado = {
                            "id_computadora": 1,
                            "tipo_computadora": "dell",
                            "descripcion_computadora": "Nueva",
                            "estado_computadora": "Buena",
                            "id_laboratorio": 1,
                            "id_usuario": userID,
                            "id_horario": id_horario,
                            "fecha_registro": fecha,
                            "hora_registro": hora
                        }
                        datosComputadora.push(anidado)
                    });

                    response.json(datosComputadora);
                }else{
                    response.json({message: "No se ha encontrado computadoras disponibles"})
                }
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


const registro = async(request, response) => {
    try {
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

export const methods = {
    computadorasDisponibles,
    registro
}