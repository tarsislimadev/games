import { nButton, nElement } from '../../../js/nElement.js'

class Game {
  dom = null
  numbers = null

  constructor({ dom }) {
    this.dom = dom
    //
    const numbers = new nElement()
    this.dom.append(this.numbers = numbers)
  }

  createButton(n, max) {
    const self = this

    const num = new nButton()
    num.setText(n)
    num.setContainerStyle('text-align', 'center')
    num.setStyle('background-color', '#000000')
    num.setStyle('margin', '1rem auto')
    num.setStyle('color', '#FFFFFF')
    num.setStyle('width', '10rem')

    num.on('click', () => {
      if (n == max) {
        num.setStyle('background-color', '#FFFFFF')
        num.setStyle('color', '#000000')
      } else {
        num.setStyle('background-color', '#FF0000')
        num.setStyle('color', '#FFFFFF')
      }

      setTimeout(() => self.start(), 500)
    })

    self.numbers.append(num)
  }

  createGame(nums = []) {
    const self = this
    //
    self.numbers.clear()
    //
    const max = Math.max(...nums)
    nums.map((n) => self.createButton(n, max))
  }

  start() {
    const nums = Array.from(Array(2)).map(() => Math.floor(Math.random() * 10) + 1)
    //
    console.log({ nums })
    //
    this.createGame(nums)
  }
}

export default Game
