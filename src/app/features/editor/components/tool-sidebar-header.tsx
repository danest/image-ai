interface ToolSidebarHeaderProps {
  title: string
  description?: string
}

const ToolSidebarHeader = ({ title, description }: ToolSidebarHeaderProps) => {
  return (
    <div className='p-4 border-b space-y h-[68px]'>
      <p className='text-sm font-medium'>{title}</p>
      {description && (
        <p className='text-xs text-muted-foreground'>{description}</p>
      )}
    </div>
  )
}

export default ToolSidebarHeader
