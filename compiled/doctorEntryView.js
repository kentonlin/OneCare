"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import React, { Component } from 'react';
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
      return React.createElement(
        "div",
        { className: "doctor-input" },
        React.createElement(
          "h2",
          null,
          "Input a new doctor!"
        ),
        React.createElement(
          "form",
          null,
          React.createElement(
            "span",
            null,
            "Name"
          ),
          React.createElement("input", { id: "name", type: "text", onChange: this.handleChange }),
          React.createElement(
            "span",
            null,
            "Phone"
          ),
          React.createElement("input", { id: "phone", type: "text", onChange: this.handleChange }),
          React.createElement("br", null),
          React.createElement(
            "span",
            null,
            "Fax"
          ),
          React.createElement("input", { id: "fax", type: "text", onChange: this.handleChange }),
          React.createElement("br", null),
          React.createElement(
            "span",
            null,
            "Address"
          ),
          React.createElement("input", { id: "address", type: "text", onChange: this.handleChange }),
          React.createElement("br", null),
          React.createElement(
            "span",
            null,
            "Specialty"
          ),
          React.createElement(
            "select",
            { id: "specialty", onChange: this.handleChange },
            React.createElement(
              "option",
              null,
              "::Select Specialty::"
            ),
            React.createElement(
              "option",
              null,
              "A"
            ),
            React.createElement(
              "option",
              null,
              "Allergology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Andrology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Anesthesia‎ "
            ),
            React.createElement(
              "option",
              null,
              "Angiology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Aviation medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "B"
            ),
            React.createElement(
              "option",
              null,
              "Biomedicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "C"
            ),
            React.createElement(
              "option",
              null,
              "Cardiology‎ "
            ),
            React.createElement(
              "option",
              null,
              "D"
            ),
            React.createElement(
              "option",
              null,
              "Dentistry‎ "
            ),
            React.createElement(
              "option",
              null,
              "Dentistry branches‎ "
            ),
            React.createElement(
              "option",
              null,
              "Dermatology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Disaster medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Sports physicians‎ "
            ),
            React.createElement(
              "option",
              null,
              "E"
            ),
            React.createElement(
              "option",
              null,
              "Emergency medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Endocrinology‎ "
            ),
            React.createElement(
              "option",
              null,
              "F"
            ),
            React.createElement(
              "option",
              null,
              "Family medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Fictional medical specialists‎ "
            ),
            React.createElement(
              "option",
              null,
              "G"
            ),
            React.createElement(
              "option",
              null,
              "Gastroenterology‎ "
            ),
            React.createElement(
              "option",
              null,
              "General practice‎ "
            ),
            React.createElement(
              "option",
              null,
              "Medical genetics‎ "
            ),
            React.createElement(
              "option",
              null,
              "Geriatrics‎ "
            ),
            React.createElement(
              "option",
              null,
              "Gerontology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Gynaecology‎ "
            ),
            React.createElement(
              "option",
              null,
              "H"
            ),
            React.createElement(
              "option",
              null,
              "Hematology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Hepatology‎ "
            ),
            React.createElement(
              "option",
              null,
              "I"
            ),
            React.createElement(
              "option",
              null,
              "Immunology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Infectious diseases‎ "
            ),
            React.createElement(
              "option",
              null,
              "Intensive care medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Internal medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "M"
            ),
            React.createElement(
              "option",
              null,
              "Men's health‎ "
            ),
            React.createElement(
              "option",
              null,
              "Military medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "N"
            ),
            React.createElement(
              "option",
              null,
              "Nephrology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Neurology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Nuclear medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "O"
            ),
            React.createElement(
              "option",
              null,
              "Obstetrics‎ "
            ),
            React.createElement(
              "option",
              null,
              "Oncology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Ophthalmology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Otorhinolaryngology‎ "
            ),
            React.createElement(
              "option",
              null,
              "P"
            ),
            React.createElement(
              "option",
              null,
              "Palliative medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Pathology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Pediatrics‎ "
            ),
            React.createElement(
              "option",
              null,
              "Podiatry‎ "
            ),
            React.createElement(
              "option",
              null,
              "Preventive medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Prison medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Psychiatric specialities‎ "
            ),
            React.createElement(
              "option",
              null,
              "Psychiatry‎ "
            ),
            React.createElement(
              "option",
              null,
              "Pulmonology‎ "
            ),
            React.createElement(
              "option",
              null,
              "R"
            ),
            React.createElement(
              "option",
              null,
              "Radiology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Rehabilitation medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Rheumatology‎ "
            ),
            React.createElement(
              "option",
              null,
              "S"
            ),
            React.createElement(
              "option",
              null,
              "Serology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Sexual health‎ "
            ),
            React.createElement(
              "option",
              null,
              "Sleep medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Space medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Sports medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Surgery‎ "
            ),
            React.createElement(
              "option",
              null,
              "Surgical specialties‎ "
            ),
            React.createElement(
              "option",
              null,
              "T"
            ),
            React.createElement(
              "option",
              null,
              "Toxicology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Transplantation medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "Trichology‎ "
            ),
            React.createElement(
              "option",
              null,
              "Tropical medicine‎ "
            ),
            React.createElement(
              "option",
              null,
              "U"
            ),
            React.createElement(
              "option",
              null,
              "Urology‎ "
            ),
            React.createElement(
              "option",
              null,
              "W"
            ),
            React.createElement(
              "option",
              null,
              "Wilderness medicine‎ "
            )
          ),
          React.createElement(
            "button",
            { onClick: this.submitNewDoctor },
            "Submit!"
          )
        ),
        React.createElement("hr", null),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            null,
            "Your current doctors: "
          )
        )
      );
    }
  }]);

  return DoctorEntryView;
}(React.Component);