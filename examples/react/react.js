class App extends React.Component {
  state = {
    count: 0,
    myValue: "Initial Value",
  };
  change = (myValue) => {
    this.setState({ myValue });
  };
  render() {
    const { myValue, count } = this.state;
    const onClick = () => {
      const current = this.state.count;
      this.setState({ count: current + 1 });
    };

    return (
      <div class="container">
        <form>
          Value: {myValue}
          <br />
          <albs-input value={myValue} onChange={this.change}></albs-input>
          <albs-button id="submit" type="submit">
            Web Component Button - Submit
          </albs-button>
          <albs-button id="reset" type="reset">
            Web Component Button - reset
          </albs-button>
          <albs-button onClick={onClick}>
            Web Component Button {count}
          </albs-button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
