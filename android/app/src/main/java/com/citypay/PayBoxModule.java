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
    public void initPayment(String name) {
        //Параметр указывающий на рекурентность платежа
        boolean checkIsRecurring = false;

        String payUserId = "1234";
        float payAmount = 10;
        String payComment = "some description";

        if(checkIsRecurring){
            //При активации рекурентного платежа указывается период от 1 до 156 месяцев
            PBHelper.getSdk().enableRecurring(2);
        } else {
            PBHelper.getSdk().disableRecurring();
        }

        PBHelper.getSdk().initNewPayment(null, payUserId, payAmount, payComment, null);
    }
}