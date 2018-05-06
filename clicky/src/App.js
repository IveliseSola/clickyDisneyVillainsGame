import React, { Component } from 'react';
import Villains from "./components/Villains";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Jumbotron from "./components/Jumbotron";
import { Container, Row, Col } from "./components/Grid";
import villainsArray from "./villains.json";
import './App.css';

class App extends Component {

  state = {
    villainsArray,
    currentScore: 0,
    bestScore: 0
  };

  handleClick = id => {

    const villainsArray = this.state.villainsArray;

    const clickedVillain = villainsArray.filter(villain => villain.id === id);

    if (clickedVillain[0].clicked) {

      // this.setState({ currentScore: 0 });

      villainsArray.forEach((villain, i) => {
        villain[i].clicked = false;
      });

      this.setState({ currentScore: 0 });
      this.setState({ villainsArray });

    } else if (this.state.currentScore < 7) {

      clickedVillain[0].clicked = true;

      this.state.currentScore += 1;

      if (this.state.currentScore > this.state.bestScore) {
        // this.state.bestScore = this.state.currentScore;
        this.setState({ bestScore: this.state.currentScore });
      }

      villainsArray.sort((a, b) => { return 0.5 - Math.random() });

      this.setState({ villainsArray: villainsArray });
      this.setState({ currentScore: this.state.currentScore });

    } else {

      clickedVillain[0].clicked = true;

      this.setState({ currentScore: 0 });

      alert(`WOW!!! You win! Let's see if you can do it again!`);
      // this.state.bestScore = 8;
      this.setState({ bestScore: 8 });

      villainsArray.forEach((villain, i) => {
        villain[i].clicked = false;
      });

      villainsArray.sort(function (a, b) { return 0.5 - Math.random() });

      this.setState({ villainsArray: villainsArray });
      this.setState({ currentScore: this.state.currentScore });
    }
  };

  render() {
    return (
      <Wrapper>
        <Nav
          score={this.state.currentScore}
          topScore={this.state.topScore}
        />

        <Jumbotron>

        </Jumbotron>

        <Container>
          <Row>
            {this.state.villainsArray.map(villain => (
              <Col size="md-3 sm-6">
                <Villains
                  key={villain.id}
                  handleClick={this.handleClick}
                  id={villain.id}
                  image={villain.image}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}


export default App;