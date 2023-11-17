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


export async function getPacientesSelect() {
  try {
    const pacientes = await sql`
    SELECT id, nombre, obra_social_id
    FROM pacientes;
    `;

    // Transformar los resultados
    const pacientesTransformados = pacientes.rows.map((item) => ({
      value: item.id,
      label: item.nombre,
      obra_social: item.obra_social_id
    }));


    return pacientesTransformados;
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error("Error al obtener los pacientes");
  }
}

export async function getMedicosSelect() {
  try {
    const medicos = await sql`
    SELECT 
    medicos.id,
    medicos.nombre,
    ARRAY_AGG(obras_sociales.id) AS ids_obras_sociales
    FROM medicos
    LEFT JOIN medicos_obras_sociales ON medicos.id = medicos_obras_sociales.medico_id
    LEFT JOIN obras_sociales ON medicos_obras_sociales.obra_social_id = obras_sociales.id
    WHERE medicos.activo = true
    GROUP BY medicos.id
    ORDER BY medicos.id DESC;
    `;

    
    // Transformar los resultados
    const medicosTransformados = medicos.rows.map((item) => ({
      value: item.id,
      label: item.nombre,
      obras_sociales: item.ids_obras_sociales
    }));

    return medicosTransformados;
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error("Error al obtener los medicos");
  }
}

export async function getMedicosByPacienteSelect(medicoId) {
  try {
    const medicos = await sql`
    SELECT mo.medico_id, m.nombre AS nombre_medico
    FROM pacientes p
    JOIN medicos_obras_sociales mo ON p.obra_social_id = mo.obra_social_id
    JOIN medicos m ON mo.medico_id = m.id
    WHERE p.id  = ${medicoId});
    `;

    // Transformar los resultados
    const medicosTransformados = medicos.rows.map((item) => ({
      value: item.medico_id,
      label: item.nombre_medico,
    }));

    return medicosTransformados;
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error("Error al obtener los medicos");
  }
}

export async function getEstados() {
  try {
    const estados = await sql`
    SELECT id, nombre
    FROM estados;
    `;

    // Transformar los resultados
    const estadosTransformados = estados.rows.map((item) => ({
      value: item.id,
      label: item.nombre,
    }));

    return estadosTransformados;
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error("Error al obtener los estados");
  }
}


