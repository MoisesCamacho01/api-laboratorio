import {getConnection} from "./../database/database";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const verifyToken = (request, response, next)=>{
    const bearerHeader = request.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ");
        if(bearerToken[0] !== 'Bearer'){
            request.token = bearerToken[0];
            next();
        }else{
            request.token = bearerToken[1]
            next();
        }
    }else{
        response.sendStatus(403);
    }
}

const send = async (request, response)=>{
    try {

        var {email} = request.body
        
        const connection = await getConnection();

        const result = await connection.query('SELECT * FROM estudiantes WHERE correo_estudiante = ?',email)

        const usuario = await connection.query('SELECT * FROM usuarios WHERE id_estudiante = ?', result[0].id_estudiante)

        if(usuario.length > 0 ){
            var dataUser = {
                id: usuario[0].id_usuario
            }
            jwt.sign({user: dataUser},'secretKey', (error, token)=>{
                response.json({
                    token,
                    message: "success"
                })
            });
        }else{
            response.json({message: "NO SE HA PODIDO ENVIAR EL EMAIL"})
        }

    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
}

export const methods = {
    verifyToken,
    send
}
