import { sql } from "@vercel/postgres";

export async function getMedicos() {
  try {
    const data = await sql`
    SELECT 
    medicos.*,
    especialidades.descripcion AS nombre_especialidad,
    STRING_AGG(obras_sociales.nombre, ', ') AS nombres_obras_sociales,
    ARRAY_AGG(obras_sociales.id) AS ids_obras_sociales
    FROM medicos
    LEFT JOIN medicos_obras_sociales ON medicos.id = medicos_obras_sociales.medico_id
    LEFT JOIN obras_sociales ON medicos_obras_sociales.obra_social_id = obras_sociales.id
    LEFT JOIN especialidades ON medicos.especialidad_id = especialidades.id
    WHERE medicos.activo = true
    GROUP BY medicos.id, especialidades.descripcion
    ORDER BY medicos.id DESC;
    `;

    return data.rows;
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error("Error al obtener los médicos con obras sociales");
  }
}

export async function getMedicoById(idMedico) {
  try {
    const data = await sql`
      SELECT 
      medicos.*,
      especialidades.descripcion AS nombre_especialidad,
      STRING_AGG(obras_sociales.nombre, ', ') AS nombres_obras_sociales,
      ARRAY_AGG(obras_sociales.id) AS ids_obras_sociales
      FROM medicos
      LEFT JOIN medicos_obras_sociales ON medicos.id = medicos_obras_sociales.medico_id
      LEFT JOIN obras_sociales ON medicos_obras_sociales.obra_social_id = obras_sociales.id
      LEFT JOIN especialidades ON medicos.especialidad_id = especialidades.id
          WHERE medicos.id = ${idMedico} AND medicos.activo = true
          GROUP BY medicos.id, especialidades.descripcion
      ORDER BY medicos.id DESC;
      `;

    return data.rows[0];
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error("Error al obtener el médico por ID y activo");
  }
}

export async function getMedicosByObraSocial(obraSocialId) {
  try {
    const data = await sql`
        SELECT 
          medicos.id AS value,
          medicos.nombre AS label
        FROM medicos
        INNER JOIN medicos_obras_sociales ON medicos.id = medicos_obras_sociales.medico_id
        WHERE medicos_obras_sociales.obra_social_id = ${obraSocialId}
          AND medicos.activo = true
        ORDER BY medicos.nombre;
      `;

    return data.rows;
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error("Error al obtener los médicos por obra social");
  }
}

export async function getMedicosByEspecialidad(especialidadId) {
  try {
    const data = await sql`
        SELECT 
          medicos.id AS value,
          medicos.nombre AS label
        FROM medicos
        WHERE medicos.especialidad_id = ${especialidadId}
          AND medicos.activo = true
        ORDER BY medicos.nombre;
      `;

    return data.rows;
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error("Error al obtener los médicos por especialidad");
  }
}

export async function getMedicosDinamico(obraSocialId, especialidadId) {
  try {
    const data = await sql`
        SELECT 
          medicos.id AS value,
          medicos.nombre AS label
        FROM medicos
        ${
          obraSocialId
            ? sql`INNER JOIN medicos_obras_sociales ON medicos.id = medicos_obras_sociales.medico_id`
            : sql``
        }
        WHERE 
          (${
            obraSocialId
              ? sql`medicos_obras_sociales.obra_social_id = ${obraSocialId}`
              : sql``
          })
          ${obraSocialId && especialidadId ? sql`AND` : sql``}
          (${
            especialidadId
              ? sql`medicos.especialidad_id = ${especialidadId}`
              : sql``
          })
          AND medicos.activo = true
        ORDER BY medicos.nombre;
      `;

    return data.rows;
  } catch (error) {
    console.error("Error en la base de datos:", error);
    throw new Error(
      "Error al obtener los médicos según obra social y especialidad"
    );
  }
}
