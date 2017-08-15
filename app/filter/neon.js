import 'pixi.js'

function startApp() {

  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x232323
  })

  app.view.style['display'] = 'block'
  app.view.style['margin'] = '0 auto'

  document.body.appendChild(app.view);

  app.ticker.add(delta => {

  })
}

export default startApp
