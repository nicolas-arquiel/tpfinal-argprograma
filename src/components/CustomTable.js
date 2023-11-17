'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'react-feather';
import { Controller } from 'react-hook-form';
import { Row, Col, Label, Input } from 'reactstrap';

const CustomTable = ({ pagination, columns, paginationPerPage = 10, data: initialData = [], additionalComponent, filterFields }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (!Array.isArray(initialData)) {
        throw new Error("La data no es un array válido.");
      }

      if (!columns.length && initialData.length > 0) {
        const firstDataItem = initialData[0];
        const keys = Object.keys(firstDataItem);
        columns = keys.map((key) => ({
          name: key,
          minWidth: "auto",
          cell: (row) => <span>{row[key]}</span>,
        }));
      }

      if (isFiltering) {
        const lowerSearchValue = searchValue.toLowerCase();
        const updatedData = initialData.filter(item => {
          return filterFields.some(fieldName => {
            const cellValue = item[fieldName];
            return cellValue && cellValue.toString().toLowerCase().includes(lowerSearchValue);
          });
        });
        setFilteredData(updatedData);
      } else {
        setFilteredData(initialData);
      }
      setCurrentPage(1);
      setError(null);
    } catch (error) {
      setError(error.message);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchValue, initialData, filterFields, isFiltering]);

  const indexOfLastItem = currentPage * paginationPerPage;
  const indexOfFirstItem = indexOfLastItem - paginationPerPage;
  const currentItems = (filteredData && filteredData.length > 0) ? filteredData.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil((filteredData && filteredData.length > 0) ? filteredData.length / paginationPerPage : 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = () => {
    setIsFiltering(true);
    fetchData();
  };

  const handleInputChange = useCallback((e) => {
    setSearchValue(e.target.value);
    setIsFiltering(false);
  }, [setSearchValue, setIsFiltering]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      setIsFiltering(true);
      fetchData();
    }
  }, []);

  return (
    <div className="table-responsive p-3 border">
      {error && <p>Error: {error}</p>}
      {!loading && (
        <>
          <Row className='justify-content-end my-2 mx-2'>
            <Col className='d-flex align-items-center gap-3 justify-content-end mt-1' md='12' lg='8' sm='12'>
              <div className='d-flex align-items-center gap-3 lg-me-5'>
                {columns.length > 0 && (
                  <div className='d-none'>
                    <Label className='me-1 mb-0 pb-0' htmlFor='search-input'>
                      Buscar
                    </Label>
                    <Input
                      type='text'
                      bsSize='sm'
                      className='border-2'
                      id='search-input'
                      value={searchValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      disabled={!initialData.length}
                    />
                    <button className="btn btn-light" onClick={handleSearch}>
                      <Search size={20} />
                    </button>
                  </div>
                )}
                {additionalComponent && (
                  <div>{additionalComponent}</div>
                )}
              </div>
            </Col>
          </Row>
          {(!error && initialData.length > 0) ? (
            <table className="table mt-4 table-striped">
              <thead className="thead-dark">
                <tr>
                  {columns.map((column) => (
                    <th key={column.name} style={{ minWidth: column.minWidth }} className="text-uppercase text-black px-3">
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td className='px-3' key={column.name} style={{ minWidth: column.minWidth }}>
                        {column.cell(item)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='my-5 text-center'>{error ? error : "No hay datos disponibles."}</p>
          )}
          {pagination && initialData.length > 0 && (
            <div className="pagination-footer d-flex justify-content-between align-items-center p-3">
              <ul className="pagination">
                {Array.from({ length: Math.ceil((filteredData && filteredData.length > 0) ? filteredData.length / paginationPerPage : 1) }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <button className="btn btn-light" onClick={handlePrevPage} disabled={currentPage === 1}>
                  <ChevronLeft size={20} />
                </button>
                <button className="btn btn-light" onClick={handleNextPage} disabled={currentPage === Math.ceil((filteredData && filteredData.length > 0) ? filteredData.length / paginationPerPage : 1)}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomTable;
