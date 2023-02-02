import { RootState } from '@store/configureStore'
import { useSelector } from 'react-redux'

type StateSelector<T> = (state: RootState) => T
type EqualityFn<T> = (left: T, right: T) => boolean

const useRootState = <T>(
  selector: StateSelector<T>,
  equalityFn?: EqualityFn<T>
) => {
  return useSelector(selector, equalityFn)
}

export { useRootState }
