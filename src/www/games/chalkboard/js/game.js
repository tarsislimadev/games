import { nButton, nElement, nFlex } from '../../../js/nElement.js'

class Game {
  dom = null

  els = {
    lostsAndWins: null,
    losts: null,
    wins: null,
    numbers: null,
  }

  state = {
    nums: [],
    wins: 0,
    losts: 0,
  }

  constructor({ dom }) {
    this.dom = dom
    //
    this.createLostsAndWins()
  }

  createLostsAndWins() {
    this.dom.append(this.lostsAndWins = new nFlex())
    this.lostsAndWins.setStyle('border-bottom', 'calc(1rem / 8) solid #000000')

    const [losts, wins] = Array.from(Array(2)).map(() => {
      const num = new nElement()
      num.setStyle('padding', '1rem')
      num.setStyle('text-align', 'center')
      num.setContainerStyle('width', '50%')
      //
      num.setText('0')
      //
      return num
    })

    wins.setStyle('border-left', 'calc(1rem / 8) solid #000000')

    this.lostsAndWins.append(this.els.losts = losts)
    this.lostsAndWins.append(this.els.wins = wins)

    this.updateLostsAndWins()
  }

  createNumbers() {
    const maxNumber = 100
    //
    this.state.numbers = Array.from(Array(2))
      .map(() => Math.floor(Math.random() * maxNumber) + 1)
  }

  appendNumbers() {
    const self = this
    //
    if (!self.els.numbers) {
      self.dom.append(self.els.numbers = new nElement())
    }
    //
    self.els.numbers.clear()
    //
    const { numbers } = self.state
    const max = Math.max(...numbers)
    //
    numbers.map((num) => {
      const numButton = new nButton()
      //
      numButton.setText(num)
      //
      numButton.setContainerStyle('text-align', 'center')
      numButton.setStyle('background-color', '#000000')
      numButton.setStyle('margin', '1rem auto')
      numButton.setStyle('color', '#FFFFFF')
      numButton.setStyle('padding', '1rem')
      numButton.setStyle('width', '10rem')
      //
      numButton.on('click', () => {
        console.log({ num, max })
        //
        if (num == max) {
          numButton.setStyle('background-color', '#0000FF')
          self.state.wins++
        } else {
          numButton.setStyle('background-color', '#FF0000')
          self.state.losts++
        }

        self.updateLostsAndWins()

        setTimeout(() => self.start(), 500)
      })
      //
      self.els.numbers.append(numButton)
    })
  }

  updateLostsAndWins() {
    this.els.losts.setText(this.state.losts)
    //
    this.els.wins.setText(this.state.wins)
  }

  start() {
    this.createNumbers()
    //
    this.appendNumbers()
  }

}

export default Game
