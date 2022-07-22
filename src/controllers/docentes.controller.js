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
        // response.json(token)

        if (token === undefined) {
            response.json({ message: "A ocurrido un pequeño problema" })
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM docentes");
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
        const result = await connection.query("SELECT * FROM docentes WHERE id_docente = ?", id);
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
            response.status(400).json({ message: "A ocurrido un pequeño problema" })
        }

        var { identificacion_docente,
            correo_docente,
            nombre_docente,
            apellido_docente,
            titulo_academico_docente } = request.body;

        if ((identificacion_docente === undefined) ||
            (correo_docente === undefined) ||
            (nombre_docente === undefined) ||
            (apellido_docente === undefined) ||
            (titulo_academico_docente === undefined)) {
            response.json({ message: "Llena todos los campos" })
        }
        const docente = {
            identificacion_docente,
            correo_docente,
            nombre_docente,
            apellido_docente,
            titulo_academico_docente
        };

        const connection = await getConnection()
        await connection.query("INSERT INTO docentes SET ?", docente);
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

        var { identificacion_docente, nombre_docente, apellido_docente, titulo_academico_docente, correo_docente} = request.body;
        var { id } = request.params
        if ((identificacion_docente === undefined) ||
            (correo_docente === undefined) ||
            (nombre_docente === undefined) ||
            (apellido_docente === undefined) ||
            (titulo_academico_docente === undefined)) {
            response.json({ message: "Llena todos los campos" })
        }
        const docente = {
            identificacion_docente,
            correo_docente,
            nombre_docente,
            apellido_docente,
            titulo_academico_docente
        };

        const connection = await getConnection()
        const result = await connection.query("UPDATE docentes SET ? WHERE id_docente = ?", [docente, id])
        if (result.affectedRows !== 0) {
            response.json({ message: "success" })
        } else {
            response.json({ message: "No se pudo actualizar" })
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
        const result = await connection.query("DELETE FROM docentes WHERE id_docente = ?", id)
        if (result.affectedRows !== 0) {
            response.json({ message: "success" })
        } else {
            response.json({ message: "No se puede eliminar" })
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