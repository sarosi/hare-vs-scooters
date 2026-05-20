export function addComponent(world, id, type, data = null) {
  const c = world.components[type];

  if (c instanceof Map) {
    c.set(id, data);
  } else {
    c.add(id);
  }
}