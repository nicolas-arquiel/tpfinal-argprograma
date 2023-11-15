import { sql } from '@vercel/postgres';
import { getMedicoById, getPacienteById } from './get';

export async function insertMedico(nombre, especialidad) {
  try {
    const result = await sql`
      INSERT INTO medicos (nombre, especialidad) VALUES (${nombre}, ${especialidad}) RETURNING *;
    `;
    
    console.log('Nuevo médico insertado:', result.rows[0]);
    
    return result.rows[0];
  } catch (error) {
    console.error('Error al insertar el médico:', error);
    throw new Error('Error al insertar el médico');
  }
}

export async function insertPaciente(nombre, email) {
    try {
      const result = await sql`
        INSERT INTO pacientes (nombre, email) VALUES (${nombre}, ${email}) RETURNING *;
      `;
      
      console.log('Nuevo paciente insertado:', result.rows[0]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error al insertar el paciente:', error);
      throw new Error('Error al insertar el paciente');
    }
  }

  export async function insertTurno(pacienteId, medicoId, fecha, hora) {
    try {
      // Comprobación de existencia del paciente
      const pacienteExistente = await getPacienteById(pacienteId);
      if (pacienteExistente.rows.length === 0) {
        throw new Error('El paciente no existe.');
      }
  
      // Comprobación de existencia del médico
      const medicoExistente = await getMedicoById(medicoId);
      if (medicoExistente.rows.length === 0) {
        throw new Error('El médico no existe.');
      }
  
      // Inserción del turno
      const result = await sql`
        INSERT INTO turnos (paciente_id, medico_id, fecha, hora) 
        VALUES (${pacienteId}, ${medicoId}, ${fecha}, ${hora}) 
        RETURNING *;
      `;
      
      console.log('Nuevo turno insertado:', result.rows[0]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error al insertar el turno:', error);
      throw new Error('Error al insertar el turno');
    }
  }