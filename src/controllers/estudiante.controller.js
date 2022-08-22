import { getConnection } from "./../database/database";
import jwt from "jsonwebtoken";

const encontrarEstudiante = async (request, response) => {
    try {
        const identificacion_estudiante = request.body.identificacion_estudiante;
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM estudiantes WHERE identificacion_estudiante=?', identificacion_estudiante);

        if (typeof result[0] !== 'undefined') {
            var $data = {
                nombre: result[0].nombre_estudiante,
                apellido: result[0].apellido_estudiante,
                email: result[0].correo_estudiante,
                message: "success"
            };
            response.json($data);
        } else {
            response.json({ message: "Usuario no encontrado" })
        }

    } catch (error) {
        response.json({ message: "A ocurrido un problema con tu petición, parece que el servidor no responde inténtalo mas tarde (" + error.message + ")" })
    }
}

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
        const result = await connection.query("SELECT estudiantes.id_estudiante, estudiantes.identificacion_estudiante, estudiantes.correo_estudiante, estudiantes.nombre_estudiante, estudiantes.apellido_estudiante, (SELECT carreras.nombre_carrera FROM carreras WHERE carreras.id_carrera = estudiantes.id_carrera) as id_carrera FROM estudiantes");
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
        const result = await connection.query(`SELECT estudiantes.id_estudiante, estudiantes.identificacion_estudiante, estudiantes.correo_estudiante, estudiantes.nombre_estudiante, estudiantes.apellido_estudiante, (SELECT carreras.nombre_carrera FROM carreras WHERE carreras.id_carrera = estudiantes.id_carrera) as id_carrera, (SELECT carreras.id_carrera FROM carreras WHERE carreras.id_carrera = estudiantes.id_carrera) as idC FROM estudiantes WHERE id_estudiante = ?`, id);
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

        var { identificacion_estudiante,
            correo_estudiante,
            nombre_estudiante,
            apellido_estudiante,
            id_carrera } = request.body;

        if ((identificacion_estudiante === undefined) ||
            (correo_estudiante === undefined) ||
            (nombre_estudiante === undefined) ||
            (apellido_estudiante === undefined) ||
            (id_carrera === undefined)) {
            response.json({ message: "Llena todos los campos" })
        }
        const estudiante = {
            identificacion_estudiante,
            correo_estudiante,
            nombre_estudiante,
            apellido_estudiante,
            id_carrera
        };

        const connection = await getConnection()
        await connection.query("INSERT INTO estudiantes SET ?", estudiante);
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

        var { id } = request.params
        var { identificacion_estudiante,
            correo_estudiante,
            nombre_estudiante,
            apellido_estudiante,
            id_carrera } = request.body;

        if ((identificacion_estudiante === undefined) ||
            (correo_estudiante === undefined) ||
            (nombre_estudiante === undefined) ||
            (apellido_estudiante === undefined) ||
            (id_carrera === undefined)) {
            response.json({ message: "Llena todos los campos" })
        }

        const estudiante = {
            identificacion_estudiante,
            correo_estudiante,
            nombre_estudiante,
            apellido_estudiante,
            id_carrera
        };

        const connection = await getConnection()
        const result = await connection.query("UPDATE estudiantes SET ? WHERE id_estudiante = ?", [estudiante, id])
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
        const result = await connection.query("DELETE FROM estudiantes WHERE id_estudiante = ?", id)
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
    encontrarEstudiante,
    index,
    registrar,
    actualizar,
    eliminar,
    getOne
}