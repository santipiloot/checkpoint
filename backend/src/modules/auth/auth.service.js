import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { crearUsuario, obtenerUsuarioPorEmail } from './auth.repository.js';

export const registrarUsuario = async (datos) => {
    const { nombre, email, password, rol } = datos;

    const usuarioExistente = await obtenerUsuarioPorEmail(email);
    if (usuarioExistente) {
        const error = new Error('El usuario ya existe');
        error.status = 400;
        throw error;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const nuevoUsuario = await crearUsuario(nombre, email, passwordHash, rol);
    return {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
    };
};

export const loginUsuario = async (credenciales) => {
    const { email, password } = credenciales;

    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
        const error = new Error('Credenciales inválidas');
        error.status = 401;
        throw error;
    }

    if (usuario.activo === false) {
        const error = new Error('El usuario se encuentra inactivo o ha sido eliminado');
        error.status = 403;
        throw error;
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
        const error = new Error('Credenciales inválidas');
        error.status = 401;
        throw error;
    }

    const payload = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return {
        usuario: payload,
        token
    };
};
