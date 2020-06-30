import React from 'react'
import { storesContext } from '../context'

export const useStores = () => React.useContext(storesContext)