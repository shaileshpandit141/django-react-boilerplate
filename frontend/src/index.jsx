import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from 'config/store'
import { Provider } from 'react-redux'
import { MetadataContextProvider } from 'context/matadataContext'
import { HelmetProvider } from 'react-helmet-async'
import App from 'App'
import './sass/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <MetadataContextProvider>
      <HelmetProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HelmetProvider>
    </MetadataContextProvider>
  </Provider>
)
