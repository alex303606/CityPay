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

public class PBListenerImpl implements PBListener {
    private PayBoxModule module;

    PBListenerImpl(PayBoxModule module) {
        this.module = module;
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
        this.module.sendEvent("onCardList Status = ", message);
    }

    @Override
    public void onPaymentRevoke(Response response) {
        this.module.sendEvent("onPaymentRevoke Status = ", response.getStatus());
    }

    @Override
    public void onPaymentPaid(Response response) {
        this.module.sendEvent("onPaymentPaid Payment ID = ", response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onPaymentStatus(PStatus pStatus) {
        this.module.sendEvent("onPaymentStatus Status = ", pStatus.getStatus() +
                "\nPayment system = " + pStatus.getPaymentSystem() +
                "\nTransaction Status = " + pStatus.getTransactionStatus() +
                "\nCaptured = " + pStatus.isCaptured() +
                "\nCan reject = " + pStatus.isCanReject() +
                "\nCard pan = " + pStatus.getCardPan());
    }

    @Override
    public void onCardAdded(Response response) {
        this.module.sendEvent("onCardAdded Payment ID = ", response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onCardRemoved(Card card) {
        if (card != null) {
            this.module.sendEvent("onCardRemoved Deleted At = ", card.getDate() +
                    "\nStatus = " + card.getStatus());
        }
    }

    @Override
    public void onCardPayInited(Response response) {
        this.module.sendEvent("onCardPayInited Status = ", response.getStatus() +
                "\nPayment ID = " + response.getPaymentId());
        PBHelper.getSdk().payWithCard(Integer.parseInt(response.getPaymentId()));
    }

    @Override
    public void onCardPaid(Response response) {
        this.module.sendEvent("onCardPaid Payment ID = ", response.getPaymentId() +
                "\nStatus = " + response.getStatus());
    }

    @Override
    public void onRecurringPaid(RecurringPaid recurringPaid) {
        this.module.sendEvent("onRecurringPaid Payment ID = ", recurringPaid.getPaymentId() +
                "\nStatus = " + recurringPaid.getStatus() +
                "\nCurrency = " + recurringPaid.getCurrency() +
                "\nDate = " + recurringPaid.getExpireDate().toGMTString());
    }

    @Override
    public void onPaymentCaptured(Capture capture) {
        this.module.sendEvent("onPaymentCaptured Status = ", capture.getStatus() +
                "\nAmount = " + capture.getAmount() +
                "\nClearing Amount = " + capture.getClearingAmount());
    }

    @Override
    public void onPaymentCanceled(Response response) {
        this.module.sendEvent("onPaymentCanceled Status = ", response.getStatus());
    }

    @Override
    public void onError(Error error) {
        this.module.sendEvent("onError Error = ", error.getErrorDesription());
    }
}
