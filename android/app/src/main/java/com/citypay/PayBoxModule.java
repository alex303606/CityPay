package com.citypay;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import money.paybox.payboxsdk.PBHelper;
import money.paybox.payboxsdk.Utils.Constants;

class PayBoxModule extends ReactContextBaseJavaModule {
    private final String secretKey = "QEKjpHz1DKAm4tIa";
    private final int merchantId = 547561;

    PayBoxModule(ReactApplicationContext context) {
        super(context);
    }

    public String getName() {
        return "PayBoxModule";
    }

    @ReactMethod
    public void initPayment(String orderId, String payUserId, float payAmount, String phone, String resultUrl) {
        //Параметр указывающий на рекурентность платежа
        boolean checkIsRecurring = true;
        //Вызов инициализации SDK
        MainApplication.instance.initBuilder(secretKey, merchantId, null, null);
        MainApplication.instance.builder.setUserInfo("", phone);
        MainApplication.instance.builder.setFeedBackUrl(null, resultUrl, null, null, Constants.PBREQUEST_METHOD.POST);
        MainApplication.instance.builder.build();

        if (checkIsRecurring) {
            //При активации рекурентного платежа указывается период от 1 до 156 месяцев
            PBHelper.getSdk().enableRecurring(12);
        } else {
            PBHelper.getSdk().disableRecurring();
        }

        PBHelper.getSdk().initNewPayment(orderId, payUserId, payAmount, "CityPay", null);
    }
}