import API from './js/api.js'
import { nElement, nH1 } from './js/nElement.js'

nElement.fromElement(document.body)
  .setStyle('margin', '0')

const app = nElement.fromId('app')

const header = new nElement()
header.setStyle('background-color', '#000000')
header.setStyle('padding', '1rem')
app.append(header)

const title = new nH1()
title.setText('Games')
title.setStyle('color', '#FFFFFF')
title.setStyle('text-align', 'center')
header.append(title)

const body = new nElement()
app.append(body)

API.listGames()
  .then(() => {})
