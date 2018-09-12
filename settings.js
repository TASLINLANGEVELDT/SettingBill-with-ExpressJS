module.exports = function(callInput, smsInput, warningInput, criticalInput, selectedItem) {


 const moment = require('moment');


  var callsWithSettings = 0.00;

  var smsWithSettings = 0.00;

  var combinedTotal = 0.00;


  var callValue = '';

  var smsValue = '';

  var warningValue = '';

  var criticalValue = '';


  let cost = '';

  let type = '';

  let timestamp = '';

  let action = {};

  let actions = [];

  let timeAgo = [];


  function value_Call(callInput) {

    callValue = parseFloat(callInput);

  }


  function value_Sms(smsInput) {

    smsValue = parseFloat(smsInput);

  }


  function value_Warning(warningInput) {

    warningValue = parseFloat(warningInput);

  }


  function value_Critical(criticalInput) {

    criticalValue = parseFloat(criticalInput);

  }


  function calculate_CallSms(selectedItem) {

    if (critical()) {

      return;

    }

    else if (selectedItem === "call") {

      callsWithSettings += callValue;

      cost = callValue;

    }

    else if (selectedItem === "sms") {

      smsWithSettings += smsValue;

      cost = smsValue;

    }


    type = selectedItem;

    timestamp = new Date();


    record();

    pushAction();

  }


  function record() {

    action = {

      type,

      cost,

      timestamp

    }

  }


  function pushAction() {

    actions.push(action);

  }


  function filterActions(type) {

    let filtered = [];


    for (let i = 0; i < actions.length; i++) {

      if (actions[i].type === type) {

        filtered.push(actions[i]);

      }

    }

    return filtered;

  }


  function actionTotal(type) {

    let total = 0;


    for (let i = 0; i < actions.length; i++) {

      if (actions[i].type === type) {

        total += actions[i].cost;

      }

    }

    return total;

  }


  function time() {

    for (var i = 0; i < actions.length; i++) {

      let action = actions[i];

      action.timeAgo = moment(action.timestamp).fromNow();

    }

  }


  let calculatedCalls = function() {

    return callsWithSettings.toFixed(2);

  }


  let calculatedSms = function() {

    return smsWithSettings.toFixed(2);

  }


  let calculate_Total = function() {

    combinedTotal = callsWithSettings + smsWithSettings;

  }


  function critical() {

    if (combinedTotal >= criticalValue) {

      return true;

    }

    return false;

  }


  let calculatedTotal = function() {

    return combinedTotal.toFixed(2);

  }


  let addClasses = function() {

    if (combinedTotal >= warningValue && combinedTotal < criticalValue) {

      return "warning";

    }


    if (combinedTotal > warningValue && combinedTotal >= criticalValue) {

      return "danger";

    }

  }


  function returnAll() {

    time();

    return {

      callValue,

      smsValue,

      warningValue,

      criticalValue,

      calculatedCalls,

      calculatedSms,

      calculatedTotal,

      addClasses,

      actions,

      timestamp

    }

  }

  let clearAll = function() {

    callsWithSettings = 0.00;

    smsWithSettings = 0.00;

    combinedTotal = 0.00;
