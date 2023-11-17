import { sql } from '@vercel/postgres';


export async function getTurnos() {
    try {
      const data = await sql`
      SELECT 
      t.id,
      TO_CHAR(t.fecha, 'DD/MM/YYYY') AS fecha_formateada,
      t.hora,
      t.estado_id,
      e.nombre AS nombre_estado,
      t.notas,
      p.nombre AS nombre_paciente,
      os.nombre AS nombre_obrasocial_paciente,
      m.nombre AS nombre_medico,
      especialidades.descripcion AS especialidad_medico
      FROM turnos t
      JOIN estados e ON t.estado_id = e.id
      JOIN pacientes p ON t.paciente_id = p.id
      JOIN obras_sociales os ON p.obra_social_id = os.id
      JOIN medicos m ON t.medico_id = m.id
      JOIN especialidades ON m.especialidad_id = especialidades.id;
      `;
  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error al obtener los turnos');
    }
  }

  export async function getTurnoById(turnoId) {
    try {
      const turno = await sql`
        SELECT * FROM turnos WHERE id = ${turnoId};
      `;
      
      if (turno.rows.length === 0) {
        throw new Error('Turno no encontrado.');
      }
  
      return turno.rows[0];
    } catch (error) {
      console.error('Error al obtener el turno por ID:', error);
      throw new Error('Error al obtener el turno por ID');
    }
  }

  export async function getTurnosCompletados() {
    try {
      const data = await sql`
      SELECT 
      t.id,
      TO_CHAR(t.fecha, 'DD/MM/YYYY') AS fecha_formateada,
      t.hora,
      t.estado_id,
      e.nombre AS nombre_estado,
      t.notas,
      p.nombre AS nombre_paciente,
      os.nombre AS nombre_obrasocial_paciente,
      m.nombre AS nombre_medico,
      especialidades.descripcion AS especialidad_medico
      FROM turnos t
      JOIN estados e ON t.estado_id = e.id
      JOIN pacientes p ON t.paciente_id = p.id
      JOIN obras_sociales os ON p.obra_social_id = os.id
      JOIN medicos m ON t.medico_id = m.id
      JOIN especialidades ON m.especialidad_id = especialidades.id
      WHERE t.estado_id = 3;
      `;
  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error al obtener los turnos');
    }
  }