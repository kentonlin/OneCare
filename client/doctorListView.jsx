class DoctorListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: []
    }
    this.makeDocs = this.makeDocs.bind(this);
  }

  makeDocs(doctors) {
    this.setState({doctors: doctors});
  }

  componentDidMount() {
    $.get("/api/doctor/find", this.makeDocs)
  }

  render() {
    return (
      <div className="doctor-list-view"> 
        {
         this.state.doctors.map((doctor, idx) => {
          return (<DoctorView key={idx} name={doctor.name} phone={doctor.phone} fax={doctor.fax} address={doctor.address} specialty={doctor.specialty} />)
         }, this)
        }
      </div>
    )
  }

}