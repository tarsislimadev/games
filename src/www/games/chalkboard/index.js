import { nElement, nH1 } from '../../js/nElement.js'
import Game from './js/game.js'

nElement.fromElement(document.body)
  .setStyle('margin', '0')

const app = nElement.fromId('app')

const header = new nElement()
header.setStyle('padding', '1rem')
header.setStyle('background-color', '#000000')
header.setStyle('color', '#FFFFFF')
app.append(header)

const title = new nH1()
title.setText('Chalkboard')
title.setStyle('text-align', 'center')
header.append(title)

const body = new nElement()
app.append(body)

const game = new Game({ dom: body })
game.start()
