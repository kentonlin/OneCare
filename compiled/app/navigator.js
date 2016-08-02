'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signin = require('./signin.jsx');

var _signin2 = _interopRequireDefault(_signin);

var _doctorEntryView = require('./doctorEntryView.jsx');

var _doctorEntryView2 = _interopRequireDefault(_doctorEntryView);

var _doctorListView = require('./doctorListView.jsx');

var _doctorListView2 = _interopRequireDefault(_doctorListView);

var _scriptRemind = require('./scriptRemind.jsx');

var _scriptRemind2 = _interopRequireDefault(_scriptRemind);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import ScriptRemind from './scriptRemind.jsx';

var Navigator = function (_React$Component) {
  _inherits(Navigator, _React$Component);

  function Navigator(props) {
    _classCallCheck(this, Navigator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Navigator).call(this, props));

    _this.state = {
      $mainRender: document.getElementById("main-render"),
      username: window.localStorage.username || "none",
      token: window.localStorage.token || "none"
    };
    _this.viewDocs = _this.viewDocs.bind(_this);
    _this.enterDocs = _this.enterDocs.bind(_this);
    // this.scriptReminder = this.scriptReminder.bind(this);
    _this.authCheck = _this.authCheck.bind(_this);
    return _this;
  }

  ////


  _createClass(Navigator, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ $mainRender: document.getElementById("main-render") });
      console.log("username", this.state.username, "token", this.state.token);
      this.authCheck(function (username, token) {
        console.log("authentication complete!");
        // this.enterDocs();
      });
    }
  }, {
    key: 'authCheck',
    value: function authCheck(cb) {
      if (this.state.username === "none" || this.state.token === "none") {
        //re-route to login page
        _reactDom2.default.render(_react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_signin2.default, null)
        ), document.getElementById("app"));
      } else {
        cb(this.state.username, this.state.token);
      }
    }
  }, {
    key: 'enterDocs',
    value: function enterDocs() {
      var $target = this.state.$mainRender;
      console.log($target);
      _reactDom2.default.render(_react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_doctorEntryView2.default, null)
      ), $target);
      console.log("Narf!");
    }
  }, {
    key: 'viewDocs',
    value: function viewDocs() {
      var $target = this.state.$mainRender;
      console.log($target);
      _reactDom2.default.render(_react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_doctorListView2.default, null)
      ), $target);
      console.log("troz!");
    }

    // scriptReminder() {
    //   var $target = this.state.$mainRender;
    //   console.log($target);
    //   ReactDOM.render(<div>
    //       <ScriptRemind />
    //     </div>, $target);
    // }

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'navbar-container' },
        _react2.default.createElement(
          'h1',
          null,
          'Welcome to OneCare!'
        ),
        _react2.default.createElement(
          'div',
          { className: 'navbar-button navbar-view-doctors', onClick: this.viewDocs },
          ' View Your Doctors '
        ),
        _react2.default.createElement(
          'div',
          { className: 'navbar-button navbar-enter-doctors', onClick: this.enterDocs },
          ' Enter New Doctor '
        ),
        _react2.default.createElement(
          'div',
          { className: 'navbar-button navbar-enter-doctors', onClick: this.scriptReminder },
          ' New Prescription? '
        ),
        _react2.default.createElement(
          'div',
          { className: 'navbar-button navbar-enter-doctors', onClick: function onClick() {
              window.localStorage.removeItem("username");window.localStorage.removeItem("token");location.reload();
            } },
          ' Logout '
        )
      );
    }
  }]);

  return Navigator;
}(_react2.default.Component);

exports.default = Navigator;