import React from 'react';
import { View, ToastAndroid, TouchableWithoutFeedback } from 'react-native';

import styles from '../styles';

import { Navigation as NavAction } from '../../actions';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton, CheckBox } from '../../components/Button';

class Agreement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAllChecked: false,
    };

    this.onPressBottom = this.onPressBottom.bind(this);
    this.activateButton = this.activateButton.bind(this);
  }

  onPressBottom() {
    const { isAllChecked } = this.state;

    if (!isAllChecked) {
      ToastAndroid.show('모든 주의사항을 체크해 주세요', ToastAndroid.SHORT);
    }
  }

  activateButton() {
    if (
      this.agree1.state.value
      && this.agree2.state.value
      && this.agree3.state.value
      && this.agree4.state.value
    ) {
      this.setState({
        isAllChecked: true,
      });
    } else {
      this.setState({
        isAllChecked: false,
      });
    }
  }

  render() {
    const { isAllChecked } = this.state;
    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: '계좌 생성 주의사항',
            },
            right: {
              actionText: '닫기',
              action: NavAction.popScreen(),
            },
          }}
        />
        <View style={[styles.centerLayout, { paddingTop: 30 }]}>
          <CheckBox
            ref={(c) => { this.agree1 = c; }}
            label={'유효한 계좌를 만들기 위해서는 최소 잔액\n이필요합니다. 비밀번호 설정 후 최소 잔액\n0.1BOS를 보내세요'}
            callback={this.activateButton}
          />
          <CheckBox
            ref={(c) => { this.agree2 = c; }}
            label={'계좌 이름 및 주소록의 정보는 앱에 저장되\n는정보로서 앱을 삭제하거나 기기를 변경\n하면 모든 정보가 사라집니다. 중요한 공개\n주소는 따로 보관하세요'}
            callback={this.activateButton}
          />
          <CheckBox
            ref={(c) => { this.agree3 = c; }}
            label={'비밀번호는 송금, 보안키 조회, 계좌 가져\n오기를 할 때 필요합니다. 비밀번호는 잃어\n버리면찾을 수 없으니 반드시 기억하세요'}
            callback={this.activateButton}
          />
          <CheckBox
            ref={(c) => { this.agree4 = c; }}
            label={'보안키와 복구키는 계좌 가져오기 할 때 필\n요합니다.\n잃어버리거나 타인에게 공유하지 마세요'}
            callback={this.activateButton}
          />
          <View style={styles.filler} />

          <TouchableWithoutFeedback // Touchable Opacity Style 반영 이슈때문에 inactive 시 동작 위해 사용
            onPress={this.onPressBottom}
          >
            <View style={{ alignSelf: 'stretch' }}>
              <BottomButton
                ref={(c) => { this.buttonButton = c; }}
                actions={[
                  {
                    text: '확인',
                    action: NavAction.pushScreen(NavAction.Screens.SET_PASSWORD),
                  },
                ]}
                inactive={!isAllChecked}
                callback={this.onPressBottom}
              />
            </View>

          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

Agreement.navigationOptions = {
  header: null,
};

export default Agreement;
