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

// import $ from 'jquery';

var DoctorEntryView = function (_React$Component) {
  _inherits(DoctorEntryView, _React$Component);

  function DoctorEntryView(props) {
    _classCallCheck(this, DoctorEntryView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DoctorEntryView).call(this, props));

    _this.state = {
      // user: {
      //   username: window.localStorage.get("username") || "default",
      //   userId: window.localStorage.get("userId") || "default"
      // },
      name: "",
      phone: "",
      fax: "",
      address: "",
      specialty: ""
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.submitNewDoctor = _this.submitNewDoctor.bind(_this);
    return _this;
  }

  _createClass(DoctorEntryView, [{
    key: "handleChange",
    value: function handleChange(event) {
      var stateVal = event.target.id;
      if (stateVal === "name") {
        this.setState({ name: event.target.value });
      } else if (stateVal === "phone") {
        this.setState({ phone: event.target.value });
      } else if (stateVal === "fax") {
        this.setState({ fax: event.target.value });
      } else if (stateVal === "address") {
        this.setState({ address: event.target.value });
      } else if (stateVal === "specialty") {
        this.setState({ specialty: event.target.value });
      }
    }
  }, {
    key: "submitNewDoctor",
    value: function submitNewDoctor(formData) {
      console.log("this.state is: ", this.state);
      $.ajax({
        type: "POST",
        url: "/api/doctor/add",
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify(this.state)
      }).then(function (res) {
        console.log("Doctor registration success!  ");
      }).catch(function (err) {
        console.error("Doctor not registered.  ", err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "doctor-input" },
        _react2.default.createElement(
          "h2",
          null,
          "Input a new doctor!"
        ),
        _react2.default.createElement(
          "form",
          null,
          _react2.default.createElement(
            "span",
            null,
            "Name"
          ),
          _react2.default.createElement("input", { id: "name", type: "text", onChange: this.handleChange }),
          _react2.default.createElement(
            "span",
            null,
            "Phone"
          ),
          _react2.default.createElement("input", { id: "phone", type: "text", onChange: this.handleChange }),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "span",
            null,
            "Fax"
          ),
          _react2.default.createElement("input", { id: "fax", type: "text", onChange: this.handleChange }),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "span",
            null,
            "Address"
          ),
          _react2.default.createElement("input", { id: "address", type: "text", onChange: this.handleChange }),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "span",
            null,
            "Specialty"
          ),
          _react2.default.createElement(
            "select",
            { id: "specialty", onChange: this.handleChange },
            _react2.default.createElement(
              "option",
              null,
              "::Select Specialty::"
            ),
            _react2.default.createElement(
              "option",
              null,
              "A"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Allergology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Andrology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Anesthesia‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Angiology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Aviation medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "B"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Biomedicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "C"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Cardiology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "D"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Dentistry‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Dentistry branches‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Dermatology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Disaster medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Sports physicians‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "E"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Emergency medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Endocrinology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "F"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Family medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Fictional medical specialists‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "G"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Gastroenterology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "General practice‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Medical genetics‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Geriatrics‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Gerontology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Gynaecology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "H"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Hematology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Hepatology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "I"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Immunology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Infectious diseases‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Intensive care medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Internal medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "M"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Men's health‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Military medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "N"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Nephrology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Neurology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Nuclear medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "O"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Obstetrics‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Oncology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Ophthalmology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Otorhinolaryngology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "P"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Palliative medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Pathology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Pediatrics‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Podiatry‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Preventive medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Prison medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Psychiatric specialities‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Psychiatry‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Pulmonology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "R"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Radiology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Rehabilitation medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Rheumatology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "S"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Serology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Sexual health‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Sleep medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Space medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Sports medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Surgery‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Surgical specialties‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "T"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Toxicology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Transplantation medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Trichology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "Tropical medicine‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "U"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Urology‎ "
            ),
            _react2.default.createElement(
              "option",
              null,
              "W"
            ),
            _react2.default.createElement(
              "option",
              null,
              "Wilderness medicine‎ "
            )
          ),
          _react2.default.createElement(
            "button",
            { onClick: this.submitNewDoctor },
            "Submit!"
          )
        ),
        _react2.default.createElement("hr", null),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "h3",
            null,
            "Your current doctors: "
          )
        )
      );
    }
  }]);

  return DoctorEntryView;
}(_react2.default.Component);

exports.default = DoctorEntryView;