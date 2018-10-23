import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { Navigation as NavAction } from '../../actions';

import imgFace from '../../resources/images/img_face.png';

class QRScan extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      isScanned: false,
      callback: navigation.getParam('callback', null),
    };
  }

  render() {
    const { goBack } = this.props;
    const { callback, isScanned } = this.state;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.WHITE} />
        <RNCamera
          style={[styles.container, styles.noToolbar, { backgroundColor: '#999999' }]}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={(result) => {
            if (!isScanned && result.type === RNCamera.Constants.BarCodeType.qr) {
              this.setState({
                isScanned: true,
              });
              ToastAndroid.show(JSON.stringify(result), ToastAndroid.SHORT);
              if (callback) callback(result.data);
              goBack();
            }
          }}
        >
          {({ camera, status }) => {
            if (status === 'NOT_AUTHORIZED') {
              goBack();
              return <View />;
            }
            
            return (
              <View
                style={{ flex: 1 }}
              >
                <Text style={[styles.layoutHead, styles.headText]}>
                  바코드를 사각형 안에 비춰주세요
                </Text>
                <View style={styles.centerLayout}>
                  <Image
                    source={imgFace}
                    resizeMode="contain"
                    style={{ width: 292 }}
                  />
                </View>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

QRScan.navigationOptions = {
  header: null,
};

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavAction.popScreen()),
});

export default connect(null, mapDispatchToProps)(QRScan);
