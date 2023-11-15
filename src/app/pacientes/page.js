import { getPacientes } from '@/api/get'
import BreadCrumbs from '@/components/BreadCrumbs'
import React from 'react'

const page = async() => {
  const data = await getPacientes()

  return (
    <>
      <BreadCrumbs
        title="Listado de pacientes"
        data={[{ title: "Pacientes" }]}
      />
    </>
  )
}

export default page