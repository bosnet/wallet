import React from 'react';
import { Text, View } from 'react-native';

import styles from '../styles';
import { types } from '../../resources';

import { Theme, AppStatusBar } from '../../components/StatusBar';
import { HomeToolbar } from '../../components/Toolbar';
import { ItemList } from '../../components/List';
import { Navigation } from '../../actions';

const HomeScreen = () => (
  <View style={styles.container}>
    <AppStatusBar theme={Theme.WHITE} />
    <HomeToolbar />
    <View style={styles.defaultLayout}>
      <ItemList
        listType={types.ListType.FLAT}
        listData={{
          data: [
            {
              key: '0-1. On Boarding > walkthrough',
              action: Navigation.pushScreen(Navigation.Screens.WALKTHROUGH),
            },
            {
              key: '1-2. 홈 (어카운트 없음)',
              action: Navigation.pushScreen(Navigation.Screens.HOME),
            },
            {
              key: '1-2. 홈 (어카운트 있음)',
              action: Navigation.pushScreen(Navigation.Screens.HOME_1),
            },
            // {
            //   key: '1-2. 홈_이용안내',
            //   action: Navigation.pushScreen(Navigation.Screens.HOMEGUIDE),
            // },
            {
              key: '3. 계좌 생성 > 계좌 생성 주의사항 > 비밀번호 설정',
              action: Navigation.pushScreen(Navigation.Screens.SET_PASSWORD),
            },
            {
              key: '5-1. 멤버십 소개 페이지',
              action: Navigation.pushScreen(Navigation.Screens.INTRO_MEMBERSHIP),
            },
            {
              key: '5-2. 멤버십 가입 동의',
              action: Navigation.pushScreen(Navigation.Screens.JOIN_MEMBERSHIP),
            },
            {
              key: '5-5. 추천인 공개 주소 입력',
              action: Navigation.pushScreen(Navigation.Screens.REFERRER),
            },
            // {
            //   key: '5-6-9.PIN 설정하기',
            // },
            // {
            //   key: '5-6-9.PIN 설정하기_1',
            // },
            {
              key: '5. 계좌 가져오기>가져오기선택',
              action: Navigation.pushScreen(Navigation.Screens.SELECT_IMPORT_TYPE),
            },
            {
              key: '6. 계좌 가져오기 > 보안키로 가져오기',
              action: Navigation.pushScreen(Navigation.Screens.IMPORT_ACCOUNT),
            },
            {
              key: '6. 계좌 가져오기 > 보안키로 가져오기 - QRcode reader screen',
              action: Navigation.pushScreen(Navigation.Screens.QR_SCAN),
            },
            {
              key: '10. 거래내역 - 공통 - 유효하지 않은 General Account',
              action: Navigation.pushScreen(Navigation.Screens.TRANSACTION_LIST),
            },
            {
              key: '10. 거래내역 - 멤버십 가입 전 - General Account',
              action: Navigation.pushScreen(Navigation.Screens.TRANSACTION_LIST_1),
            },
            {
              key: '11. 거래 상세 내역 - Frozen Account - 계좌 생성 입금',
              action: Navigation.pushScreen(Navigation.Screens.TRANSACTION_LIST_2),
            },
            {
              key: '11. 거래내역 - General Account - 거래 상세 내역',
              action: Navigation.pushScreen(Navigation.Screens.TRANSACTION_LIST_3),
            },
            {
              key: '11. 거래내역 - General Account - 거래 상세 내역_프리징',
              action: Navigation.pushScreen(Navigation.Screens.TRANSACTION_DETAIL),
            },
            {
              key: '12. 거래내역 > 보내기',
              action: Navigation.pushScreen(Navigation.Screens.SEND_BALANCE),
            },
            {
              key: '13. 거래내역 > 보내기 > 출금 계좌 선택',
              action: Navigation.pushScreen(Navigation.Screens.SELECT_WITHDRAW_ACCOUNT),
            },
            {
              key: '14. 거래내역 > 보내기 > 받는 계좌 공개 주소 - 직접입력탭',
              action: Navigation.pushScreen(Navigation.Screens.RECEIVE_ACCOUNT),
            },
            {
              key: '17. 거래내역 > 보내기 > 받는 계좌 공개 주소 > 송금내역 확인 > 비밀번호 인증 > 송금요청생성',
              action: Navigation.pushScreen(Navigation.Screens.CREATE_TRANSACTION),
            },
            {
              key: '18_Wallet_Account_받기',
              action: Navigation.pushScreen(Navigation.Screens.RECEIVE_BALANCE),
            },
            {
              key: '22. 거래내역 > 관리 > 이름 변경',
              action: Navigation.pushScreen(Navigation.Screens.TRANSACTION_MANAGE),
            },
            {
              key: '23. 거래내역 > 관리 > 비밀번호 변경 - 비밀번호 인증',
              action: Navigation.pushScreen(Navigation.Screens.AUTH_CHANGE_PASSWORD),
            },
            {
              key: '27. 거래내역 > 관리 > 보안키 확인 - 보안키 유출 주의',
              action: Navigation.pushScreen(Navigation.Screens.WARNING_KEY_LEAKAGE),
            },
            {
              key: '32. 거래내역 > 관리 > 계좌 삭제 - 경고 메시지',
              action: Navigation.pushScreen(Navigation.Screens.WARNING_QUIT_MEMBERSHIP),
            },
            {
              key: '34. 거래내역 > 관리 > 계좌 삭제 - 경고 메시지 > 계좌 삭제 최종 확인',
              action: Navigation.pushScreen(Navigation.Screens.CONFIRM_REMOVE),
            },
            {
              key: '34. 거래내역 > 관리 > 계좌 삭제 - 경고 메시지 > 백업 확인',
              action: Navigation.pushScreen(Navigation.Screens.CONFIRM_BACKUP),
            },
            {
              key: '37. 설정 > 멤버십',
              action: Navigation.pushScreen(Navigation.Screens.SETTINGS),
            },
            {
              key: '37. 설정 > 멤버십_상세',
              action: Navigation.pushScreen(Navigation.Screens.MEMBERSHIP),
            },
            {
              key: '40. 설정 > 주소록',
              action: Navigation.pushScreen(Navigation.Screens.ADDRESSBOOK),
            },
            {
              key: '41. 설정 > 주소편집 - 주소정보수정',
              action: Navigation.pushScreen(Navigation.Screens.MODIFY_ADDRESS),
            },
            {
              key: '43. 설정 > 계좌 순서 변경',
              action: Navigation.pushScreen(Navigation.Screens.SORT_ACCOUNTS),
            },
            {
              key: '46. 설정 > 주의사항',
              action: Navigation.pushScreen(Navigation.Screens.WARNING),
            },
          ],
        }}
      />
      <Text>Welcome to React Native!</Text>
      <Text>To get started, edit App.js</Text>
    </View>
  </View>
);

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
