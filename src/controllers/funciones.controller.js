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
        const {usuario} = request.body;
        if(usuario === undefined ){
            response.status(400).json({message: "Llena todas las credenciales"})
        }
        const connection = await getConnection();
        const result = await connection.query('SELECT correo_usuario FROM usuarios WHERE correo_usuario=?', usuario);
        if(result[0].correo_usuario !== ""){
            
            const dataUser = {
                email: result[0].correo_usuario
            }
            // jwt.sign({user: dataUser},'secretKey', (error, token)=>{
                
            // });
            // const transporter = nodemailer.createTransport({
            //     pool: true,
            //     host: "mail.wfss-ec.com",
            //     port: 465,
            //     secure: false,
            //     auth:{
            //         user: 'apiemails@wfss-ec.com',
            //         pass: 'P5wLvK01qCSn'
            //     },
            //     tls:{
            //         rejectUnauthorized: false
            //     }
            // });


            // const info = await transporter.sendMail({
            //     from:"API SERVER",
            //     to: "egcgion15@gmail.com",
            //     subject: "Api",
            //     text: "Enviado",
            // })

            // console.log('message '+ info.messageId);

            response.send("Enviado");
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
