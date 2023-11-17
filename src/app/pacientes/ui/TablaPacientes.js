'use server'
import { Fragment } from 'react'

import {
  Row,
  Card,
} from 'reactstrap'
import NuevoPaciente from './NuevoPaciente'
import CustomTable from '@/components/CustomTable'
import { columns } from './columns';
import { getEspecialidades, getObrasSociales } from '@/api/get'
import { getPacientes } from '@/api/pacientes/get'

const TablaPacientes = async() => {
  const dataPacientes = await getPacientes()
  const dataObraSocial = await getObrasSociales()
  const dataEspecialidades = await getEspecialidades()

  const filterFields = ["nombre"];
  
  return (
    <Fragment>
      <Card className='mt-4' style={{border:'none'}}>
        <Row >
        <CustomTable
        pagination
        columns={columns}
        additionalComponent={<NuevoPaciente obrassociales={dataObraSocial} especialidades={dataEspecialidades} />}
        data={dataPacientes}
        filterFields={filterFields}
      />
        </Row>
      </Card>
    </Fragment>
  )
}

export default TablaPacientes