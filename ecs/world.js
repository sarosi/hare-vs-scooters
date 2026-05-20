export function createWorld() {
  return {
    entities: new Set(),
    lastEntityId: 0,

    components: {
      pos: new Map(),
      vel: new Map(),
      size: new Map(),
      gravity: new Map(),

      render: new Map(),
      animation: new Map(),

      scooter: new Set(),
      player: new Set()
    }
  };
}