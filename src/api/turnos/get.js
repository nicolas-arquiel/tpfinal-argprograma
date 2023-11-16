import { sql } from '@vercel/postgres';


export async function getTurnos() {
    try {
      const data = await sql`SELECT * FROM turnos`;
  
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
