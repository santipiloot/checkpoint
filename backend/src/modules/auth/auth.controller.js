import * as authService from './auth.service.js';

export const register = async (req, res, next) => {
    try {
        const nuevoUsuario = await authService.registrarUsuario(req.body);
        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            usuario: nuevoUsuario
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const resultado = await authService.loginUsuario(req.body);
        res.json({
            success: true,
            message: 'Login exitoso',
            ...resultado
        });
    } catch (error) {
        next(error);
    }
};
