'use server'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'
import { validarData } from '../utils';

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