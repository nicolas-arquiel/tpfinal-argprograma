"use server";
import { sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { validarData } from "../utils";
import { getPacienteById } from "../pacientes/get";
import { getMedicoById } from "../medicos/get";

export async function insertTurno(data) {
  const propiedadesRequeridas = [
    "paciente_id",
    "medico_id",
    "fecha",
    "hora",
    "estado_id",
  ];
  validarData(data, propiedadesRequeridas);

  const dataQuery = {
    paciente_id: data.paciente_id,
    medico_id: data.medico_id,
    fecha: data.fecha,
    hora: data.hora,
    estado_id: data.estado_id || 1,
    notas: data.notas || "",
  };

  try {
    // Comprobación de existencia del paciente
    const pacienteExistente = await getPacienteById(dataQuery.paciente_id);
    if (!pacienteExistente) {
      throw new Error("El paciente no existe.");
    }

    // Comprobación de existencia del médico
    const medicoExistente = await getMedicoById(dataQuery.medico_id);
    if (!medicoExistente) {
      throw new Error("El médico no existe.");
    }

    // Inserción del turno
    const result = await sql`
      INSERT INTO turnos (paciente_id, medico_id, fecha, hora, estado_id, notas)
      VALUES (${dataQuery.paciente_id}, ${dataQuery.medico_id}, ${dataQuery.fecha}, ${dataQuery.hora}, ${dataQuery.estado_id}, ${dataQuery.notas});
      `;

    console.log("Nuevo turno insertado:", result.rows[0]);

    revalidatePath("/turnos");
    revalidatePath("/");
    return result.rows[0];
  } catch (error) {
    console.error("Error al insertar el turno:", error);
    throw new Error("Error al insertar el turno");
  }
}

export async function updateEstadoTurno(data) {
  const propiedadesRequeridas = ["id", "estado_id"];
  validarData(data, propiedadesRequeridas);

  console.log(data);

  const dataQuery = {
    id: data.id,
    estado_id: data.estado_id || 1,
  };

  try {
    const result = await sql`
          UPDATE turnos
          SET estado_id = ${dataQuery.id}
          WHERE id = ${dataQuery.estado_id}
        `;

    console.log("Se cambio el estado del turno ", result.rows[0]);

    revalidatePath("/turnos");
    revalidatePath("/");
    return result.rows[0];
  } catch (error) {
    console.error("Error al insertar el turno:", error);
    throw new Error("Error al insertar el turno");
  }
}
