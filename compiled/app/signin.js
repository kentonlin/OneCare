"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signin = function (_React$Component) {
  _inherits(Signin, _React$Component);

  function Signin(props) {
    _classCallCheck(this, Signin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Signin).call(this, props));

    _this.state = {
      username: "",
      password: ""
    };
    return _this;
  }

  _createClass(Signin, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: "signin-container" },
        _react2.default.createElement(
          "h1",
          null,
          "Sign in to OneCare"
        ),
        _react2.default.createElement(
          "span",
          null,
          "username"
        ),
        _react2.default.createElement("input", { type: "text", onChange: function onChange(event) {
            _this2.setState({ username: event.target.value });
          } }),
        _react2.default.createElement("br", null),
        _react2.default.createElement(
          "span",
          null,
          "password"
        ),
        _react2.default.createElement("input", { type: "text", onChange: function onChange(event) {
            _this2.setState({ password: event.target.value });
          } }),
        _react2.default.createElement("br", null),
        _react2.default.createElement(
          "div",
          { className: "signin-button", onClick: function onClick() {
              window.localStorage.setItem("username", "Patrick");
              window.localStorage.setItem("token", "KrustyKrab");
              $.get("/", function (data) {
                console.log("login successful!");
                location.reload();
              });
            } },
          "Log thyself in."
        )
      );
    }
  }]);

  return Signin;
}(_react2.default.Component);

exports.default = Signin;