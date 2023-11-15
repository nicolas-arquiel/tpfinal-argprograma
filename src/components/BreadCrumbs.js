'use client'
import { Fragment } from 'react'
import Proptypes from 'prop-types'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap'

const BreadCrumbs = ({ data, title }) => {

  const renderBreadCrumbs = () => {
    return data.map((item, index) => {
      const Wrapper = item.link ? Link : Fragment
      const isLastItem = data.length - 1 === index
      return (
        <BreadcrumbItem
          tag='li'
          key={index}
          active={!isLastItem}
          className={!isLastItem ? 'text-primary p-0 mb-0' : ''}
        >
          <Wrapper {...(item.link ? { href: item.link } : {})}>{item.title}</Wrapper>
        </BreadcrumbItem>
      )
    })
  }

  return (
    <div className='content-header row'>
      <div className=' mb-2'>
        <div className='row '>
          <div className='d-flex align-items-baseline'>
            {title ? <h4 className=' float-start me-3 p-0 mb-0'>{title}</h4> : ''}
            <div className=' d-sm-block d-none '>
              <Breadcrumb className='pb-0 mb-0' >
                <BreadcrumbItem tag='li'>
                  <Link href='/' className='text-decoration-none p-0 mb-0' >Inicio</Link>
                </BreadcrumbItem>
                {renderBreadCrumbs()}
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
  title: Proptypes.string.isRequired,
  data: Proptypes.arrayOf(
    Proptypes.shape({
      link: Proptypes.string,
      title: Proptypes.string.isRequired
    })
  )
}
