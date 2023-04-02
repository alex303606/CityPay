package com.citypay;

import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
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

public class MainActivity extends ReactActivity implements PBListener {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CityPay";
    }

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
     * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
     * (aka React 18) with two boolean flags.
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
                this,
                getMainComponentName(),
                // If you opted-in for the New Architecture, we enable the Fabric Renderer.
                DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
                // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
                DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
    }

    //***PAYBOX***
    //Необходимо заменить тестовый secretKey и merchantId на свой
    private final String secretKey = "UnPLLvWsuXPyC3wd";
    private final int merchantId = 503623;

    @Override
    protected void onResume() {
        super.onResume();

        //Вызов инициализации SDK
        MainApplication.instance.initBuilder(secretKey, merchantId, null, null);
        MainApplication.instance.builder.build();

        //Регистрация текущего активити для просушивания событий
        PBHelper.getSdk().registerPbListener(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        //Отвязываем текущее активити от просушивания событий
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
        Log.d("PayBoxModule","Status = "+ response.getStatus());
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
        Log.d("PayBoxModule","Payment ID = " + response.getPaymentId() +
                "\nStatus = " + response.getStatus());

    }

    @Override
    public void onCardRemoved(Card card) {
        if(card != null) {
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
        Log.d("PayBoxModule","Payment ID = " + recurringPaid.getPaymentId() +
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
        Snackbar snackbar = Snackbar.make(findViewById(android.R.id.content),error.getErrorDesription(),Snackbar.LENGTH_INDEFINITE);
        snackbar.setDuration(5000);
        snackbar.show();
    }
}
