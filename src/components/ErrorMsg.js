import React from 'react'
import create from 'zustand'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

let store = (set) => ({
  error: null,
  setError: (value) => set({ error: value}),
  showError: false,
  setShowError: (value) => set({ showError: value}),
  fadeOut: false,
  setFadeOut: (value) => set({ fadeOut: value}),
})
export const useError = create(store)

function ErrorMsg() {
  const fadeOut = useError(state => state.fadeOut)

  return (
    <div>
      <div className={`network-error ${fadeOut ? 'fade-out' : ''}`}>
        <i><FontAwesomeIcon icon={faTriangleExclamation} /></i>
        <div className='network-error--message'>
          <h5>Network Error</h5>
          <p>Please check your Internet connection and try again</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorMsg
