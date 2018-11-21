package org.blockchainos.wallet.android.testnet.NativeFunctions;

import android.view.WindowManager;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import io.fabric.sdk.android.Fabric;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;


public class FirebaseControl extends ReactContextBaseJavaModule {


    public FirebaseControl(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FirebaseControl";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        return constants;
    }

    @ReactMethod
    public void useCrashlystic() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Fabric.with(getReactApplicationContext(), new Crashlytics());
            }
        });
    }

}