import { createContext, useCallback, useContext, useReducer } from 'react'

const AppContext = createContext(null)

const initialState = {
  enquiryOpen: false,
  enquiryProduct: null,
  toasts: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_ENQUIRY':
      return { ...state, enquiryOpen: true, enquiryProduct: action.payload || null }
    case 'CLOSE_ENQUIRY':
      return { ...state, enquiryOpen: false, enquiryProduct: null }
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] }
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const pushToast = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type } })
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), 3000)
  }, [])

  const openEnquiry = useCallback((product = null) => {
    dispatch({ type: 'OPEN_ENQUIRY', payload: product })
  }, [])

  const closeEnquiry = useCallback(() => {
    dispatch({ type: 'CLOSE_ENQUIRY' })
  }, [])

  const dismissToast = useCallback((id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id })
  }, [])

  return (
    <AppContext.Provider
      value={{
        enquiryOpen: state.enquiryOpen,
        enquiryProduct: state.enquiryProduct,
        toasts: state.toasts,
        openEnquiry,
        closeEnquiry,
        pushToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
