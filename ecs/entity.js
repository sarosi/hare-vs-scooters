export function createEntity(world) {
  const id = world.lastEntityId++;
  world.entities.add(id);
  return id;
}