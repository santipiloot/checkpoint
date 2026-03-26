export const plantillaMensaje = (productos) => {
    let mensaje = "⚠️ *ALERTA DE STOCK CRÍTICO* ⚠️\n\n";
    mensaje += "Los siguientes productos están por debajo del stock mínimo:\n\n";

    productos.forEach(p => {
        mensaje += `• *${p.nombre}*\n`;
        mensaje += `  - Stock actual: ${p.stock}\n`;
        mensaje += `  - Stock mínimo: ${p.stock_minimo}\n\n`;
    });

    mensaje += "📢 Por favor, reponer el stock lo antes posible.";
    return mensaje;
}