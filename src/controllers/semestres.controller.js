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

        if(token === undefined){
            response.json({message: "A ocurrido un pequeño problema"})
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM semestres");
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
        const result = await connection.query("SELECT * FROM semestres WHERE id_semestre = ?", id);
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

        var {codigo_semestre, nombre_semestre, paralelo_semestre, id_carrera} = request.body;
        if((nombre_semestre === undefined) ||
         (codigo_semestre === undefined)||
         (paralelo_semestre === undefined)||
         (id_carrera === undefined)){
            response.json({message: "Llena todos los campos"})
        }
        const semestres = {
            codigo_semestre,
            nombre_semestre,
            paralelo_semestre,
            id_carrera,
        };

        const connection = await getConnection()
        await connection.query("INSERT INTO semestres SET ?", semestres);
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

        var {nombre_semestre, codigo_semestre, paralelo_semestre, id_carrera} = request.body;
        var {id} = request.params
        if((codigo_semestre === undefined) ||
         (nombre_semestre === undefined) || 
         (paralelo_semestre === undefined) || 
         (id_carrera === undefined)
         ){
            response.json({message: "Llena todos los campos"})
        }
        const semestre = {
            codigo_semestre,
            nombre_semestre,
            paralelo_semestre,
            id_carrera,
        };

        const connection = await getConnection()
        const result = await connection.query("UPDATE semestres SET ? WHERE id_materia = ?", [semestre, id])
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
        const result = await connection.query("DELETE FROM semestres WHERE id_semestre = ?", id)
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