import React, { createContext, useContext } from "react"

const initialState = {
  domain:"djangoreact.com",
  title:"React Django UI Boilerplate"
}

const matadtaContext = createContext(initialState)

const MetadataContextProvider = ({ children }) => {
  return (
    <matadtaContext.Provider value={{ ...initialState }}>
      {children}
    </matadtaContext.Provider>
  )
}

function useMatadataContext() {
  return useContext(matadtaContext)
}

export { MetadataContextProvider, useMatadataContext }
