var React = require('react');
var CompanyActions = require('../actions/companyActions');

var CompanyDetails = React.createClass({
  onFieldUpdate: function(fieldName, e) {
    CompanyActions.changeCompanyDetails(fieldName, e.currentTarget.value);
  },
  onSaveClick: function(e) {
    CompanyActions.saveCompanyDetails();
    e.preventDefault();
  },
  onCancelClick: function(e) {
    CompanyActions.cancelEditing();
    e.preventDefault();
  },
  getValidationErrorFor: function(field) {
    return <div style={{ color: 'red' }}>{this.props.validations[field]}</div>
  },
  render: function() {
    if(!this.props.company) {
       return (<div></div>);
    }

    var content = (<div>
      <h5>Details about company {this.props.company.id}</h5>
      <div className="row">
        <div className="input-field col s12">
          <input id="name" placeholder="Company Name"
            onChange={this.onFieldUpdate.bind(this, 'name')}
            type="text" className="validate"
            value={this.props.company.name}/>
          {this.getValidationErrorFor('name')}
        </div>

        <div className="input-field col s12">
          <input id="address" placeholder="Address"
            onChange={this.onFieldUpdate.bind(this, 'address')}
            type="text" className="validate"
            value={this.props.company.address}/>

          {this.getValidationErrorFor('address')}
        </div>

        <div className="input-field col s12">
          <input id="city" placeholder="City"
            onChange={this.onFieldUpdate.bind(this, 'city')}
            type="text" className="validate"
            value={this.props.company.city}/>
          {this.getValidationErrorFor('city')}
        </div>

        <div className="input-field col s12">
          <input id="country" placeholder="Country"
            onChange={this.onFieldUpdate.bind(this, 'country')}
            type="text" className="validate"
            value={this.props.company.country}/>
          {this.getValidationErrorFor('country')}
        </div>

        <div className="input-field col s12">
          <input id="email" placeholder="Email"
            onChange={this.onFieldUpdate.bind(this, 'email')}
            type="text" className="validate"
            value={this.props.company.email}/>
        </div>

        <div className="input-field col s12">
          <input id="phone_number" placeholder="Phone number"
            onChange={this.onFieldUpdate.bind(this, 'phone_number')}
            type="text" className="validate"
            value={this.props.company.phone_number}/>
        </div>

        <div className="input-field col s12">
          <button className="waves-effect waves-light btn"
            onClick={this.onSaveClick}>Save</button>

          <button className="waves-effect waves-light btn"
            onClick={this.onCancelClick}>Cancel</button>
        </div>
      </div>
    </div>);

    return content;
  }
});

module.exports = CompanyDetails;
