package com.boswallet.NativeFunctions;

        import android.os.Handler;
        import android.os.Message;
        import android.view.WindowManager;

        import com.facebook.react.bridge.NativeModule;
        import com.facebook.react.bridge.ReactApplicationContext;
        import com.facebook.react.bridge.ReactContext;
        import com.facebook.react.bridge.ReactContextBaseJavaModule;
        import com.facebook.react.bridge.ReactMethod;

        import java.util.HashMap;
        import java.util.Map;

        import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;


public class AndroidSecureMode extends ReactContextBaseJavaModule {

    private boolean mode = false;

    private static final Boolean MODE_SET = true;
    private static final Boolean MODE_UNSET = false;

    public AndroidSecureMode(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AndroidSecureMode";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("MODE_SET", MODE_SET);
        constants.put("MODE_UNSET", MODE_UNSET);
        return constants;
    }

    @ReactMethod
    public void setSecure() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                getCurrentActivity().getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
            }
        });
    }

    @ReactMethod
    public void resetSecure() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                getCurrentActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
            }
        });
    }

}