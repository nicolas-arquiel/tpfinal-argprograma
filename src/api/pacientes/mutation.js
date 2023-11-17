"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { validarData } from "../utils";

export async function insertPaciente(data) {
  const propiedadesRequeridas = ["nombre", "email", "numero_telefono"];
  validarData(data, propiedadesRequeridas);

  const dataQuery = {
    nombre: data.nombre,
    email: data.email,
    numero_telefono: data.numero_telefono,
    obra_social_id: data.obra_social_id || 9,
  };

  try {
    const result = await sql`
      INSERT INTO pacientes (nombre, email, numero_telefono, obra_social_id)
      VALUES (${dataQuery.nombre}, ${dataQuery.email}, ${dataQuery.numero_telefono}, ${dataQuery.obra_social_id}) ;
      `;

    console.log("Nuevo paciente insertado:", result.rows[0]);
    revalidatePath("/pacientes");
    revalidatePath("/turnos");
    revalidatePath("/");
    return result.rows[0];
  } catch (error) {
    console.error("Error al insertar el paciente:", error);
    throw new Error("Error al insertar el paciente");
  }
}

export async function updatePaciente(data) {
  const propiedadesRequeridas = ["nombre", "email", "numero_telefono"];
  validarData(data, propiedadesRequeridas);
  console.log(data);
  const dataQuery = {
    id: data.id,
    nombre: data.nombre,
    email: data.email,
    numero_telefono: data.numero_telefono,
    obra_social_id: data.obra_social_id || 9,
  };

  try {
    await sql`
    UPDATE pacientes
    SET nombre = ${dataQuery.nombre},
        email = ${dataQuery.email},
        numero_telefono = ${dataQuery.numero_telefono},
        obra_social_id = ${dataQuery.obra_social_id}
    WHERE id = ${dataQuery.id};
    `;

    revalidatePath("/pacientes");
    revalidatePath("/turnos");
    revalidatePath("/");
  } catch (error) {
    console.error("Error al actualizar el paciente:", error);
    throw new Error("Error al actualizar el paciente");
  }
}

export async function deletePaciente(pacienteId) {
  try {
    await sql`
      DELETE FROM pacientes WHERE id = ${pacienteId};
    `;

    console.log("paciente eliminado:", pacienteId);

    revalidatePath("/pacientes");
    revalidatePath("/turnos");
    revalidatePath("/");
  } catch (error) {
    console.error("Error al eliminar el paciente:", error);
    throw new Error("Error al eliminar el paciente");
  }
}
