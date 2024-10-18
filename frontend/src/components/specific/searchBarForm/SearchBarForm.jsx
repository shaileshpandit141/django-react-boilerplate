import React from "react"
import './SearchBarForm.scss'
import { LazyMaterialIcon, icons } from "lazyUtils/LazyMaterialIcon"

export default function SearchBarForm(props) {
  return (
    <form className='search-bar'>
      <input
        type="text"
        className='search-input'
        placeholder='search...'
      />
      <button 
        className='button-as-icon'
      >
        <span className='icon'>
          <LazyMaterialIcon iconName={icons.search} />
        </span>
      </button>
    </form>
  )
}
