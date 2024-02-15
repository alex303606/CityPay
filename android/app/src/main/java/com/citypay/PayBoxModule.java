package com.citypay;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import money.paybox.payboxsdk.Interfaces.PBListener;
import money.paybox.payboxsdk.PBHelper;
import money.paybox.payboxsdk.Utils.Constants;

class PayBoxModule extends ReactContextBaseJavaModule {
    public ReactApplicationContext reactContext;
    private PBListener listener;

    PayBoxModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    protected void sendEvent(String eventName, String message) {
        WritableMap params = Arguments.createMap();
        params.putString(eventName, message);
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("EventReminder", params);
    }

    public String getName() {
        return "PayBoxModule";
    }

    @ReactMethod
    public void initPayment(String orderId, String payUserId, float payAmount, String phone, String resultUrl) {
        sendEvent("InitPayment", orderId);
        //Параметр указывающий на рекурентность платежа
        boolean checkIsRecurring = true;
        MainApplication.instance.initBuilder("6yzvHbcFliUlIdnu", 544793, null, null);
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

    @ReactMethod
    public void getCards(String userId) {
        PBHelper.getSdk().getCards(userId);
        sendEvent("getCards = ", "success");
    }

    @ReactMethod
    public void addCard(String userId, String postUrl) {
        PBHelper.getSdk().addCard(userId, postUrl);
        sendEvent("addCard = ", "success");
    }
    @ReactMethod
    public void deleteCard(String userId, int cardId) {
        PBHelper.getSdk().removeCard(userId, cardId);
        sendEvent("deleteCard = ", "success");
    }

    @ReactMethod
    public void registerPbListener() {
        sendEvent("registerPbListener = ", "Регистрация текущего активити для просушивания событий");
        this.listener = new PBListenerImpl(this);
        //Регистрация текущего активити для просушивания событий
        PBHelper.getSdk().registerPbListener(this.listener);
    }

    @ReactMethod
    public void removePbListener() {
        sendEvent("removePbListener = ", "Удаление текущего активити для просушивания событий");
        if (this.listener != null) {
            //Удаление текущего активити для просушивания событий
            PBHelper.getSdk().removePbListener(this.listener);
        }
    }
}