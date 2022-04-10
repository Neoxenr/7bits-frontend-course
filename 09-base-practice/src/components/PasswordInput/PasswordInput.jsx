import React from 'react';

import './style.css';

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      type: "password",
      modificator: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClick() {
    this.setState({
      type: this.state.type === "password" ? "text" : "password",
      modificator: this.state.modificator === "" ? "form__toggle_view" : ""
    });
  }

  render() {
    return (
      <div className="form-wrapper">
        <form className="form">
          <input className="form__password" placeholder="Password" type={this.state.type} value={this.state.value} onChange={this.handleChange} maxLength="40" />
          <input className={`form__toggle ${this.state.modificator}`} type="button" onClick={this.handleClick} />
        </form>
      </div>
    )
  }
}

export default PasswordInput;