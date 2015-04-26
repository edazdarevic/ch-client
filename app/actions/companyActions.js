var AppDispatcher = require('../dispatcher/appDispatcher');
var CompanyConstants = require('../constants/companyConstants');

var CompanyActions = {
  loadCompanies: function() {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.LOAD_COMPANIES
    });
  },
  loadCompanyDetails: function(id) {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.LOAD_COMPANY_DETAILS,
      id: id
    });
  },
  changeCompanyDetails: function(field, value) {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.CHANGE_COMPANY_DETAILS,
      field: field,
      value: value
    });
  },
  saveCompanyDetails: function() {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.SAVE_COMPANY_DETAILS
    });
  },
  cancelEditing: function() {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.CANCEL_EDITING
    });
  },
  newCompany: function() {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.NEW_COMPANY
    });
  },
  attachPassportStart: function(id) {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.ATTACH_PASSPORT_START,
      id: id
    });
  },
  attachPassportUpload: function(filename) {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.ATTACH_PASSPORT_UPLOAD,
      filename: filename
    });
  },
  attachPassportCancel: function() {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.ATTACH_PASSPORT_CANCEL
    });
  }
};

module.exports = CompanyActions;
