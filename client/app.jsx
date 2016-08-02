

class App extends React.Component {
  render() {
    return(
      <div>
        <Navigator />
        <div id="main-render"></div>
      </div>
      )
  }
}

ReactDOM.render(<div>
   <App />
  </div>, document.getElementById("app"));