import {getConnection} from './../database/database';
import jwt from "jsonwebtoken";

const materiaDocente = async(request, response) =>{
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

        const connection = await getConnection();
        const result = await connection.query("SELECT *, (SELECT materias.nombre_materia FROM materias WHERE materias.id_materia = asignacion_materias.id_materia) as nombre_materia, (SELECT CONCAT(docentes.nombre_docente,' ',docentes.apellido_docente) as nombre_docente FROM docentes WHERE docentes.id_docente = asignacion_materias.id_docente) as nombre_docente FROM asignacion_materias");
        // response.send(result)
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
    materiaDocente
};