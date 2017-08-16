import 'pixi.js'
import 'pixi-particles'

function startApp() {

  const app = new PIXI.Application({
    backgroundColor: 0x232323
  })

  app.view.style['display'] = 'block'
  app.view.style['margin'] = '0 auto'

  document.body.appendChild(app.view)

  const container = new PIXI.Container()

  app.stage.addChild(container)

  const graphics = new PIXI.Graphics()
  graphics.beginFill(0xFFFFFF, 1.0)
  graphics.drawEllipse(0.0, 0.0, 20.0, 20.0)
  graphics.endFill()
  const texture = graphics.generateCanvasTexture()

  const emitter = new PIXI.particles.Emitter(container, [texture], {
    "alpha": {
      "start": 0.62,
      "end": 0
    },
    "scale": {
      "start": 1.25,
      "end": 0.15,
      "minimumScaleMultiplier": 1
    },
    "color": {
      "start": "#FFDDFC",
      "end": "#FF2CF0"
    },
    "speed": {
      "start": 800,
      "end": 200,
      "minimumSpeedMultiplier": 1
    },
    "acceleration": {
      "x": 0,
      "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
      "min": 265,
      "max": 275
    },
    "noRotation": false,
    "rotationSpeed": {
      "min": 50,
      "max": 50
    },
    "lifetime": {
      "min": 0.2,
      "max": 0.4
    },
    "blendMode": "add",
    "frequency": 0.001,
    "emitterLifetime": -1,
    "maxParticles": 2000,
    "pos": {
      "x": 0,
      "y": 0
    },
    "addAtBack": false,
    "spawnType": "circle",
    "spawnCircle": {
      "x": 0,
      "y": 0,
      "r": 10
    }
  })

  const center = {
    x: app.renderer.width / 2.0,
    y: app.renderer.height / 2.0
  }

  const length = 0.4 * Math.min(app.renderer.width, app.renderer.height)

  emitter.ownerPos.x = center.x
  emitter.ownerPos.y = center.y

  let elapsed = Date.now()
  let count = 0.0

  app.ticker.add(delta => {
    const now = Date.now()
    count += 0.1

    const theta = 0.6 * count
    emitter.updateOwnerPos(
      center.x + length * Math.cos(theta),
      center.y + length * Math.sin(theta)
    )

    emitter.update((now - elapsed) * 0.001)
    elapsed = now
  })

  window.addEventListener('mousemove', e => {
    const x = app.renderer.plugins.interaction.mouse.global.x
    const y = app.renderer.plugins.interaction.mouse.global.y
    // emitter.updateOwnerPos(x, y)
  })
}

export default startApp
