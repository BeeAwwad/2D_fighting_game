import useCanvas from "./useCanvas";

const Canvas = (props) => {
  const { draw, player, enemy, lastKey, ...rest } = props;
  const ref = useCanvas(draw, player, enemy, lastKey);

  return <canvas ref={ref} {...rest} />;
};

export default Canvas;
