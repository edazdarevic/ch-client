var React = require('react');
var CompanyStore = require('./stores/companyStore');
var CompanyActions = require('./actions/companyActions');
var CompanyList = require('./components/companyList');
var CompanyDetails = require('./components/companyDetails');

var Main = React.createClass({
  getInitialState: function() {
    return {
      companies: CompanyStore.getCompanies(),
      companyDetails: CompanyStore.getCompanyDetails(),
      validations: CompanyStore.getValidations()
    };
  },
  componentDidMount: function() {
    CompanyStore.addChangeListener(this.onStoreChange);
    CompanyActions.loadCompanies();
  },
  componentWillUnmount: function() {
    CompanyStore.removeChangeListener(this.onStoreChange);
  },
  onStoreChange: function() {
    this.setState({
      companies: CompanyStore.getCompanies(),
      companyDetails: CompanyStore.getCompanyDetails(),
      validations: CompanyStore.getValidations()
    });
  },
  onNewClick: function(e) {
    CompanyActions.newCompany();
    e.preventDefault();
  },
   render: function() {
    var addNewButton;
    if(!this.state.companyDetails) {
      addNewButton = <button className="waves-effect waves-light btn"
        onClick={this.onNewClick}>Add New Company</button>;
    }

    return (<div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Company API Front-end</a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h4>List of Companies</h4>
            </div>
          </div>
          <div className="row">
            <div className="col s8">
              <CompanyList companies={this.state.companies} />
              {addNewButton}
            </div>
            <div className="col s4">
              <CompanyDetails company={this.state.companyDetails}
                validations={this.state.validations} />
            </div>
          </div>

        </div>
      </div>);
   }
 });

module.exports = {
  ready: function() {
    React.render(<Main />, document.body);
  }
};
