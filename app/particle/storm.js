import 'pixi.js'

class Particle {

  constructor(pos, vel, radius, color = 0xFFFFFF) {
    this.vel = vel
    this.graphics = new PIXI.Graphics()
    this.graphics.x = pos.x
    this.graphics.y = pos.y
    this.radius = radius
    this.color = color
  }

  update() {
    this.graphics.x += this.vel.x
    this.graphics.y += this.vel.y
  }

  draw() {
    this.graphics.beginFill(this.color, 0.35)
    this.graphics.drawCircle(0.0, 0.0, this.radius)
    this.graphics.endFill()
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

  let particles = []

  for (let i = 0; i < numOfParticles; i += 1) {
    const px = app.view.width * Math.random()
    const py = app.view.height * Math.random()
    const theta = 2 * Math.PI * Math.random()
    const vx = 2.0 * Math.cos(theta)
    const vy = 2.0 * Math.sin(theta)
    const radius = Math.random() + 1.0

    const particle = new Particle({
      x: px,
      y: py
    }, {
      x: vx,
      y: vy
    }, radius, 0xFDB2D4)
    particles.push(particle)
    app.stage.addChild(particle.graphics)
    particle.draw()
  }

  app.ticker.add(delta => {
    const cos = Math.cos(delta)
    const sin = Math.sin(delta)

    particles.forEach(particle => {
      particle.update()

      if (particle.graphics.x < 0) {
        particle.graphics.x = app.view.width
      }
      if (app.view.width < particle.graphics.x) {
        particle.graphics.x = 0.0
      }
      if (particle.graphics.y < 0) {
        particle.graphics.y = app.view.height
      }
      if (app.view.height < particle.graphics.y) {
        particle.graphics.y = 0.0
      }
    })
  })
}

export default startApp
