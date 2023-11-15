import { getTurnos } from '@/api/get'
import BreadCrumbs from '@/components/BreadCrumbs'
import React from 'react'

const page = async() => {

  const data = await getTurnos()

  return (
    <>
    <BreadCrumbs
      title="Listado de turnos"
      data={[{ title: "Turnos" }]}
    />
  </>
  )
}

export default page