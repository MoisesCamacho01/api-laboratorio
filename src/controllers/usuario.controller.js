import {getConnection} from "./../database/database";
import jwt from "jsonwebtoken";
import { request, response } from "express";

const login = async (request, response)=>{
    var {usuario, password} = request.body;

    if(usuario === undefined || password === undefined){
        response.status(400).json({message: "Llena todas las credenciales"})
    }

    try {
        var connection = await getConnection();
        var result = await connection.query("SELECT usuarios.id_usuario, estudiantes.identificacion_estudiante, estudiantes.correo_estudiante, usuarios.password_usuario, usuarios.tipo_usuario FROM `estudiantes`, usuarios WHERE usuarios.password_usuario = '"+password+"' AND (estudiantes.identificacion_estudiante = '"+usuario+"' OR estudiantes.correo_estudiante = '"+usuario+"') AND estudiantes.id_estudiante = usuarios.id_estudiante");
        if(result.length > 0){
            var dataUser = {
                id: result[0].id_usuario
            }
            jwt.sign({user: dataUser},'secretKey', (error, token)=>{
                response.json({
                    token,
                    message: "success"
                })
            });
        }else{
            response.json({message:"Error en tus credenciales de acceso"});
        }
    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
        
}

const logout = async (request,response) =>{
    jwt.verify(request.token, 'secretKey', (error, dataUser) =>{
        if(error){
            response.json({message: error.message});
        }else{
            response.json({message: "success"})
        }
    });
}

const password = async (request, response)=>{
    var userID = 0;
    jwt.verify(request.token, 'secretKey', (error, dataUser) =>{
        if(error){
            response.json(error.message)
        }else{
            userID = dataUser.user.id;
        }
    })

    var {password} = request.body;
    var token = request.token;
    if(password === undefined || token === undefined){
        response.json({message: "Llena todas los datos"})
    }
    try {
        const connection = await getConnection();

        const result = await connection.query("UPDATE usuarios SET password_usuario=? WHERE id_usuario = ?", [password, userID]);
		if(result.changedRows !== 0){
			response.json({message: "success"})
		}else{
			response.json({message: "No usar contraseñas anteriores"})
		}
    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}

// INSERTAR USUARIOS

const insertar = async(request, response)=>{
	try {

		const { 
			identificacion_usuario, 
			nombre_usuario, 
			apellido_usuario,
			correo_usuario,
			password_usuario
		} = request.body;
	
		if (identificacion_usuario === undefined || 
			nombre_usuario === undefined ||
			apellido_usuario === undefined ||
			correo_usuario === undefined ||
			password_usuario === undefined
		) {
			response.json({ message: "Llena todos los campos." });
		}

		var tipo_usuario = "estudiante";
		var celular_usuario = '0';
        var fecha_baja = '';

        

        //INDENFICAR 
        const connection = await getConnection();
        const result = await connection.query('SELECT id_estudiante FROM estudiantes WHERE identificacion_estudiante=? OR correo_estudiante=?', [identificacion_usuario, correo_usuario]);

        if(typeof result[0] !== 'undefined'){
            const idUser = result[0].id_estudiante;
            const result2 = await connection.query('SELECT id_estudiante FROM usuarios WHERE id_estudiante=?', idUser);
            if(typeof result2[0] === 'undefined'){
                var id_estudiante = idUser;
                const usuario = {
                    id_estudiante,
                    tipo_usuario,
                    password_usuario,
                    celular_usuario,
                    fecha_baja
                };
                await connection.query("INSERT INTO usuarios SET ?", usuario);
                response.json({ message: "success" });
            }else{
                response.json({message: "El estudiante ya se encuentra registrado"});
            }
        }else{
            response.json({message: "El estudiante no se encuentra"});
        }

    } catch (error) {
        response.json({message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde ("+error.message+")"})
    }
}


export const methods = {
    login,
    logout,
    password,
	insertar
}