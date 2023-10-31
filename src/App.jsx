import Canvas from './components/canvas'

function App() {
  
  const draw = (ctx) => {

    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    ctx.fillStyle = 'black';

    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  };

 return <Canvas draw={draw} width="1024" height="576" style={{border : '10px solid black'}} />
}

export default App
