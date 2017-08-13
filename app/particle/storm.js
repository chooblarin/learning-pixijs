import 'pixi.js'

class Particle {

  constructor(sprite, vel) {
    this.sprite = sprite
    this.vel = vel
  }

  update() {
    this.sprite.position.x += this.vel.x
    this.sprite.position.y += this.vel.y
  }
}

function startApp() {

  const app = new PIXI.Application({
    backgroundColor: 0x232323
  })

  app.view.style['display'] = 'block'
  app.view.style['margin'] = '0 auto'

  document.body.appendChild(app.view);

  const numOfParticles = 10000

  const container = new PIXI.particles.ParticleContainer(10000, {
    scale: false,
    position: true,
    rotation: false,
    uvs: false,
    alpha: true
  })
  app.stage.addChild(container)

  let particles = []

  for (let i = 0; i < numOfParticles; i += 1) {
    const px = app.view.width * Math.random()
    const py = app.view.height * Math.random()
    const theta = 2 * Math.PI * Math.random()
    const vx = Math.cos(theta)
    const vy = Math.sin(theta)
    const radius = Math.random() + 1.0

    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xFFFFFF, 0.35)
    graphics.drawCircle(0.0, 0.0, radius)
    graphics.endFill()
    const sprite = new PIXI.Sprite(graphics.generateCanvasTexture())
    sprite.position.x = px
    sprite.position.y = py
    sprite.anchor.set(0.5)

    const particle = new Particle(sprite, {
      x: vx,
      y: vy
    })
    particles.push(particle)
    container.addChild(particle.sprite)
  }

  app.ticker.add(delta => {
    const cos = Math.cos(delta)
    const sin = Math.sin(delta)

    particles.forEach(particle => {
      particle.update()

      if (particle.sprite.x < 0) {
        particle.sprite.x = app.view.width
      }
      if (app.view.width < particle.sprite.x) {
        particle.sprite.x = 0.0
      }
      if (particle.sprite.y < 0) {
        particle.sprite.y = app.view.height
      }
      if (app.view.height < particle.sprite.y) {
        particle.sprite.y = 0.0
      }
    })
  })
}

export default startApp
