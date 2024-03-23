import { useEffect, useState } from "react"

function App () {

  // State to track if mouse tracking is enabled
  const [enabled, setEnabled] = useState(false)
  // State to track mouse position
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Effect to add or remove event listener
  useEffect(() => {
    console.log('effect ', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('move', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }
    
    // Add event listener if enabled
    if (enabled) {
    window.addEventListener('pointermove', handleMove) }

    // Cleanup
    return () => {
      window.removeEventListener('pointermove', handleMove)
      setPosition({ x: 0, y: 0 })
    }
  }, [enabled])

  // Change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <main>
      <div style={{
        position: 'absolute',
        background: '#09f',
        borderRadius: '50%',
        border: '2px solid #fff',
        opacity: 0.4,
        pointerEvents: 'none',
        top: -20,
        left: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}>
      </div>
      <h3>Proyecto 3</h3>
      <button onClick={() => setEnabled(!enabled)
      }>
        {enabled ? 'Disable' : 'Enable'}     mouse tracking
      </button>
    </main>
  )
}

export default App
