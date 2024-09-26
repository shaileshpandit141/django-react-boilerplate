import React from 'react'
import './LazyPageLoader.scss'
import { SyncLoader } from 'react-spinners'

export default function LazyPageLoader() {
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
