import 'pixi.js'
import styles from './styles/app.css'
import Particle from './particle/Particle'

const app = new PIXI.Application({
  backgroundColor: 0x232323
})

app.view.style['display'] = 'block'
app.view.style['margin'] = '0 auto'

document.body.appendChild(app.view);

const numOfParticles = 5000

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
  }, radius)
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
