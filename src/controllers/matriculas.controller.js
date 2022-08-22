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

        var {id} = request.params

        const connection = await getConnection();
        const result = await connection.query("SELECT matriculas.tipo_matricula, matriculas.id_estudiante, matriculas.id_semestre, (SELECT semestres.nombre_semestre FROM semestres WHERE semestres.id_semestre = matriculas.id_semestre) as nombre_semestre  FROM matriculas WHERE id_estudiante = ? GROUP BY id_semestre;", id);
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

const getAsignadas = async(request, response) =>{
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
        var {id, idSemestre} = request.params

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }
        // let sql = "SELECT * FROM matriculas WHERE id_estudiante = "+id+" AND id_semestre = "+idSemestre+""
        // response.send(sql);
        const connection = await getConnection();
        const result = await connection.query("SELECT *, (SELECT (SELECT materias.nombre_materia FROM materias WHERE materias.id_materia = asignacion_materias.id_materia) as nombre_materia FROM asignacion_materias WHERE asignacion_materias.id_asignacion = matriculas.id_asignacion ) as nombre_materia FROM matriculas WHERE id_estudiante = ? AND id_semestre = ?", [id, idSemestre]);
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

        var {tipo_matricula, id_estudiante, id_semestre, id_asignacion} = request.body;
        if((tipo_matricula === undefined) ||
         (id_estudiante === undefined) ||
         (id_semestre === undefined) ||
         (id_asignacion === undefined)){
            response.json({message: "Llena todos los campos"})
        }
        const matriculas = {
            tipo_matricula,
            id_estudiante,
            id_semestre,
            id_asignacion,
        };
        
        const connection = await getConnection()
        await connection.query("INSERT INTO matriculas SET ?", matriculas);
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

        var {tipo_matricula, id_asignacion, id_estudiante, id_semestre} = request.body;
        var {id} = request.params
        if((nombre_materia === undefined) || (cantidad_horas_materia === undefined)){
            response.json({message: "Llena todos los campos"})
        }
        const matriculas = {
            tipo_matricula,
            id_estudiante,
            id_semestre,
            id_asignacion,
        };

        const connection = await getConnection()
        const result = await connection.query("UPDATE matriculas SET ? WHERE id_matricula = ?", [matriculas, id])
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
        const result = await connection.query("DELETE FROM matriculas WHERE id_matricula = ?", id)
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
    getAsignadas
};