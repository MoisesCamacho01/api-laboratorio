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
        const result = await connection.query("SELECT * FROM computadoras");
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
        const result = await connection.query("SELECT * FROM computadoras WHERE id_computadora = ?", id);
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

        var { tipo_computadora,
            descripcion_computadora,
            fecha_alta_computadora,
            fecha_baja_computadora,
            estado_computadora,
            fecha_compra_computadora,
            costo_computadora,
            id_laboratorio } = request.body;

        if ((tipo_computadora === undefined) ||
            (descripcion_computadora === undefined) ||
            (fecha_alta_computadora === undefined) ||
            (fecha_baja_computadora === undefined) ||
            (fecha_compra_computadora === undefined) ||
            (costo_computadora === undefined) ||
            (id_laboratorio === undefined)
        ) {
            response.json({ message: "Llena todos los campos" })
        }
        // value_computadora = "ni idea"
        const computadora = {
            tipo_computadora,
            descripcion_computadora,
            fecha_alta_computadora,
            fecha_baja_computadora,
            estado_computadora,
            fecha_compra_computadora,
            costo_computadora,
            value_computadora: 'ni idea',
            id_laboratorio
        };

        const connection = await getConnection()
        await connection.query("INSERT INTO computadoras SET ?", computadora);
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

        var { tipo_computadora,
            descripcion_computadora,
            fecha_alta_computadora,
            fecha_baja_computadora,
            estado_computadora,
            fecha_compra_computadora,
            costo_computadora,
            id_laboratorio } = request.body;

        var { id } = request.params
        if ((tipo_computadora === undefined) ||
            (descripcion_computadora === undefined) ||
            (fecha_alta_computadora === undefined) ||
            (fecha_baja_computadora === undefined) ||
            (fecha_compra_computadora === undefined) ||
            (costo_computadora === undefined) ||
            (id_laboratorio === undefined)) {
            response.json({ message: "Llena todos los campos" })
        }
        const computadora = {
            tipo_computadora,
            descripcion_computadora,
            fecha_alta_computadora,
            fecha_baja_computadora,
            estado_computadora,
            fecha_compra_computadora,
            costo_computadora,
            value_computadora,
            id_laboratorio
        };

        const connection = await getConnection()
        const result = await connection.query("UPDATE computadoras SET ? WHERE id_computadora = ?", [computadora, id])
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
        const result = await connection.query("DELETE FROM computadoras WHERE id_computadora = ?", id)
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