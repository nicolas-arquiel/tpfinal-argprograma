import { sql } from '@vercel/postgres';

export async function getPacientes() {
    try {
      const data = await sql`
      SELECT pacientes.id, pacientes.nombre, pacientes.email, pacientes.numero_telefono, obras_sociales.id AS obra_social_id, obras_sociales.nombre AS obra_social
      FROM pacientes
      LEFT JOIN obras_sociales ON pacientes.obra_social_id = obras_sociales.id;
      
`;
  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error al obtener los pacientes');
    }
  }

  export async function getPacienteById(pacienteId) {
    try {
      const paciente = await sql`
      SELECT pacientes.id, pacientes.nombre, pacientes.email, pacientes.numero_telefono, obras_sociales.id AS obra_social_id, obras_sociales.nombre AS obra_social
      FROM pacientes
      LEFT JOIN obras_sociales ON pacientes.obra_social_id = obras_sociales.id
      WHERE pacientes.id = ${pacienteId} AND activo = true;
      `;
      
      if (paciente.rows.length === 0) {
        throw new Error('Paciente no encontrado.');
      }
  
      return paciente.rows[0];
    } catch (error) {
      console.error('Error al obtener el paciente por ID:', error);
      throw new Error('Error al obtener el paciente por ID');
    }
  }