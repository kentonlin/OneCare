class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }
  render() {
    return (
      <div className="signin-container">
        <h1>Sign in to OneCare</h1>
        <span>username</span><input type="text" onChange={(event) => {this.setState({username: event.target.value})}}></input><br />
        <span>password</span><input type="text" onChange={(event) => {this.setState({password: event.target.value})}}></input><br />
        <div className="signin-button" onClick={() => {
          window.localStorage.setItem("username", "Patrick");
          window.localStorage.setItem("token", "KrustyKrab");
          $.get("/", function(data) {
            console.log("login successful!");
            location.reload();
          })
        }}>Log thyself in.</div>
      </div>
    )
  }
}