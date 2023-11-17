'use client'
 
import { useEffect } from 'react'
 
export default function error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>ERROR!</h2>
      <button
        onClick={
          () => reset()
        }
      >
        INTENTA DE NUEVO
      </button>
    </div>
  )
}