import {getConnection} from "./../database/database";
import jwt from "jsonwebtoken";

const encontrarEstudiante = async (request, response)=>{
    try {
        const identificacion_estudiante = request.body.identificacion_estudiante;
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM estudiantes WHERE identificacion_estudiante=?', identificacion_estudiante);

        if(typeof result[0] !== 'undefined'){
            var $data = {
                nombre: result[0].nombre_estudiante,
                apellido: result[0].apellido_estudiante,
                email: result[0].correo_estudiante,
                message:"success"
            };
            response.json($data);
        }else{
            response.json({message: "Usuario no encontrado"})
        }
        
    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

export const methods = {
    encontrarEstudiante
}