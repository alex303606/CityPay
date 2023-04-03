package com.citypay;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;

import money.paybox.payboxsdk.Interfaces.PBListener;
import money.paybox.payboxsdk.Model.Capture;
import money.paybox.payboxsdk.Model.Card;
import money.paybox.payboxsdk.Model.Error;
import money.paybox.payboxsdk.Model.PStatus;
import money.paybox.payboxsdk.Model.RecurringPaid;
import money.paybox.payboxsdk.Model.Response;
import money.paybox.payboxsdk.PBHelper;
import money.paybox.payboxsdk.Utils.Constants;

class PayBoxModule extends ReactContextBaseJavaModule implements PBListener {
    public ReactApplicationContext reactContext;

    PayBoxModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    private void sendEvent(String eventName, String message) {
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

    //***PAYBOX***
    //Необходимо заменить тестовый secretKey и merchantId на свой
    private final String secretKey = "6yzvHbcFliUlIdnu";
    private final int merchantId = 544793;

    protected void onResume() {
        this.onResume();
        //Вызов инициализации SDK
        MainApplication.instance.initBuilder(secretKey, merchantId, null, null);
        MainApplication.instance.builder.build();

        //Регистрация текущего активити для просушивания событий
        PBHelper.getSdk().registerPbListener(this);
    }

    protected void onDestroy() {
        this.onDestroy();
        PBHelper.getSdk().removePbListener(this);
    }

    @Override
    public void onCardList(ArrayList<Card> cards) {
        String message = new String();
        for (Card card : cards) {
            message += "Card hash = " + card.getCardhash() + "\n" +
                    "Card ID = " + card.getCardId() + "\n" +
                    "Recurring profile = " + card.getRecurringProfile() + "\n" +
                    "Created At = " + card.getDate() + "\n" +
                    "Status = " + card.getStatus() + "\n\n";

        }
        Log.d("PayBoxModule", message);
    }

    @Override
    public void onPaymentRevoke(Response response) {
        sendEvent("onPaymentRevoke Status = ", response.getStatus());
    }

    @Override
    public void onPaymentPaid(Response response) {
        sendEvent("onPaymentPaid Payment ID = ", response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onPaymentStatus(PStatus pStatus) {
        sendEvent("onPaymentStatus Status = ", pStatus.getStatus() +
                "\nPayment system = " + pStatus.getPaymentSystem() +
                "\nTransaction Status = " + pStatus.getTransactionStatus() +
                "\nCaptured = " + pStatus.isCaptured() +
                "\nCan reject = " + pStatus.isCanReject() +
                "\nCard pan = " + pStatus.getCardPan());
    }

    @Override
    public void onCardAdded(Response response) {
        sendEvent("onCardAdded Payment ID = ", response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onCardRemoved(Card card) {
        if (card != null) {
            sendEvent("onCardRemoved Deleted At = ", card.getDate() +
                    "\nStatus = " + card.getStatus());
        }
    }

    @Override
    public void onCardPayInited(Response response) {
        sendEvent("onCardPayInited Status = ", response.getStatus() +
                "\nPayment ID = " + response.getPaymentId());
        PBHelper.getSdk().payWithCard(Integer.parseInt(response.getPaymentId()));
    }

    @Override
    public void onCardPaid(Response response) {
        sendEvent("onCardPaid Payment ID = ", response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onRecurringPaid(RecurringPaid recurringPaid) {
        sendEvent("onRecurringPaid Payment ID = ", recurringPaid.getPaymentId() +
                "\nStatus = " + recurringPaid.getStatus() +
                "\nCurrency = " + recurringPaid.getCurrency() +
                "\nDate = " + recurringPaid.getExpireDate().toGMTString());
    }

    @Override
    public void onPaymentCaptured(Capture capture) {
        sendEvent("onPaymentCaptured Status = ", capture.getStatus() +
                "\nAmount = " + capture.getAmount() +
                "\nClearing Amount = " + capture.getClearingAmount());
    }

    @Override
    public void onPaymentCanceled(Response response) {
        sendEvent("onPaymentCanceled Status = ", response.getStatus());
    }

    @Override
    public void onError(Error error) {
        sendEvent("onError Error = ", error.getErrorDesription());
    }
}