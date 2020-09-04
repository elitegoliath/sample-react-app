import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

/**
 * useActions is a custom hook.
 * 
 * Custom Hooks must have "use" prepended to them for React
 * to compile them as a hook. It's blackbox magic.
 *
 * @param   {any}  _actions  Actions coming from Redux to be built using the
 * Action Builder design pattern.
 *
 * @return  {[type]}         Returns a memoized function that contains
 * Redux Actions.
 */
export const useActions = (_actions: any) => {
    // We are wrapping each action in useDispatch to reduce boilerplate.
    // This hook comes from react-redux.
    const dispatch = useDispatch()

    // useMemo is a React hook that returns a memoized version of whatever you pass to it.
    // It will re-run if anything in the array of dependencies changes.
    return useMemo(
        () => {
            if (Array.isArray(_actions)) {
                return _actions.map(_a => bindActionCreators(_a, dispatch))
            }
            return bindActionCreators(_actions, dispatch)
        },
        [dispatch, _actions]
    )
}
