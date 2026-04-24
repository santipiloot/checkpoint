export const transformarTendencia = (data) => {
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
    if (curr.tipo === "salida") acc[fecha].salida += cantidad;
    if (curr.tipo === "ajuste") acc[fecha].ajuste += cantidad;

    return acc;
  }, {});

  return Object.values(agrupado);
};

export const transformarPie = (data) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item) => ({
    name: item.motivo.toUpperCase(),
    value: parseInt(item.total_movimientos),
  }));
};
