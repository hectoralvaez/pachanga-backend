const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generarJWT } = require("../helpers/jwt");

const crearUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe",
            });
        }

        user = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generar JWT
        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en crearUser. Por favor hable con el administrador",
        });
    }
};

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El user no existe con ese email",
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrecto",
            });
        }

        // Generar JWT
        const token = await generarJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en loginUser. Por favor hable con el administrador",
        });
    }
};

const obtenerUsuarios = async (req, res = response) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const usuarios = await User.find();

        // Convertir cada usuario a objeto y eliminar la contraseña
        const usuariosSinPassword = usuarios.map((user) => {
            const userData = user.toObject();
            delete userData.password; // Eliminar el campo de contraseña
            return userData;
        });

        // Retornar la lista de usuarios (sin la contraseña)
        res.status(200).json({
            ok: true,
            users: usuariosSinPassword,
        });
    } catch (error) {
        console.error('Error en obtenerUsuarios:', error.message);
        console.error('Detalles:', error);
        res.status(500).json({
            ok: false,
            msg: "Error en obtenerUsuarios. Por favor hable con el administrador",
        });
    }
};


const obtenerUser = async (req, res = response) => {
    const { id } = req.params; // Asumimos que el ID se recibe como parámetro en la URL

    try {
        // Buscar el usuario por ID en la base de datos
        const user = await User.findById(id);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }

        // Convertir el usuario a un objeto para manipularlo
        const userData = user.toObject();
        delete userData.password; // Eliminar la contraseña para que no la muestre por seguridad

        // Retornar toda la información del usuario (sin la contraseña)
        res.status(200).json({
            ok: true,
            user: userData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en obtenerUser. Por favor hable con el administrador",
        });
    }
};

const revalidarToken = async (req, res = response) => {
    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token,
    });
};

module.exports = {
    crearUser,
    loginUser,
    obtenerUser,
    obtenerUsuarios,
    revalidarToken,
};
