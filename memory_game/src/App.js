import React, { Component } from 'react'
import './App.css'
import Card from './components/card/Card'
import shuffle from 'lodash.shuffle'

const SYMBOLS = '🎃🎂🎅🐰🎥🍂👨💪🎓👩🎊🏊';
const SHOW_TIME = 800;

const parent = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
  gridColumnGap: "12px",
  gridRowGap: "12px",
}

const base = {
  backgroundColor: "lightBlue",
  width: "24%",
}

class App extends Component {
  state = {
    cards: this.createCards(),
    currentPair: [],
    matchedCardIndices: [],
  }

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }

    if (currentPair.includes(index)) {
      return indexMatched;
    }
    return indexMatched ? 'visible' : 'hidden'
  }
  
  createCards() {
    const result = []
    const size = 24
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

  handleClick = index => {
    const { currentPair } = this.state

    if (currentPair.length === 2) {
      return;
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] })
      return;
    }
    this.handleNewPairClosedBy(index)
  }

  handleNewPairClosedBy(index) {
    const { cards, currentPair, matchedCardIndices } = this.state

    const newPair = [currentPair[0], index]

    const matched = cards[newPair[0]] === cards[newPair[1]]
    this.setState({ currentPair: newPair })
    if (matched) {
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), SHOW_TIME)
  }

  render() {
    const { cards } = this.state
    return (
      <div style={base} className="App">
        <div style={parent}>
            {cards.map((card, index) => (
              <Card
                card={card}
                feedback={this.getFeedbackForCard(index)}
                key={index}
                index={index}
                onClick={this.handleClick}
              />
            ))}

        </div>
      </div>
    )
  }
}

export default App