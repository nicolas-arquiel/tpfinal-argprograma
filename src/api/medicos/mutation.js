"use server";
import { sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { validarData } from "../utils";

export async function insertMedico(data) {
  const propiedadesRequeridas = ["nombre", "email", "numero_telefono"];
  validarData(data, propiedadesRequeridas);

  const dataQuery = {
    nombre: data.nombre,
    especialidad_id: data.especialidad_id || 1,
    email: data.email,
    numero_telefono: data.numero_telefono,
    obra_social_id: data.obra_social_id || [9],
  };

  try {
    const medicoResult = await sql`
        INSERT INTO medicos (nombre, especialidad_id, email, numero_telefono) 
        VALUES (${dataQuery.nombre}, ${dataQuery.especialidad_id}, ${dataQuery.email}, ${dataQuery.numero_telefono}) 
        RETURNING *;
      `;

    const medicoId = medicoResult.rows[0].id;

    for (const obraSocialId of dataQuery.obra_social_id) {
      await sql`
          INSERT INTO medicos_obras_sociales (medico_id, obra_social_id) 
          VALUES (${medicoId}, ${obraSocialId});
        `;
    }

    console.log("Nuevo médico insertado con obras sociales:", medicoId);

    revalidatePath("/medicos");
    revalidatePath("/turnos");
    revalidatePath("/");
    return medicoId;
  } catch (error) {
    console.error("Error al insertar el médico:", error);
    throw new Error("Error al insertar el médico");
  }
}

export async function updateMedico(data) {
  const propiedadesRequeridas = ["id", "nombre", "email", "numero_telefono"];
  validarData(data, propiedadesRequeridas);

  const dataQuery = {
    id: data.id,
    nombre: data.nombre,
    especialidad_id: data.especialidad_id || 1,
    email: data.email,
    numero_telefono: data.numero_telefono,
    ids_obras_sociales: data.ids_obras_sociales || [9],
  };

  try {
    await sql`
      UPDATE medicos
      SET nombre = ${dataQuery.nombre},
          especialidad_id = ${dataQuery.especialidad_id},
          email = ${dataQuery.email},
          numero_telefono = ${dataQuery.numero_telefono}
      WHERE id = ${dataQuery.id};
    `;

    await sql`
    DELETE FROM medicos_obras_sociales
    WHERE medico_id = ${dataQuery.id};
  `;

    for (const obraSocialId of dataQuery.ids_obras_sociales) {
      await sql`
      INSERT INTO medicos_obras_sociales (medico_id, obra_social_id) 
      VALUES (${dataQuery.id}, ${obraSocialId});
    `;
    }

    console.log("Datos del médico actualizados:", dataQuery.id);

    revalidatePath("/medicos");
    revalidatePath("/turnos");
    revalidatePath("/");
    return;
  } catch (error) {
    console.error("Error al actualizar los datos del médico:", error);
    throw new Error("Error al actualizar los datos del médico");
  }
}

export async function updateActivoMedico(medicoId, activo) {
  try {
    const data = await sql`
      UPDATE medicos
      SET activo = ${activo}
      WHERE id = ${medicoId}
      RETURNING *;
    `;

    if (data.rows.length === 0) {
      throw new Error(`No se encontró ningún médico con ID ${medicoId}`);
    }

    console.log(`Estado activo del médico actualizado a ${activo}:`, medicoId);

    revalidatePath("/medicos");
    revalidatePath("/turnos");
    revalidatePath("/");
  } catch (error) {
    console.error("Error al actualizar el estado activo del médico:", error);
    throw new Error("Error al actualizar el estado activo del médico");
  }
}

export async function deleteMedico(medicoId) {
  try {
    await sql`
    DELETE FROM medicos_obras_sociales
    WHERE medico_id = ${medicoId};
  `;

    // Eliminar al médico
    const data = await sql`
    DELETE FROM medicos
    WHERE id = ${medicoId}
    RETURNING *;
  `;

    if (data.rows.length === 0) {
      throw new Error(`No se encontró ningún médico con ID ${medicoId}`);
    }

    console.log("Médico eliminado:", medicoId);

    revalidatePath("/medicos");
    revalidatePath("/turnos");
    revalidatePath("/");
  } catch (error) {
    console.error("Error al eliminar el médico:", error);
    throw new Error("Error al eliminar el médico");
  }
}
