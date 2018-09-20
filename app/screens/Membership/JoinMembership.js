import React from 'react';
import { View, ScrollView, Text } from 'react-native';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton, CheckBox } from '../../components/Button';
import { HeadText } from '../../components/Text';

const JoinMembership = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '멤버십 가입 동의',
        },
        right: {
          actionText: '취소',
        },
      }}
    />

    <ScrollView
      contentContainerStyle={[styles.alignCenter, { margin: 0, padding: 0 }]}

      showsVerticalScrollIndicator={false}
    >
      <HeadText
        text="개인정보 수집 이용 동의"
      />
      <CheckBox
        label={'PMU(Proving Membership\n Uniqueness) 인증을 위해, 셀카 및 신분\n증 촬영에 동의합니다'}
      />
      <CheckBox
        label={(
          <Text>
            <Text
              style={styles.hyperlink}
            >
              개인정보보호정책
            </Text>
            <Text>에 동의합니다</Text>
          </Text>
        )}
      />
      <HeadText
        text="서비스 이용 약관 동의"
      />
      <CheckBox
        label={'BOS Flatform Foundation에 노드\n운영 위임합니다'}
      />
      <CheckBox
        label={'프로즌 어카운트에 10,000 BOS 이상\n프리징하지 않으면 멤버십이 박탈됩니다'}
      />
      <CheckBox
        label="리워드는 PF_R_00 통과 이후에 받습니다"
      />
      <CheckBox
        label={'멤버십 갱신은 1년주기이며, 갱신을 하지\n않을 경우 자동 탈퇴 되며, 리워드를 받을\n수 없습니다'}
      />
      <CheckBox
        label={'투표가 진행중인 경우에는\n멤버십 탈퇴 및 재등록을 할 수 없습니다'}
      />
      <CheckBox
        label={'스마트폰을 교체하거나 앱월렛을 재설치\n하면 멤버십을 재등록 해야합니다'}
      />
      <CheckBox
        label={'의회 멤버로서 적극적으로 토론하고, 투표\n로서 의사를 표시합니다'}
      />
      <BottomButton
        actions={[
          { text: '확인' },
        ]}
      />
    </ScrollView>
  </View>
);

JoinMembership.navigationOptions = {
  header: null,
};

export default JoinMembership;
