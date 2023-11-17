import useCanvas from "./useCanvas";

const Canvas = (props) => {
  const { player, enemy, ...rest } = props;
  const [ ref ] = useCanvas(player, enemy);

  return <canvas ref={ref} {...rest} />;
};

export default Canvas;
