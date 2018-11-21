package org.blockchainos.wallet.android.mainnet;

import android.app.Application;

import org.blockchainos.wallet.android.mainnet.NativeFunctions.NativeFunctionsPackage;
import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.masteratul.RNAppstoreVersionCheckerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import io.invertase.firebase.RNFirebasePackage;
import org.reactnative.camera.RNCameraPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new RNDeviceInfo(),
            new RNAppstoreVersionCheckerPackage(),
              new SplashScreenReactPackage(),
              new RNCameraPackage(),
              new RNFirebasePackage(),
              new RandomBytesPackage(),
              new RNFirebaseCrashlyticsPackage(),
              new NativeFunctionsPackage()
//              new RNFirebaseAnalyticsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "app/index.android";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
