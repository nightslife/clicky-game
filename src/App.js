import React, {Component} from 'react';
import './App.css';
import picsArray from './picArray'
import shuffle from './shuffle'

let shuffledArray = shuffle(picsArray);

class App extends Component {

  componentDidMount() {
    this.setState({loadArray: shuffledArray})
  }

  state = {
  loadArray: [],
  picsPicked: [],
  rightWrong: ["Click your favorite dog to get started!", " Clicking the same dog twice causes the others to get jealous"],
  score: 0,
  topScore: 0
  }

  onPick = (id) => {
    console.log(id);
    let temp = this.state.picsPicked;
    if (this.state.picsPicked.indexOf(id) === -1) {
      console.log("right!");

      temp.push(id);
      this.setState({
        picsPicked: temp,
        score: this.state.score + 1,
        rightWrong: ["Keep Going! Which is your favorite so far?"]
      }, function(){
        if(this.state.score > this.state.topScore){
          this.setState({topScore: this.state.score})
        }
        if(this.state.score === 12){
          this.setState({
            rightWrong: ["Congrats!", "You must really love all the dogs!"],
            score: 0})
        }
        console.log('Picked: '+ this.state.picsPicked + ' - Score: ' + this.state.score)})
    } else {
      console.log("wrong!");
      temp = [];
      this.setState({
        picsPicked: temp,
        score: 0,
        rightWrong: ["Oh no! The other dogs got too jealous", "Don't worry, your top score has been saved!"]
      }, function(){
          console.log('Picked: '+ this.state.picsPicked + ' - Score: ' + this.state.score)})
      console.log('Score: ' + this.state.score);
    }
    let shuffledArray = shuffle(this.state.loadArray);
    this.setState({loadArray: shuffledArray});
  };

  render() {
    return (
      <div className="App">
        <header>
        <h2>{this.state.rightWrong[0]}</h2>
          <h2>{this.state.rightWrong[1]}</h2>
          <h2>Score: {this.state.score}</h2>
          <h2>Top Score: {this.state.topScore}</h2>
        </header>
          <div id="game">
            {shuffledArray.map(pic =>
              <img 
                key={pic[0]}
                src={"./images/" + pic[1]} 
                alt={"This is my favorite dog pic"}
                id={pic[0]}
                onClick={() => this.onPick(pic[0])}>
              </img>
            )}
        </div>
      </div>
    );
  }
}

export default App;
