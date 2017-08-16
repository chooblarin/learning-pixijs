import 'pixi.js'
import {
  GlowFilter
} from '@pixi/filter-glow'
import noiseMap from "../assets/images/noise_map.png"

function startApp() {

  const app = new PIXI.Application({
    width: 800.0,
    height: 600.0,
    backgroundColor: 0x232323
  })

  app.view.style['display'] = 'block'
  app.view.style['margin'] = '0 auto'

  document.body.appendChild(app.view)

  const numOfParticles = 200

  const waterAreaRatio = 0.40
  const airAreaRatio = 1.0 - waterAreaRatio
  const airArea = new PIXI.Rectangle(0, 0, app.view.width, app.view.height * airAreaRatio)
  const waterArea = new PIXI.Rectangle(0, app.view.height * airAreaRatio, app.view.width, app.view.height * waterAreaRatio)

  const background = new PIXI.Container()
  app.stage.addChild(background)
  const graphics = new PIXI.Graphics()
  background.addChild(graphics)
  graphics.beginFill(0x0B1319)
  graphics.drawRect(airArea.x, airArea.y, airArea.width, airArea.height)
  graphics.endFill()

  graphics.beginFill(0x071E42)
  graphics.drawRect(waterArea.x, waterArea.y, waterArea.width, waterArea.height)
  graphics.endFill()

  const airContainer = new PIXI.Container()
  const waterContainer = new PIXI.Container()
  const particleContainer = new PIXI.particles.ParticleContainer(10000, {
    scale: false,
    position: true,
    rotation: false,
    uvs: false,
    alpha: true
  })

  airContainer.x = airArea.x
  airContainer.y = airArea.y
  airContainer.width = airArea.width
  airContainer.height = airArea.height

  waterContainer.x = waterArea.x
  waterContainer.y = waterArea.y
  waterContainer.width = waterArea.width
  waterContainer.height = waterArea.height

  app.stage.addChild(airContainer)
  app.stage.addChild(waterContainer)

  let particles = []

  for (let i = 0; i < numOfParticles; i += 1) {
    const px = airArea.width * Math.random()
    const py = airArea.height * Math.random()
    const particle = createParticle({
      x: px,
      y: py
    })
    particles.push(particle)
    particleContainer.addChild(particle.sprite)
  }

  airContainer.addChild(particleContainer)

  const noiseMapImage = PIXI.Sprite.fromImage(noiseMap)
  waterContainer.addChild(noiseMapImage)

  const glowFilter = new GlowFilter(15, 4.0, 1.0, 0xF2FE00, 0.4)
  airContainer.filterArea = airArea
  airContainer.filters = [glowFilter]

  const blurFilter = new PIXI.filters.BlurFilter(0.2, 0.5)
  const displacementFilter = new PIXI.filters.DisplacementFilter(noiseMapImage, waterArea.width, waterArea.height)
  displacementFilter.scale.x = 50
  displacementFilter.scale.y = 50
  waterContainer.filters = [displacementFilter, blurFilter]

  var renderTexture = PIXI.RenderTexture.create(airArea.width, airArea.height)
  var waterSprite = new PIXI.Sprite(renderTexture)
  waterSprite.scale.y = -waterAreaRatio / airAreaRatio
  waterSprite.position.y = waterArea.height
  waterContainer.addChild(waterSprite)

  let count = 0.0

  app.ticker.add(delta => {
    count += 0.1 * delta

    app.renderer.render(airContainer, renderTexture)

    displacementFilter.x = count * 10
    displacementFilter.y = count * 10

    const cos = Math.cos(delta)
    const sin = Math.sin(delta)

    const mousePos = {
      x: app.renderer.plugins.interaction.mouse.global.x,
      y: app.renderer.plugins.interaction.mouse.global.y
    }

    particles.forEach(particle => {

      const dx = particle.sprite.x - mousePos.x
      const dy = particle.sprite.y - mousePos.y
      const sqrDist = Math.sqrt(dx * dx + dy * dy)
      if (sqrDist < 50) {
        particle.vel.x += 0.01 * dx
        particle.vel.y += 0.01 * dy
      }

      particle.update()

      if (particle.sprite.x < 0) {
        particle.sprite.x = airArea.width
      }
      if (airArea.width < particle.sprite.x) {
        particle.sprite.x = 0.0
      }
      if (particle.sprite.y < 0) {
        particle.sprite.y = airArea.height
      }
      if (airArea.height < particle.sprite.y) {
        particle.sprite.y = 0.0
      }
    })
  })
}

const createParticle = pos => {
  const theta = 2 * Math.PI * Math.random()
  const vx = Math.cos(theta)
  const vy = Math.sin(theta)
  const radius = Math.random() + 1.0

  const graphics = new PIXI.Graphics()
  graphics.beginFill(0xFFFFFF, 0.65)
  graphics.drawCircle(0.0, 0.0, radius)
  graphics.endFill()
  const sprite = new PIXI.Sprite(graphics.generateCanvasTexture())
  sprite.position.x = pos.x
  sprite.position.y = pos.y
  sprite.anchor.set(0.5)

  return new Particle(sprite, {
    x: vx,
    y: vy
  })
}

class Particle {

  constructor(sprite, vel) {
    this.sprite = sprite
    this.vel = vel
    this.acc = {
      x: 0.0,
      y: 0.0
    }

    this.maxVel = 0.8
  }

  update() {
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.sprite.position.x += this.vel.x
    this.sprite.position.y += this.vel.y

    this.acc.x = 0.0
    this.acc.y = 0.0

    const v = this.vel.x * this.vel.x + this.vel.y * this.vel.y
    if (this.maxVel * this.maxVel < v) {
      this.vel.x *= 0.95
      this.vel.y *= 0.95
    }
  }
}

export default startApp
