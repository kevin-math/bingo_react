import './tile.css'

function Tile ({ id, children, onToggle, isSet, isBingo }) {
  return (
    <div
      style={{ pointerEvents: isSet ? 'none' : 'auto', touchAction: isSet ? 'none' : 'auto' }}
      onClick={(e) => isSet || isBingo ? e.preventDefault() : onToggle()}
      className={`square ${isSet ? 'square-selected ' : ''}`}
    >
      <div className='content'>
        <span>{children}</span>
      </div>
    </div>
  )
}

export default Tile
