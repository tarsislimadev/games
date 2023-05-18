import * as nContext from 'nContext'

const __ = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
}

const COLORS = {
  LIGHT_BLUE: 0x0099FF,
  BLUE: 0x0066CC,
  WHITE: 0xFFFFFF,
  BLACK: 0x000000,
}

const scene = new nContext.Scene()
scene.background = nContext.Color.rgb(0, 102, 204)

const renderer = new nContext.WebGLRenderer()
renderer.setSize(__.getWidth(), __.getHeight())
document.body.appendChild(renderer.dom)

document.body.style.margin = '0'

function animate() {
  renderer.render(scene)
  //
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
