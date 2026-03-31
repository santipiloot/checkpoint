const calcularROP = (consumoDiario, cobertura, factorSeguridad) => {
    if (consumoDiario === undefined || cobertura === undefined || factorSeguridad === undefined) {
        const error = new Error("Faltan datos para calcular el ROP");
        error.status = 400;
        throw error;
    }
    if (consumoDiario <= 0 || cobertura <= 0 || factorSeguridad < 0) {
        const error = new Error("Faltan datos para calcular el ROP");
        error.status = 400;
        throw error;
    }

    const rop = Math.ceil((consumoDiario * cobertura) * (1 + factorSeguridad));
    return rop;
}

export default calcularROP;