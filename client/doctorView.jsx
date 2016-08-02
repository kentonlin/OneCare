class DoctorView extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="doctor-view-container">
        <div><span>Name: </span>{this.props.name}</div>
        <div><span>Phone: </span>{this.props.phone}</div>
        <div><span>Fax: </span>{this.props.fax}</div>
        <div><span>Address: </span>{this.props.address}</div>
        <div><span>Specialty: </span>{this.props.specialty}</div>
      </div>
      )
  }
}
