import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton, CheckBox } from '../../components/Button';
import { HeadText } from '../../components/Text';
import { colors } from '../../resources';

import icMemberIntro from '../../resources/images/ic_memberIntro.png';

const IntroMembership = () => (
  <View style={[styles.container, { backgroundColor: colors.panelBkgPurble }]}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '멤버십 소개',
        },
        right: {
          actionText: '닫기',
        },
      }}
    />
    <ScrollView
      contentContainerStyle={[
        styles.alignCenter,
        {
          margin: 0,
          paddingLeft: 0,
          backgroundColor: colors.white,
        }]}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          backgroundColor: colors.panelBkgPurble,
          height: 215,
          width: '100%',
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            marginTop: 27,
            marginLeft: 32,
            fontFamily: 'SpoqaHanSans-Bold',
            fontSize: 27,
            lineHeight: 38,
            color: colors.panelTextWhite,
          }}
        >
          {'멤버십에 가입하면\n멤버십 리워드를 드립니다'}
        </Text>
      </View>
      <Image
        style={{
          marginTop: -80,
          marginLeft: 30,
          alignSelf: 'flex-start',
          width: 160,
          height: 160,
        }}
        source={icMemberIntro}
      />
      <View style={[styles.section, styles.alignLeft, { paddingLeft: 32 }]}>
        <Text style={styles.sectionHeadText}>
          가입조건
        </Text>
        <Text style={styles.paragraphText}>
          프로즌 계좌에 10,000 BOS 이상 프리징
        </Text>
        <Text style={styles.paragraphText}>
          노드 운영 위임
        </Text>
        <Text style={styles.paragraphText}>
          PMU 인증 (본인 확인)
        </Text>
      </View>
      <View style={[styles.section, styles.alignLeft, { paddingLeft: 32 }]}>
        <Text style={styles.sectionHeadText}>
          멤버십 가입 혜택
        </Text>
        <Text style={styles.paragraphText}>
          PF_R_OO통과 이후, 프리징한 BOS 수량과 비례하여 멤버십 리워드 지급
        </Text>
      </View>
      <View style={[styles.section, styles.alignLeft, { paddingLeft: 32, marginBottom: 30 }]}>
        <Text style={styles.sectionHeadText}>
          PUM 등록 준비물
        </Text>
        <Text style={styles.paragraphText}>
          신분증 (여권)
        </Text>
        <Text style={styles.paragraphText}>
          PF_R_OO통과 이후, 프리징한 BOS 수량과 비례하여 멤버십 리워드 지급
        </Text>
      </View>
      <View style={styles.filler} />
      <BottomButton
        actions={[
          { text: '멤버십 가입하기' },
        ]}
      />
    </ScrollView>
  </View>
);

IntroMembership.navigationOptions = {
  header: null,
};

export default IntroMembership;
