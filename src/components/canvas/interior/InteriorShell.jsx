import InteriorFloors    from './InteriorFloors'
import InteriorLighting  from './InteriorLighting'
import InteriorFurniture from './InteriorFurniture'
import DoorSystem        from './DoorSystem'

export default function InteriorShell({ playerPos }) {
  return (
    <group name="interior">
      <InteriorFloors />
      <InteriorFurniture />
      <DoorSystem playerPos={playerPos} />
      <InteriorLighting />
    </group>
  )
}