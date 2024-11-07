import React from 'react'
import './Index.scss'

export default function IndexSkeleton() {
  return (
    <div className="inner-grid-2-2 index-page">
      {/* Metadata settings */}
      <figure className="logo-container">
        <span className='img-skeleton skeleton'></span>
      </figure>
      <div className='heading-skeleton'>
        <span className='skeleton'></span>
        <span className='skeleton'></span>
      </div>
      <p className='paragraph-skeleton'>
        <span className='skeleton'></span>
        <span className='skeleton'></span>
      </p>
      <div className="buttons-skeleton">
        <span className='skeleton'></span>
        <span className='skeleton'></span>
      </div>
    </div>
  )
}
