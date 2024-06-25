import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { ICircle } from 'types/supabaseTables'

export const CirclesContext = createContext<{
  circles: ICircle[]
  setCircles: Dispatch<SetStateAction<ICircle[]>>
}>({
  circles: [],
  setCircles: () => [],
})

export const useCirclesContext = () => useContext(CirclesContext)
