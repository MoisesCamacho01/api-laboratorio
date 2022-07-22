import { getConnection } from './../database/database';
import jwt from "jsonwebtoken";

const index = async (request, response) => {
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) => {
            if (error) {
                response.json(error.message)
            } else {
                userID = dataUser.user.id;
            }
        })
        var token = request.token;

        if (token === undefined) {
            response.json({ message: "A ocurrido un pequeño problema" })
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM laboratorios");
        // response.send("DIMENCION"+result.length)
        if (result.length > 0) {
            response.json({
                data: result,
                message: 'success'
            })
        } else {
            response.json({ message: 'No podemos obtener información' })
        }
    } catch (error) {
        response.json({ message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde (" + error.message + ")" })
    }
}

const getOne = async (request, response) => {
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) => {
            if (error) {
                response.json(error.message)
            } else {
                userID = dataUser.user.id;
            }
        })
        var token = request.token;
        var { id } = request.params
        // response.json(token)

        if (token === undefined) {
            response.json({ message: "A ocurrido un pequeño problema" })
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM laboratorios WHERE id_laboratorio = ?", id);
        // response.send("DIMENCION"+result.length)
        if (result.length > 0) {
            response.json({
                data: result,
                message: 'success'
            })
        } else {
            response.json({ message: 'No podemos obtener información' })
        }
    } catch (error) {
        response.json({ message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde (" + error.message + ")" })
    }
}

const registrar = async (request, response) => {
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) => {
            if (error) {
                response.json(error.message)
            } else {
                userID = dataUser.user.id;
            }
        })
        var token = request.token;

        if (token === undefined) {
            response.json({ message: "A ocurrido un pequeño problema" })
        }

        var { nombre_laboratorio, piso_laboratorio } = request.body;
        if ((nombre_laboratorio === undefined) || (piso_laboratorio === undefined)) {
            response.json({ message: "Llena todos los campos" })
        }
        const carrera = {
            nombre_laboratorio,
            piso_laboratorio
        };

        const connection = await getConnection()
        await connection.query("INSERT INTO laboratorios SET ?", carrera);
        response.json({ message: "success" });

    } catch (error) {
        response.json({ message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde (" + error.message + ")" })
    }
}

const actualizar = async (request, response) => {
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) => {
            if (error) {
                response.json(error.message)
            } else {
                userID = dataUser.user.id;
            }
        })
        var token = request.token;

        if (token === undefined) {
            response.json({ message: "A ocurrido un pequeño problema" })
        }

        var { nombre_laboratorio, piso_laboratorio } = request.body;
        var { id } = request.params
        if ((nombre_laboratorio === undefined) || (piso_laboratorio === undefined)) {
            response.json({ message: "Llena todos los campos" })
        }
        const carrera = {
            nombre_laboratorio,
            piso_laboratorio
        };

        const connection = await getConnection()
        const result = await connection.query("UPDATE laboratorios SET ? WHERE id_laboratorio = ?", [carrera, id])
        if (result.affectedRows !== 0) {
            response.json({ message: "success" })
        } else {
            response.json({ message: "No usar contraseñas anteriores" })
        }

    } catch (error) {
        response.json({ message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde (" + error.message + ")" })
    }
}

const eliminar = async (request, response) => {
    try {
        var userID = 0;
        jwt.verify(request.token, 'secretKey', (error, dataUser) => {
            if (error) {
                response.json(error.message)
            } else {
                userID = dataUser.user.id;
            }
        })
        var token = request.token;

        if (token === undefined) {
            response.json({ message: "A ocurrido un pequeño problema" })
        }

        var { id } = request.params

        const connection = await getConnection()
        const result = await connection.query("DELETE FROM laboratorios WHERE id_laboratorio = ?", id)
        
        if (result.affectedRows !== 0) {
            response.json({ message: "success" })
        } else {
            response.json({ message: "No usar contraseñas anteriores" })
        }

    } catch (error) {
        response.json({ message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde (" + error.message + ")" })
    }
}

export const methods = {
    index,
    registrar,
    actualizar,
    eliminar,
    getOne
};