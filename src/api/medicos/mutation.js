'use server'
import { sql } from '@vercel/postgres';

import { revalidatePath } from 'next/cache'
import { validarData } from '../utils';

export async function insertMedico(data) {
    const propiedadesRequeridas = ['nombre', 'email', 'numero_telefono'];
    validarData(data, propiedadesRequeridas);
  
    const dataQuery = {
      nombre: data.nombre,
      especialidad_id: data.especialidad_id || 1,
      email: data.email,
      numero_telefono: data.numero_telefono,
      obra_social_id: data.obra_social_id || [9] 
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
  
      console.log('Nuevo médico insertado con obras sociales:', medicoId);
  
      revalidatePath('/medicos')
      return medicoId;
    } catch (error) {
      console.error('Error al insertar el médico:', error);
      throw new Error('Error al insertar el médico');
    }
  }