import React from "react"
import { createContext, useContext } from "react"

export const BaseInitialState = {
  someState: 22
}

export const BaseContext = createContext(BaseInitialState)

export const useBase = () => useContext(BaseContext)

export const BaseProvider = ({ children }: any) => {
  return (
    <BaseContext.Provider
      value={{
        ...BaseInitialState
      }}
    >
      {children}
    </BaseContext.Provider>
  )
}
