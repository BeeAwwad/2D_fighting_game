// collision statements between attack box and body box
export const rectangularCollision = ({ rectangle1, rectangle2 }) => {
  return (
    rectangle1.position.x +
      rectangle1.attackBox.width +
      rectangle1.attackBox.offset.x >=
      rectangle2.position.x &&
    rectangle1.position.x + rectangle1.attackBox.offset.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}
