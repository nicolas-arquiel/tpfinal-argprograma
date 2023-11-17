import { getEspecialidades, getObrasSociales } from '@/api/get'
import { getMedicoById } from '@/api/medicos/get'
import React, { Suspense } from 'react'
import EditarMedico from './EditarMedico'

const page = async({ params }) => {
    const medico = await getMedicoById(params.id)
    const dataObraSocial = await getObrasSociales()
    const dataEspecialidades = await getEspecialidades()


    console.log('este es el medico', medico);
  return (
    <div>
    <Suspense fallback={<div>Cargando medico...</div>}>

        <EditarMedico especialidades={dataEspecialidades} obrassociales={dataObraSocial} props={medico} />
    </Suspense>
    </div>
  )
}

export default page