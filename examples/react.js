class App extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      myValue: "Initial Value",
      inputValue: "input value",
    };
  }

  render() {
    const { myValue, count, inputValue } = this.state;
    const onClick = () => {
      console.log("Outer React Click");

      const current = this.state.count;
      this.setState({ count: current + 1 });
    };

    const handleChange = (event) => {
      this.setState({ myValue: event.target.value });
    };

    const handleInput = (event) => {
      this.setState({ inputValue: event.target.value });
    };

    const handleSubmit = (event) => {
      alert("A name was submitted: " + this.state.value);
      event.preventDefault();
    };

    return React.createElement(`
    <div class="container">
          <br />
          <albs-button onClick={onClick}>
            Web Component Button {count}
          </albs-button>
          <hr />
          <h2>Form</h2> - {myValue}
          <form onSubmit={handleSubmit}>
            <input type="text" value={myValue} onChange={handleChange} />
            <input type="email" required />
            <albs-input type="text" value={myValue} onChange={handleChange}>
              {" "}
            </albs-input>
            <albs-input type="search" required="true">
              {" "}
            </albs-input>
  
            <hr />
            <label for="with-on-input">Com onInput</label>
            <albs-input
              type="text"
              id="with-on-input"
              value={inputValue}
              onInput={handleInput}
            ></albs-input>
            <p> {inputValue} </p>
            <hr />
            <albs-button type="submit">Submit</albs-button>
            <albs-button type="reset">Reset</albs-button>
          </form>
        </div>`);
    // return React.createElement("div", null, `Hello ${this.state.myValue}`);
  }
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
