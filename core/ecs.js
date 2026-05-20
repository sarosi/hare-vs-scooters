let id = 1;

export function createEntity(state, data) {
  const entity = { id: id++, ...data };
  state.entities.push(entity);
  return entity;
}

export function getEntities(state, tag) {
  return state.entities.filter(e => e.tag === tag);
}