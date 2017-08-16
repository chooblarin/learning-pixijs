import 'pixi.js'

function startApp() {

  const app = new PIXI.Application({
    backgroundColor: 0x232323
  })

  app.view.style['display'] = 'block'
  app.view.style['margin'] = '0 auto'

  document.body.appendChild(app.view)

  const container = new PIXI.Container()
  app.stage.addChild(container)

  const vCount = 20.0
  const ropeLength = 160.0 / vCount

  const graphics = new PIXI.Graphics()
  graphics.beginFill(0xFFFFFF, 1.0)
  graphics.drawEllipse(0.0, 0.0, 300.0, 80.0)
  graphics.endFill()
  const texture = graphics.generateCanvasTexture()

  let points = []
  for (let i = 0; i < vCount; i++) {
    const p = new PIXI.Point(i * ropeLength, 0.0)
    points.push(p)
  }
  const rope = new PIXI.mesh.Rope(texture, points)
  rope.position.x = app.renderer.width / 2.0
  rope.position.y = app.renderer.height / 2.0 - 80.0
  rope.width = 300.0
  rope.height = 80.0
  container.addChild(rope)

  rope.rotation += Math.PI / 2.0

  let count = 0.0

  app.ticker.add(delta => {
    count += 0.1

    for (let i = 0; i < points.length; i++) {
      points[i].x = i * ropeLength + Math.cos(i * 0.4 + count) * 5.0
      points[i].y = Math.sin(i * 0.3 + count) * 2.0
    }
  })
}

export default startApp
