import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import ButtonComponent from '../src/components/Button';

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class App extends Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.countDown = this.countDown.bind(this);
    this.state = {
      random: Math.floor(Math.random() * 10 + 1),
      start: false,
      isWon: false,
      end: true,
      reset: 1,
      time: {},
      btnArr: [],
      seconds: 11,
      btnArrFix: []
    };
  }
  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentWillMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  startFunc = () => {
    this.setState({ start: true });
  };

  start = () => {
    return (
      <div className="div-start">
        {!this.state.start && (
          <button
            type="button"
            className="start btn btn-success"
            onClick={this.startFunc}
          >
            Start
          </button>
        )}
      </div>
    );
  };

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
    // document.getElementById("progressBar").value = 10 - --seconds;
    this.refs.myTextInput.value = 10 - --seconds;
    // Check if we're at zero.
    if (seconds === -1) {
      clearInterval(this.timer);
      // alert("you lose");
      this.setState({ end: false });
    }
  }

  printStar = () => {
    let stars = [];
    for (let i = 0; i < this.state.random; i++) {
      stars.push(<span className="fa fa-star" key={i} />);
    }
    return stars;
  };

  closeArray() {
    this.setState({
      btnArr: []
    });
  }

  handleClick() {
    let sum = 0;
    let b;
    this.state.btnArr.map((number, index) => {
      b = Number(number);
      sum = sum + b;
    });

    if (sum === this.state.random) {
      const rand = Math.floor(Math.random() * 10 + 1);
      this.setState({ random: rand });
      this.state.btnArr.map((number, index) => {
        this.state.btnArrFix.push(number);
        this.setState(this.state.btnArrFix);
      });
      this.closeArray();
      clearInterval(this.timer);
      this.timer = 0;
      this.setState({ seconds: 11 });
      this.startTimer();
      if (this.state.btnArrFix.length === 10) {
        clearInterval(this.timer);
        this.setState({ end: false });
        this.setState({ isWon: true });
      }
    } else {
      // alert("you lose");
      clearInterval(this.timer);
      this.setState({ end: false });
    }
  }

  createBtn = e => {
    this.setState({
      btnArr: [...this.state.btnArr, Number(e.target.value)]
    });
  };

  choseBtn() {
    const listButtons = this.state.btnArr.map((number, index) => (
      <ButtonComponent
        value={number}
        id={number}
        onClick={e => this.remove(e)}
      />
    ));
    return (
      <div id="right-contain" className="right-contain">
        {listButtons}
      </div>
    );
  }

  remove = e => {
    if (!e.target.value) return;
    let index = this.state.btnArr.indexOf(Number(e.target.value));
    // this.state.btnArr.splice(index, 1);
    // this.setState(
    //   this.state
    // )

    this.setState({
      btnArr: [...this.state.btnArr.splice(index, 1)]
    });
    // this.setState({
    //   btnArr: [_.remove(btnArr, [(1 = _.index)])]
    // });
  };

  reset = () => {
    this.setState({ reset: this.state.reset + 1 });
    clearInterval(this.timer);
    this.timer = 0;
    this.setState({ seconds: 11 });
    this.startTimer();
    const rands = Math.floor(Math.random() * 10 + 1);
    this.setState({ random: rands });
    this.closeArray();
    if (this.state.reset === 5) {
      // alert("you lose");
      clearInterval(this.timer);
      this.setState({ end: false });
    }
  };

  end = () => {
    return (
      <div>
        {this.state.end === false && (
          <div className="div-end">
            <div className="mes">
              {this.state.isWon === false ? 'You Lose!' : 'You Won!'}
            </div>
            <div className="btn-restart">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.restart}
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  restart = () => {
    this.closeArray();
    this.setState({
      btnArrFix: []
    });
    this.setState({ end: true });
    this.setState({ reset: 1 });
    this.timer = 0;
    this.setState({ seconds: 11 });
    this.startTimer();
  };

  // printNum() {
  //   const listButtons = number.map((number, index) =>
  //     <ButtonComponent value={number} id={number} btnStyle={(this.state.btnArr.indexOf(number) !== -1 || this.state.btnArrFix.indexOf(number) !== -1) ? (true) : (false)} onClick={(e) => this.createBtn(e)} disableBtn={this.state.btnArr.indexOf(number) !== -1 || this.state.btnArrFix.indexOf(number) !== -1} />
  //   );
  //   return (
  //     <div>
  //       {listButtons}
  //     </div>
  //   );
  // }

  render() {
    const listButtons = number.map((number, index) => (
      <ButtonComponent
        value={number}
        id={number}
        onClick={e => this.createBtn(e)}
        disableBtn={
          this.state.btnArr.indexOf(number) !== -1 ||
          this.state.btnArrFix.indexOf(number) !== -1
        }
      />
    ));
    return (
      <div>
        {this.start()}
        {this.state.end &&
          this.state.start && (
            <div className="total-contain">
              <div className="container">
                <div className="contain" id="contain">
                  <div className="star">{this.printStar()}</div>
                </div>
                <button className="equal" onClick={this.handleClick}>
                  {' '}
                  ={' '}
                </button>
                <button className="reset" onClick={this.reset}>
                  {' '}
                  reset{' '}
                </button>
                {this.choseBtn()}
              </div>
              <div>{this.startTimer()}</div>
              <div>Your time:</div>
              <progress value="0" max="10" ref="myTextInput" id="progressBar" />
              <div className="btn-cover">
                <div className="star">{listButtons}</div>
              </div>
            </div>
          )}
        {this.end()}
      </div>
    );
  }
}

export default App;
