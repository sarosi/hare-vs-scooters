export function query(world, required) {
  const out = [];

  for (const id of world.entities) {
    let ok = true;

    for (const r of required) {
      const c = world.components[r];

      if (c instanceof Map) {
        if (!c.has(id)) ok = false;
      } else {
        if (!c.has(id)) ok = false;
      }
    }

    if (ok) out.push(id);
  }

  return out;
}