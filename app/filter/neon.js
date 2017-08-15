import 'pixi.js'
import {
  GlowFilter
} from '@pixi/filter-glow'
import icon from "../assets/images/chooblarin.png"

function startApp() {

  const app = new PIXI.Application({
    width: 600,
    height: 600,
    backgroundColor: 0x000000
  })

  app.view.style['display'] = 'block'
  app.view.style['margin'] = '0 auto'

  document.body.appendChild(app.view)

  const iconSprite = PIXI.Sprite.fromImage(icon)
  iconSprite.tint = 0xFFFFFF
  iconSprite.position.x = app.renderer.width / 2.0
  iconSprite.position.y = 80.0
  iconSprite.anchor.set(0.5, 0.0)
  app.stage.addChild(iconSprite)

  var nameText = new PIXI.Text('chooblarin')
  nameText.style = new PIXI.TextStyle({
    fontSize: '80pt',
    fontWeight: '800',
    fill: '#000000',
    stroke: '#FFFFFF',
    strokeThickness: 1.0
  })
  nameText.x = app.renderer.width / 2.0
  nameText.y = 140.0 + app.renderer.height / 2.0
  nameText.anchor.set(0.5)

  app.stage.addChild(nameText)

  const glowFilter = new GlowFilter(15, 3.0, 2.0, 0x81D3FF, 0.8)
  app.stage.filters = [glowFilter]
}

export default startApp
