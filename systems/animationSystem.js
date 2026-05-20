export function animationSystem(world, dt) {
  const anims = world.components.animation;

  if (!anims) return;

  for (const [id, anim] of anims.entries()) {
    const clip = anim.clips[anim.current];
    if (!clip) continue;

    anim.timer += dt;

    if (anim.timer > clip.speed) {
      anim.timer = 0;
      anim.frame = (anim.frame + 1) % clip.frames.length;
    }
  }
}