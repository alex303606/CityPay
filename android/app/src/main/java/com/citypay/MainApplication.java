package com.citypay;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;

import money.paybox.payboxsdk.PBHelper;
import money.paybox.payboxsdk.Utils.Constants;

import java.util.List;

import androidx.multidex.MultiDexApplication;

public class MainApplication extends MultiDexApplication implements ReactApplication {
    public static MainApplication instance;
    public PBHelper.Builder builder;
    private final ReactNativeHost mReactNativeHost =
            new DefaultReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    packages.add(new PayBoxPackage());
                    packages.add(new MBankPackage());
                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }

                @Override
                protected boolean isNewArchEnabled() {
                    return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
                }

                @Override
                protected Boolean isHermesEnabled() {
                    return BuildConfig.IS_HERMES_ENABLED;
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    //***PAYBOX***
    //Необходимо заменить тестовый secretKey и merchantId на свой
    private final String secretKey = "6yzvHbcFliUlIdnu";
    private final String secretKeyMBank = "65JGemXjCb97xnGa";
    private final int merchantId = 544793;
    private final int merchantIdMBank = 548528;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        SoLoader.init(this, /* native exopackage */ false);
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            DefaultNewArchitectureEntryPoint.load();
        }
        ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
        //Вызов инициализации SDK
        MainApplication.instance.initBuilder(secretKey, merchantId, null, null);
        MainApplication.instance.initMBankBuilder(secretKeyMBank, merchantIdMBank, null, null);
        MainApplication.instance.builder.build();
    }

    public void initBuilder(String secretKey, int merchantId, String email, String phone) {
        //Инициализация SDK
        builder = new PBHelper.Builder(this, secretKey, merchantId)
                //Выбор платежной системы
                .setPaymentSystem(Constants.PBPAYMENT_SYSTEM.NONE)
                //Выбор валюты платежа
                .setPaymentCurrency(Constants.CURRENCY.KGS)
                //Активация автоклиринга
                .enabledAutoClearing(true)
                //Запрашивать Frame вместо платежной страницы
                .setFrameRequired(true) //false по умолчанию
                //Для активации режима тестирования
                .enabledTestMode(false)
                .setLanguage(Constants.PBLANGUAGE.ru)
                //Время от 300 до 604800 (в секундах) в течение которого платеж должен быть завершен
                .setPaymentLifeTime(300);
    }

    public void initMBankBuilder(String secretKey, int merchantId, String email, String phone) {
        //Инициализация SDK
        builder = new PBHelper.Builder(this, secretKey, merchantId)
                //Выбор платежной системы
                .setPaymentSystem(Constants.PBPAYMENT_SYSTEM.NONE)
                //Выбор валюты платежа
                .setPaymentCurrency(Constants.CURRENCY.KGS)
                //Активация автоклиринга
                .enabledAutoClearing(true)
                //Запрашивать Frame вместо платежной страницы
                .setFrameRequired(true) //false по умолчанию
                //Для активации режима тестирования
                .enabledTestMode(false)
                .setLanguage(Constants.PBLANGUAGE.ru)
                //Время от 300 до 604800 (в секундах) в течение которого платеж должен быть завершен
                .setPaymentLifeTime(300);
    }
}