'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _doctorView = require('./doctorView.jsx');

var _doctorView2 = _interopRequireDefault(_doctorView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DoctorListView = function (_React$Component) {
  _inherits(DoctorListView, _React$Component);

  function DoctorListView(props) {
    _classCallCheck(this, DoctorListView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DoctorListView).call(this, props));

    _this.state = {
      doctors: []
    };
    _this.makeDocs = _this.makeDocs.bind(_this);
    return _this;
  }

  _createClass(DoctorListView, [{
    key: 'makeDocs',
    value: function makeDocs(doctors) {
      this.setState({ doctors: doctors });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $.get("/api/doctor/find", this.makeDocs);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'doctor-list-view' },
        this.state.doctors.map(function (doctor, idx) {
          return _react2.default.createElement(_doctorView2.default, { key: idx, name: doctor.name, phone: doctor.phone, fax: doctor.fax, address: doctor.address, specialty: doctor.specialty });
        }, this)
      );
    }
  }]);

  return DoctorListView;
}(_react2.default.Component);

exports.default = DoctorListView;