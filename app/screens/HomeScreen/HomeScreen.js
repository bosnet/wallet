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
              key: '1-2. 홈 (어카운트 있음)',
              action: Navigation.pushScreen(Navigation.Screens.SETTINGS),
            },
            {
              key: '3. 계좌 생성 > 계좌 생성 주의사항 > 비밀번호 설정',
            },
            {
              key: '5-1. 멤버십 소개 페이지',
            },
            {
              key: '5-2. 멤버십 가입 동의',
            },
            {
              key: '5-5. 추천인 공개 주소 입력',
            },
            {
              key: '5. 계좌 가져오기>가져오기선택',
            },
            {
              key: '6. 계좌 가져오기 > 보안키로 가져오기',
            },
            {
              key: '6. 계좌 가져오기 > 보안키로 가져오기 - QRcode reader screen',
            },
            {
              key: '10. 거래내역 - 공통 - 유효하지 않은 General Account',
            },
            {
              key: '10. 거래내역 - 멤버십 가입 전 - General Account',
            },
            {
              key: '11. 거래 상세 내역 - Frozen Account - 계좌 생성 입금',
            },
            {
              key: '11. 거래내역 - General Account - 거래 상세 내역',
            },
            {
              key: '11. 거래내역 - General Account - 거래 상세 내역_프리징',
            },
            {
              key: '12. 거래내역 > 보내기',
            },
            {
              key: '13. 거래내역 > 보내기 > 출금 계좌 선택',
            },
            {
              key: '14. 거래내역 > 보내기 > 받는 계좌 공개 주소 - 직접입력탭',
            },
            {
              key: '17. 거래내역 > 보내기 > 받는 계좌 공개 주소 > 송금내역 확인 > 비밀번호 인증 > 송금요청생성',
            },
            {
              key: '18_Wallet_Account_받기',
            },
            {
              key: '22. 거래내역 > 관리 > 이름 변경',
            },
            {
              key: '23. 거래내역 > 관리 > 비밀번호 변경 - 비밀번호 인증',
            },
            {
              key: '27. 거래내역 > 관리 > 보안키 확인 - 보안키 유출 주의',
            },
            {
              key: '32. 거래내역 > 관리 > 계좌 삭제 - 경고 메시지',
            },
            {
              key: '34. 거래내역 > 관리 > 계좌 삭제 - 경고 메시지 > 계좌 삭제 최종 확인',
            },
            {
              key: '34. 거래내역 > 관리 > 계좌 삭제 - 경고 메시지 > 백업 확인',
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
            },
            {
              key: '40. 설정 > 주소록_1',
            },
            {
              key: '41. 설정 > 주소편집 - 주소정보수정',
            },
            {
              key: '43. 설정 > 계좌 순서 변경',
            },
            {
              key: '46. 설정 > 주의사항',
            },
            {
              key: '46. 설정 > 주의사항_1',
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
