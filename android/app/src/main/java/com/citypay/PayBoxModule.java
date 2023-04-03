package com.citypay;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import money.paybox.payboxsdk.PBHelper;
import money.paybox.payboxsdk.Utils.Constants;

class PayBoxModule extends ReactContextBaseJavaModule {
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

        MainApplication.instance.builder.setUserInfo("", phone);
        MainApplication.instance.builder.setFeedBackUrl(null, resultUrl, null, null, Constants.PBREQUEST_METHOD.POST);

        if (checkIsRecurring) {
            //При активации рекурентного платежа указывается период от 1 до 156 месяцев
            PBHelper.getSdk().enableRecurring(12);
        } else {
            PBHelper.getSdk().disableRecurring();
        }

        PBHelper.getSdk().initNewPayment(orderId, payUserId, payAmount, "CityPay", null);
    }
}