package com.citypay;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.material.snackbar.Snackbar;

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

    //***PAYBOX***
    //Необходимо заменить тестовый secretKey и merchantId на свой
    private final String secretKey = "QEKjpHz1DKAm4tIa";
    private final int merchantId = 547561;
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
        Log.d("PayBoxModule", "Status = " + response.getStatus());
    }

    @Override
    public void onPaymentPaid(Response response) {
        Log.d("PayBoxModule", "Payment ID = " + response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onPaymentStatus(PStatus pStatus) {
        Log.d("PayBoxModule", "Status = " + pStatus.getStatus() +
                "\nPayment system = " + pStatus.getPaymentSystem() +
                "\nTransaction Status = " + pStatus.getTransactionStatus() +
                "\nCaptured = " + pStatus.isCaptured() +
                "\nCan reject = " + pStatus.isCanReject() +
                "\nCard pan = " + pStatus.getCardPan());
    }

    @Override
    public void onCardAdded(Response response) {
        Log.d("PayBoxModule", "Payment ID = " + response.getPaymentId() +
                "\nStatus = " + response.getStatus());

    }

    @Override
    public void onCardRemoved(Card card) {
        if (card != null) {
            Log.d("PayBoxModule", "\nDeleted At = " + card.getDate() +
                    "\nStatus = " + card.getStatus());
        }
    }

    @Override
    public void onCardPayInited(Response response) {
        Log.d("PayBoxModule", "Status = " + response.getStatus() +
                "\nPayment ID = " + response.getPaymentId());
        PBHelper.getSdk().payWithCard(Integer.parseInt(response.getPaymentId()));
    }

    @Override
    public void onCardPaid(Response response) {
        Log.d("PayBoxModule", "Payment ID = " + response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onRecurringPaid(RecurringPaid recurringPaid) {
        Constants.logMessage("Rec paid");
        Log.d("PayBoxModule", "Payment ID = " + recurringPaid.getPaymentId() +
                "\nStatus = " + recurringPaid.getStatus() +
                "\nCurrency = " + recurringPaid.getCurrency() +
                "\nDate = " + recurringPaid.getExpireDate().toGMTString());

    }

    @Override
    public void onPaymentCaptured(Capture capture) {
        Log.d("PayBoxModule", "Status = " + capture.getStatus() +
                "\nAmount = " + capture.getAmount() +
                "\nClearing Amount = " + capture.getClearingAmount());

    }

    @Override
    public void onPaymentCanceled(Response response) {
        Log.d("PayBoxModule", "Status = " + response.getStatus());

    }

    @Override
    public void onError(Error error) {
//        Snackbar snackbar = Snackbar.make(findViewById(android.R.id.content), error.getErrorDesription(), Snackbar.LENGTH_INDEFINITE);
//        snackbar.setDuration(5000);
//        snackbar.show();
    }
}