'use client'

import { useEditor } from '@/app/features/editor/hooks/use-editor'
import { useEffect, useRef } from 'react'

const Editor = () => {
  const { init } = useEditor()

  const canvasRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    init({
      initialCanvas: '',
      initialContainer: containerRef.current!,
    })
  }, [init])
  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Editor
