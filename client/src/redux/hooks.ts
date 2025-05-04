import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// use throughout your app instead of plain `useDispatch` and `useSelector` as
//knows store definition (e.g. aware of middleware)
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
//knows the shape of state tree
export const useAppSelector = useSelector.withTypes<RootState>()
