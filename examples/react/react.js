class App extends React.Component {
  state = {
    count: 0,
    myValue: "Initial Value",
  };
  change = (myValue) => {
    console.log("change", myValue);
    this.setState({ myValue });
  };
  render() {
    const { myValue, count } = this.state;
    const onClick = () => {
      console.log("Outer React Click");

      const current = this.state.count;
      this.setState({ count: current + 1 });
    };

    return (
      <div class="container">
        Value: {myValue}
        <br />
        <albs-input value={myValue} onChange={this.change}></albs-input>
        <albs-button onClick={onClick}>
          Web Component Button {count}
        </albs-button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));