import { getEspecialidades, getObrasSociales } from '@/api/get'
import React, { Suspense } from 'react'
import EditarPaciente from './EditarPaciente'
import { getPacienteById } from '@/api/pacientes/get'

const page = async({ params }) => {
    const paciente = await getPacienteById(params.id)
    const dataObraSocial = await getObrasSociales()


    console.log('este es el paciente', paciente);
  return (
    <div>
    <Suspense fallback={<div>Cargando medico...</div>}>

        <EditarPaciente obrassociales={dataObraSocial} props={paciente} />
    </Suspense>
    </div>
  )
}

export default page