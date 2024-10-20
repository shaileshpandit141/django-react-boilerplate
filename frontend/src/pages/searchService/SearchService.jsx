import React from "react"
import './SearchService.scss'
import { Link } from "react-router-dom"
import SearchBarForm from "components/specific/searchBarForm/SearchBarForm"
import { LazyMaterialIcon, icons } from "lazyUtils/LazyMaterialIcon"

export default function SearchService() {
  return (
    <div className="inner-grid-2-2 search-services-page">
      <section className="search-bar-section">
        <Link to='..' className="link-as-icon">
          <span className="icon">
            <LazyMaterialIcon iconName={icons.arrowBack} />
          </span>
        </Link>
        <SearchBarForm />
      </section>
    </div>
  )
}
