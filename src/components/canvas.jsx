import useCanvas from './useCanvas'

const Canvas = props => {  
  
  const { draw, player, enemy, ...rest } = props
  const ref = useCanvas(draw, player, enemy)
  
  return <canvas ref={ref} {...rest}/>
}

export default Canvas