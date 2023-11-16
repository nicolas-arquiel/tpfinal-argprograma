'use server'
import { Fragment } from 'react'

import {
  Row,
  Card,
} from 'reactstrap'
import NuevoMedico from './NuevoMedico'
import CustomTable from '@/components/CustomTable'
import { columns } from './columns';
import { getMedicos } from '@/api/medicos/get'
import { getEspecialidades, getObrasSociales } from '@/api/get'

const TablaMedicos = async() => {
  const dataMedicos = await getMedicos();
  const dataObraSocial = await getObrasSociales()
  const dataEspecialidades = await getEspecialidades()
  
  return (
    <Fragment>
      <Card className='mt-4' style={{border:'none'}}>
        <Row >
        <CustomTable
        pagination
        columns={columns}
        additionalComponent={<NuevoMedico obrassociales={dataObraSocial} especialidades={dataEspecialidades} />}
        data={dataMedicos}
      />
        </Row>
      </Card>
    </Fragment>
  )
}

export default TablaMedicos