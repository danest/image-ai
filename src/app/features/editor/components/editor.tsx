'use client'

import { useEditor } from '@/app/features/editor/hooks/use-editor'
import { useCallback, useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Toolbar from './toolbar'
import Footer from './footer'
import ShapeSidebar from './shape-sidebar'
import { ActiveTool, selectDependentTools } from '../types'
import FillColorSidebar from './fill-color-sidebar'
import StrokeColorSidebar from './stroke-color-sidebar'

const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select')

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool('select')
      }

      if (tool === 'draw') {
        //todo enable draw mode
      }
      if (activeTool === 'draw') {
        //todo disable draw mode
      }

      setActiveTool(tool)
    },
    [activeTool]
  )

  const onClearSelection = useCallback(() => {
    if (selectDependentTools.includes(activeTool)) {
      setActiveTool('select')
    }
  }, [activeTool])

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  })

  const canvasRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    })

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    })
    return () => {
      canvas.dispose()
    }
  }, [init])
  return (
    <div className='h-full flex flex-col'>
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className='absolute h-[calc(100%-68px)] w-full top-[68px] flex'>
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className='bg-muted flex-1 overflow-auto relative flex flex-col'>
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />
          <div
            className='flex-1 h-[calc(100%-124px)] bg-muted'
            ref={containerRef}
          >
            <canvas ref={canvasRef}></canvas>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default Editor
