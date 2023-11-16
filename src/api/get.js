import { sql } from "@vercel/postgres";

export async function getEspecialidades() {
  try {
    const obrasocial = await sql`SELECT * FROM especialidades`;

    const obrasSocialesTransformadas = obrasocial.rows.map((item) => ({
      value: item.id,
      label: item.descripcion,
    }));

    return obrasSocialesTransformadas;
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error("Error al obtener las especialidades");
  }
}

export async function getObrasSociales() {
  try {
    const obrasocial = await sql`SELECT * FROM obras_sociales`;

    // Transformar los resultados
    const obrasSocialesTransformadas = obrasocial.rows.map((item) => ({
      value: item.id,
      label: item.nombre,
    }));

    return obrasSocialesTransformadas;
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error("Error al obtener las obras sociales");
  }
}

export async function getObrasSocialesById(obrasocialId) {
  try {
    const obrasocial =
      await sql`SELECT * FROM obras_sociales WHERE id = ${obrasocialId}`;

    if (obrasocial.rows.length === 0) {
      throw new Error("Obra social no encontrada.");
    }

    return paciente.rows[0];
  } catch (error) {
    console.error("Error al obtener la obra social por ID:", error);
    throw new Error("Error al obtener la obra social por ID");
  }
}
