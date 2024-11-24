import { useCallback, useState, useMemo } from 'react'
import { fabric } from 'fabric'
import { useAutoResize } from './use-auto-resize'
import { useCanvasEvents } from './use-canvas-events'
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  Editor,
  EditorHookProps,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
} from '../types'
import { isTextType } from '../utils'

const buildEditor = ({
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  setStrokeWidth,
  strokeWidth,
  selectedObjects,
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === 'clip')
  }

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace()
    const center = workspace?.getCenterPoint()

    if (!center) return

    // @ts-expect-error no type
    canvas._centerObject(object, center)
  }

  const addToCanvas = (object: fabric.Object) => {
    center(object)
    canvas.add(object)
    canvas.setActiveObject(object)
  }

  return {
    changeFillColor: (value: string) => {
      setFillColor(value)
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value })
      })
      canvas.renderAll()
    },

    changeStrokeColor: (value: string) => {
      setStrokeColor(value)
      canvas.getActiveObjects().forEach((object) => {
        // Text types dont have stroke
        if (isTextType(object.type)) {
          object.set({ fill: value })
          return
        }
        object.set({ stroke: value })
      })
      canvas.renderAll()
    },

    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value)
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value })
      })
      canvas.renderAll()
    },

    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      })

      addToCanvas(object)
    },

    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      })

      addToCanvas(object)
    },

    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      })

      addToCanvas(object)
    },

    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      })

      addToCanvas(object)
    },

    addInverseTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        angle: 180,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      })

      addToCanvas(object)
    },

    addDiamond: () => {
      const HEIGHT = 400
      const WIDTH = 400

      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...RECTANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
        }
      )

      addToCanvas(object)
    },
    canvas,
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return fillColor
      }

      const value = selectedObject.get('fill') || fillColor

      // currently gradients and patterns are not support
      return value as string
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return fillColor
      }

      const value = selectedObject.get('stroke') || strokeColor

      return value
    },
    strokeWidth,
    selectedObjects,
  }
}

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])

  const [fillColor, setFillColor] = useState(FILL_COLOR)
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR)
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH)

  useAutoResize({
    canvas,
    container,
  })

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
  })

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        selectedObjects,
      })
    }
    return undefined
  }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects])

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas
      initialContainer: HTMLDivElement
    }) => {
      fabric.Object.prototype.set({
        cornerColor: '#fff',
        cornerStyle: 'circle',
        borderColor: '#3b82f6',
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: '#3b82f6',
      })

      const initalWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: 'clip',
        fill: 'white',
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0, 0.8',
          blur: 5,
        }),
      })

      initialCanvas.setWidth(initialContainer.offsetWidth)
      initialCanvas.setHeight(initialContainer.offsetHeight)

      initialCanvas.add(initalWorkspace)
      initialCanvas.centerObject(initalWorkspace)
      initialCanvas.clipPath = initalWorkspace

      setCanvas(initialCanvas)
      setContainer(initialContainer)
    },
    []
  )

  return { init, editor }
}
