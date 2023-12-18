package com.citypay;

import java.util.ArrayList;

import money.paybox.payboxsdk.Interfaces.PBListener;
import money.paybox.payboxsdk.Model.Capture;
import money.paybox.payboxsdk.Model.Card;
import money.paybox.payboxsdk.Model.Error;
import money.paybox.payboxsdk.Model.PStatus;
import money.paybox.payboxsdk.Model.RecurringPaid;
import money.paybox.payboxsdk.Model.Response;
import money.paybox.payboxsdk.PBHelper;

public class MBankListenerImplSecond implements PBListener {
    private MbankSecondModule module;

    MBankListenerImplSecond(MbankSecondModule module) {
        this.module = module;
    }

    @Override
    public void onCardList(ArrayList<Card> cards) {
        ArrayList<String> list = new ArrayList<>();
        for (Card card : cards) {
            list.add("{\"id\":" + card.getCardId() + ",\"number\":\"" + card.getCardhash() + "\"}");
        }
        this.module.sendEvent("cardsList", list.toString());
    }

    @Override
    public void onPaymentRevoke(Response response) {
        this.module.sendEvent("onPaymentRevoke", response.getStatus());
    }

    @Override
    public void onPaymentPaid(Response response) {
        this.module.sendEvent("onPaymentPaid", response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onPaymentStatus(PStatus pStatus) {
        this.module.sendEvent("onPaymentStatus", pStatus.getStatus() +
                "\nPayment system = " + pStatus.getPaymentSystem() +
                "\nTransaction Status = " + pStatus.getTransactionStatus() +
                "\nCaptured = " + pStatus.isCaptured() +
                "\nCan reject = " + pStatus.isCanReject() +
                "\nCard pan = " + pStatus.getCardPan());
    }

    @Override
    public void onCardAdded(Response response) {
        this.module.sendEvent("onCardAdded", response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onCardRemoved(Card card) {
        if (card != null) {
            this.module.sendEvent("onCardRemoved", card.getDate() +
                    "\nStatus = " + card.getStatus());
        }
    }

    @Override
    public void onCardPayInited(Response response) {
        this.module.sendEvent("onCardPayInited", response.getStatus() +
                "\nPayment ID = " + response.getPaymentId());
        PBHelper.getSdk().payWithCard(Integer.parseInt(response.getPaymentId()));
    }

    @Override
    public void onCardPaid(Response response) {
        this.module.sendEvent("onCardPaid", response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onRecurringPaid(RecurringPaid recurringPaid) {
        this.module.sendEvent("onRecurringPaid", recurringPaid.getPaymentId() +
                "\nStatus = " + recurringPaid.getStatus() +
                "\nCurrency = " + recurringPaid.getCurrency() +
                "\nDate = " + recurringPaid.getExpireDate().toGMTString());
    }

    @Override
    public void onPaymentCaptured(Capture capture) {
        this.module.sendEvent("onPaymentCaptured", capture.getStatus() +
                "\nAmount = " + capture.getAmount() +
                "\nClearing Amount = " + capture.getClearingAmount());
    }

    @Override
    public void onPaymentCanceled(Response response) {
        this.module.sendEvent("onPaymentCanceled", response.getStatus());
    }

    @Override
    public void onError(Error error) {
        this.module.sendEvent("onError", error.getErrorDesription());
    }
}

