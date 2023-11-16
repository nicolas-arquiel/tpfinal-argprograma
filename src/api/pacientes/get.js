import { sql } from '@vercel/postgres';

export async function getPacientes() {
    try {
      const data = await sql`SELECT * FROM pacientes`;
  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error al obtener los pacientes');
    }
  }

  export async function getPacienteById(pacienteId) {
    try {
      const paciente = await sql`SELECT * FROM pacientes WHERE id = ${pacienteId}`;
      
      if (paciente.rows.length === 0) {
        throw new Error('Paciente no encontrado.');
      }
  
      return paciente.rows[0];
    } catch (error) {
      console.error('Error al obtener el paciente por ID:', error);
      throw new Error('Error al obtener el paciente por ID');
    }
  }