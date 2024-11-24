'use client'
import {
  ChevronDown,
  MousePointerClick,
  Undo2,
  Redo2,
  Download,
} from 'lucide-react'
import { CiFileOn } from 'react-icons/ci'
import { BsCloudCheck } from 'react-icons/bs'

import { Button } from '@/components/ui/button'
import Logo from './logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import Hint from '@/components/hint'
import { ActiveTool } from '../types'
import { cn } from '@/lib/utils'

interface NavbarProps {
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

const Navbar = ({ activeTool, onChangeActiveTool }: NavbarProps) => {
  return (
    <nav className='w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]'>
      <Logo />
      <div className='w-full flex items-center gap-x-1 h-full'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size='sm' variant='ghost'>
              File <ChevronDown className='size-4 ml-2 ' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='min-w-60'>
            <DropdownMenuItem
              onClick={() => {
                console.log('click Open')
              }}
              className='flex items-center gap-x-2'
            >
              <CiFileOn className='size-8' />
              <div>
                <p>Open</p>
                <p className='text-xs text-muted-foreground'>
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation='vertical' className='mx-2' />
        <Hint label='Select' side='bottom' sideOffset={10}>
          <Button
            variant='ghost'
            size='icon'
            className={cn(activeTool === 'select' && 'bg-gray-100')}
            onClick={() => onChangeActiveTool('select')}
          >
            <MousePointerClick className='size-4' />
          </Button>
        </Hint>
        <Hint label='Undo' side='bottom' sideOffset={10}>
          <Button
            variant='ghost'
            size='icon'
            className=''
            onClick={() => {
              console.log('Undo Click')
            }}
          >
            <Undo2 className='size-4' />
          </Button>
        </Hint>
        <Hint label='Redo' side='bottom' sideOffset={10}>
          <Button
            variant='ghost'
            size='icon'
            className=''
            onClick={() => {
              console.log('Redo Click')
            }}
          >
            <Redo2 className='size-4' />
          </Button>
        </Hint>
        <Separator orientation='vertical' className='mx-2' />
        <div className='flex item-centers gap-x-2'>
          <BsCloudCheck className='size-[20px] text-muted-foreground' />
          <div className='text-xs text-muted-foreground'>Saved</div>
        </div>
        <div className='ml-auto flex items-center gap-x-4'>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size='sm' variant='ghost'>
                Export
                <Download className='size-4 ml-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='min-w-60'>
              <DropdownMenuItem
                className='flex items-center gap-x-2'
                onClick={() => {}}
              >
                <CiFileOn className='size-8' />
                <div>
                  <p>JSON</p>
                  <p className='text-xs text-muted-foreground'>
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center gap-x-2'
                onClick={() => {}}
              >
                <CiFileOn className='size-8' />
                <div>
                  <p>PNG</p>
                  <p className='text-xs text-muted-foreground'>
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center gap-x-2'
                onClick={() => {}}
              >
                <CiFileOn className='size-8' />
                <div>
                  <p>JPG</p>
                  <p className='text-xs text-muted-foreground'>
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center gap-x-2'
                onClick={() => {}}
              >
                <CiFileOn className='size-8' />
                <div>
                  <p>SVG</p>
                  <p className='text-xs text-muted-foreground'>
                    Best for editing in vector
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* TODO: Add user-button component */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
