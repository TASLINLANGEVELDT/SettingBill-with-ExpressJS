let assert = require("assert");

let SettingsBill = require("../settings");


describe('Input and update values to calculate', function(){


    it('should return the calls total as R6.00 for 3 calls only', function(){


      var addCallValue = SettingsBill();


        addCallValue.value_Call(2);

        addCallValue.value_Critical(20);


        addCallValue.calculate_CallSms('call');

        addCallValue.calculate_CallSms('call');

        addCallValue.calculate_CallSms('call');


    assert.equal(6.00, addCallValue.calculatedCalls());

    });


    it('should return the sms total as R4.00 for 4 sms only', function(){


      var addSmsValue = SettingsBill();


        addSmsValue.value_Sms(1);

        addSmsValue.value_Critical(20);


        addSmsValue.calculate_CallSms('sms');

        addSmsValue.calculate_CallSms('sms');

        addSmsValue.calculate_CallSms('sms');

        addSmsValue.calculate_CallSms('sms');


    assert.equal(4.00, addSmsValue.calculatedSms());

    });


    it('should return the grand total as R18.00 for 2 sms and 2 calls', function(){


      var addTotalValues = SettingsBill();


        addTotalValues.value_Call(5);

        addTotalValues.value_Sms(4);

        addTotalValues.value_Critical(20);


        addTotalValues.calculate_CallSms('call');

        addTotalValues.calculate_CallSms('call');

        addTotalValues.calculate_CallSms('sms');

        addTotalValues.calculate_CallSms('sms');


        addTotalValues.calculate_Total();


        assert.equal(10.00, addTotalValues.calculatedCalls());

        assert.equal(8.00, addTotalValues.calculatedSms());

        assert.equal(18.00, addTotalValues.calculatedTotal());

    });


    it('should stop calculating immediately after critical level value is reached', function(){


      var threshold = SettingsBill();


        threshold.value_Critical(20);

        threshold.value_Call(5);

        threshold.value_Sms(4);


        threshold.calculate_CallSms('call');

            threshold.calculate_Total();


        threshold.calculate_CallSms('call');

            threshold.calculate_Total();


        threshold.calculate_CallSms('sms');

            threshold.calculate_Total();


        threshold.calculate_CallSms('sms');

            threshold.calculate_Total();


        threshold.calculate_CallSms('call');

            threshold.calculate_Total();


        threshold.calculate_CallSms('sms');

        threshold.calculate_CallSms('call');

            threshold.calculate_Total();


        assert.equal(23.00, threshold.calculatedTotal());

    });

  });
