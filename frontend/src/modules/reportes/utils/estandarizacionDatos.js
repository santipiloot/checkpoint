export const transformarTendencia = (data) => {
  console.log(`Transformar tendencia: ${data}`);
  if (!data || !Array.isArray(data)) return [];

  const agrupado = data.reduce((acc, curr) => {
    const fecha = new Date(curr.fecha).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
    });

    if (!acc[fecha]) {
      acc[fecha] = { fecha, entrada: 0, salida: 0, ajuste: 0 };
    }

    const cantidad = parseInt(curr.total_unidades);
    if (curr.tipo === "entrada") acc[fecha].entrada += cantidad;
    if (curr.tipo === "salida") acc[fecha].salida += Math.abs(cantidad);
    if (curr.tipo === "ajuste") acc[fecha].ajuste += Math.abs(cantidad);

    return acc;
  }, {});

  return Object.values(agrupado);
};

const ETIQUETAS_MOVIMIENTO = {
  "entrada+compra": "Compra",
  "entrada+devolucion": "Dev. de Cliente",
  "salida+venta": "Venta",
  "salida+devolucion": "Dev. a Proveedor",
  "ajuste+robo": "Robo",
  "ajuste+daño": "Daño",
  "ajuste+correccion": "Corrección",
};

export const transformarPie = (data) => {
  console.log(`Transformar pie: ${data}`);
  if (!data || !Array.isArray(data)) return [];
  return data.map((item) => {
    const clave = `${item.tipo}+${item.motivo}`;
    return {
      name: ETIQUETAS_MOVIMIENTO[clave] || `${item.tipo}: ${item.motivo}`,
      value: parseInt(item.total_movimientos),
    };
  });
};
