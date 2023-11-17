'use server'
import { Fragment, Suspense } from 'react'

import {
  Row,
  Card,
  Input,
} from 'reactstrap'
import NuevoTurno from './NuevoTurno'
import CustomTable from '@/components/CustomTable'
import { columns } from './columns';
import { getEstados, getMedicosSelect, getObrasSociales, getPacientesSelect } from '@/api/get'
import { getTurnos } from '@/api/turnos/get'

const TablaTurnos = async() => {
  const dataTurnos = await getTurnos();
  const dataPacientes = await getPacientesSelect()
  const dataEstados = await getEstados()
  const dataMedicos = await getMedicosSelect()
  
  const filterFields = ["nombre_paciente", "fecha_formateada"];
  return (
    <Fragment>
      <Card className='mt-4' style={{border:'none'}}>
        <Row >
        <Suspense fallback={<div>Obteniendo datos...</div>}>
        <CustomTable
        pagination
        columns={columns}
        additionalComponent={<NuevoTurno pacientes={dataPacientes} estados={dataEstados} medicos={dataMedicos} />}
        data={dataTurnos}
        filterFields={filterFields}
      />

        </Suspense>
        </Row>
      </Card>
    </Fragment>
  )
}

export default TablaTurnos