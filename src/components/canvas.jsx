import useCanvas from "./usecanvas";

function Canvas(props) {

  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);


  return <canvas ref={canvasRef} {...rest} />;
}

export default Canvas;
