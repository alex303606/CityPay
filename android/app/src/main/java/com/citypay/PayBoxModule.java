package com.citypay;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import money.paybox.payboxsdk.PBHelper;

class PayBoxModule extends ReactContextBaseJavaModule {
    PayBoxModule(ReactApplicationContext context) {
        super(context);
    }

    public String getName() {
        return "PayBoxModule";
    }

    @ReactMethod
    public void initPayment(String orderId, String payUserId, float payAmount, String payComment) {
        //Параметр указывающий на рекурентность платежа
        boolean checkIsRecurring = false;

        if (checkIsRecurring) {
            //При активации рекурентного платежа указывается период от 1 до 156 месяцев
            PBHelper.getSdk().enableRecurring(2);
        } else {
            PBHelper.getSdk().disableRecurring();
        }

        PBHelper.getSdk().initNewPayment(orderId, payUserId, payAmount, payComment, null);
    }
}