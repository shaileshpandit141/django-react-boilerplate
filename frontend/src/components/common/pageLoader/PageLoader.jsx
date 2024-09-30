import React from 'react'
import './PageLoader.scss'
import { SyncLoader } from 'react-spinners'

export default function PageLoader() {
  return (
    <div className="lazy-loader">
      <span>
        <SyncLoader
          color="var(--text-accent)"
        />
      </span>
    </div>
  )
}
