import React from 'react'
import Routes from 'routes/Routes'
import { useMatadataContext } from 'context/matadataContext'
import { Helmet } from 'react-helmet-async'

// App entry point.
export default function App() {
  // Select the metadata context for setting the document metadata
  const { domain, title } = useMatadataContext()

  return (
    <>
      <Helmet>
        {/* Set the page title */}
        <title>{title}</title>
        <meta name="author" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={domain} />
      </Helmet>

      {/* Render the Routes component. */}
      <Routes />
    </>
  )
}
