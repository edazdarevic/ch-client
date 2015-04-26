var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var CompanyConstants = require('../constants/companyConstants');
var Config = require('../config');
var _ = require('underscore');
var request = require('superagent');

var _companies = [];
var _companyDetails;
var _validations = {};
var _uploadState = {
  open: false,
  uploading: false,
  valid: true
};

var loadCompanies = function() {
  request
    .get(Config.API_ROOT + '/company')
    .end(function(err, resp) {
      _companies = resp.body;
      CompanyStore.emitChange();
    });
};

var clearValidations = function() {
  _validations = {};
};

var loadCompanyDetails = function(id) {
  request
    .get(Config.API_ROOT + '/company/' + id)
    .end(function(err, resp) {
      _companyDetails = resp.body;
      clearValidations();
      CompanyStore.emitChange();
    });
};

var validateField = function(field, value) {
  if (field !== "email" && field !== "phone_number") {
    if (value === undefined || value.toString().trim() === "") {
      _validations[field] = "Required field";
    } else {
      delete _validations[field];
    }
  }
};

var runValidations = function(field) {
  for (var key in _companyDetails) {
    if (_companyDetails.hasOwnProperty(key)) {
      var value = _companyDetails[key];
      validateField(key, value);
    }
  }
};

var changeCompanyDetails = function(field, value) {
  validateField(field, value);
  _companyDetails[field] = value;
  CompanyStore.emitChange();
};

var saveCompanyDetails = function() {
  runValidations();
  if (Object.keys(_validations).length === 0) {
    var r;
    if (_companyDetails.id === undefined) {
      r = request.post(Config.API_ROOT + '/company');
    } else {
      r = request.put(Config.API_ROOT + '/company/' + _companyDetails.id);
    }

    r.send(_companyDetails).end(function(err, resp) {
      loadCompanies();
      _companyDetails = undefined;

      CompanyStore.emitChange();
    });
  }
};

var cancelEditing = function() {
  _companyDetails = undefined;
  CompanyStore.emitChange();
};

var newCompany = function() {
  _companyDetails = {
    name: '',
    address: '',
    city: '',
    country: '',
    email: '',
    phone_number: ''
  };

  clearValidations();
  CompanyStore.emitChange();
};

var attachPassportStart = function(id) {
  _uploadState.open = true;
  _uploadState.companyId = id;
};

var clearUploadState = function() {
  _uploadState = {
    uploading: false,
    open: false,
    valid: true
  };
};

var attachPassportUpload = function(filename) {
  if (!filename) {
    _uploadState.valid = false;
    CompanyStore.emitChange();
    return;
  }

  _uploadState.uploading = true;
  CompanyStore.emitChange();

  console.log(filename);
  request
    .post(Config.API_ROOT + '/company/' + _uploadState.companyId + '/passport')
    .attach('file', filename)
    .end(function(err, response) {
      clearUploadState();
      CompanyStore.emitChange();
    });
};

var CompanyStore = _.extend({}, EventEmitter.prototype, {
  getCompanies: function() {
    return _companies;
  },
  getCompanyDetails: function() {
    return _companyDetails;
  },
  getValidations: function() {
    return _validations;
  },
  getUploadState: function() {
    return _uploadState;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch (action.actionType) {
    case CompanyConstants.LOAD_COMPANIES:
      loadCompanies();
      break;
    case CompanyConstants.LOAD_COMPANY_DETAILS:
      loadCompanyDetails(action.id);
      break;
    case CompanyConstants.CHANGE_COMPANY_DETAILS:
      changeCompanyDetails(action.field, action.value);
      break;
    case CompanyConstants.SAVE_COMPANY_DETAILS:
      saveCompanyDetails();
      break;
    case CompanyConstants.CANCEL_EDITING:
      cancelEditing();
      break;
    case CompanyConstants.NEW_COMPANY:
      newCompany();
      break;
    case CompanyConstants.ATTACH_PASSPORT_START:
      attachPassportStart(action.id);
      break;
    case CompanyConstants.ATTACH_PASSPORT_UPLOAD:
      attachPassportUpload(action.filename);
      break;
    case CompanyConstants.ATTACH_PASSPORT_CANCEL:
      clearUploadState();
      break;
    default:
      return true;
  }
  CompanyStore.emitChange();
  return true;

});

module.exports = CompanyStore;
