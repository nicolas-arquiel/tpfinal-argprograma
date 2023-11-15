// ** React Imports
import { Fragment, useState } from 'react'

import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  CardTitle,
  CardHeader
} from 'reactstrap'

const TablaPacientes = ({ data, columns }) => {
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith = item.descripcion.toLowerCase().startsWith(value.toLowerCase())
        const includes = item.descripcion.toLowerCase().includes(value.toLowerCase())
        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }


  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Pacientes</CardTitle>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='me-1' for='search-input'>
              Buscar
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            data={searchValue.length ? filteredData : data }
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default TablaPacientes