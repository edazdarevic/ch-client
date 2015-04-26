var React = require('react');
var CompanyActions = require('../actions/companyActions');
var CompanyStore = require('../stores/companyStore');

var CompanyList = React.createClass({
  getInitialState: function() {
    return CompanyStore.getUploadState();
  },
  componentDidMount: function() {
    CompanyStore.addChangeListener(this.onStoreChange);
  },
  componentWillUnmount: function() {
    CompanyStore.removeChangeListener(this.onStoreChange);
  },
  onStoreChange: function() {
    this.setState(CompanyStore.getUploadState());

    if(!CompanyStore.getUploadState().open) {
      this.clearFileInput();
      $(React.findDOMNode(this)).find("#attachModal").closeModal();
    }
  },
  onRowClick: function(companyId, e) {
    CompanyActions.loadCompanyDetails(companyId);
    e.preventDefault();
  },
  onAttachClick: function(company, e) {
    $(React.findDOMNode(this)).find("#attachModal").openModal();
    CompanyActions.attachPassportStart(company.id);
    e.preventDefault();
  },
  clearFileInput: function() {
    var file = $(React.findDOMNode(this)).find("#file");
    file.replaceWith(file.val('').clone(true));
  },
  onCancelClick: function(e) {
    CompanyActions.attachPassportCancel();
    e.preventDefault();
  },
  onUploadClick: function(e) {
    var file = $(React.findDOMNode(this)).find("#file");
    CompanyActions.attachPassportUpload(file[0].files[0]);
    e.preventDefault();
  },
  attachDialog: function() {
    var validationInfo;
    if(!this.state.valid) {
      validationInfo = <p style={{ color: 'red' }}>
        Please select a PDF file to upload.</p>
    }

    var cancelStyle = {};
    if(this.state.uploading) {
      cancelStyle['display'] = 'none';
    }

    return (<div id="attachModal" className="modal">
      <div className="modal-content">
        <h4>Attach a passport of a benefical owner or a director</h4>
        <p>Please provide PDF version of the passport.</p>
        <input type='file' id="file" accept="application/pdf" />
        {validationInfo}
      </div>
      <div className="modal-footer">
        <button className="waves-effect waves-light btn"
          style={cancelStyle} onClick={this.onCancelClick}>Cancel</button>

        <button className="waves-effect waves-light btn"
          disabled={this.state.uploading}
          onClick={this.onUploadClick}>
          {this.state.uploading ? "Uploading. Please wait..." : "Upload"}
        </button>
      </div>
    </div>)
  },
  render: function() {
    var rows = [];

    for (var i = 0; i < this.props.companies.length; i++) {
      rows.push(<tr>
        <td>{this.props.companies[i].id}</td>
        
        <td><a href="#"
          onClick={this.onRowClick.bind(this, this.props.companies[i].id)}>
          {this.props.companies[i].name}</a></td>
        <td>{this.props.companies[i].country}</td>

        <td><a href="#attachModal" className="modal-trigger"
          onClick={this.onAttachClick.bind(this, this.props.companies[i])}>
          Attach passport</a></td>
      </tr>);
    }
    return (<div>
      <table className="hoverable responsive-table">
       <thead>
         <tr>
             <th>ID</th>
             <th>Company Name</th>
             <th>Country</th>
             <th>Action</th>
         </tr>
       </thead>
       <tbody>
          {rows}
       </tbody>
     </table>
     {this.attachDialog()}
     </div>);
  }
});

module.exports = CompanyList;
