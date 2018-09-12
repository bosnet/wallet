import React from 'react';
import { View } from 'react-native';

import styles from '../styles';
import strings from '../../res/strings';

import WhiteStatusBar from '../../components/StatusBar/WhiteStatusBar';
import WhiteToolbar from '../../components/Toolbar/WhiteToolbar';
import LabeledList from '../../components/ItemList/LabeledList';

const SettingMain = () => (
  <View style={styles.container}>
    <WhiteStatusBar />
    <WhiteToolbar title={strings.Settings.titleSettings} />
    <View style={styles.defaultLayout}>
      <LabeledList
        sections={[
          {
            title: strings.Settings.sectionMemberShipReward,
            data: [
              strings.Settings.dataMemeberShip,
              strings.Settings.dataAddress,
              strings.Settings.dataAccountsOrder,
              strings.Settings.dataLanguage,
              strings.Settings.dataNotifyVote,
            ],
            goto: [
              strings.nav.Membership,
              strings.nav.AddressBook,
            ],
            itemTypes: {
              3: {
                type: 'TextItem',
                value: '한국어',
              },
              4: {
                type: 'ToggleItem',
                value: true,
              },
            },
          },
          {
            title: strings.Settings.sectionInformation,
            data: [
              strings.Settings.dataFAQ,
              strings.Settings.dataCautions,
              strings.Settings.dataOpenSourceLicense,
              strings.Settings.dataVersion,
            ],
            itemTypes: {
              0: {
                type: 'WindowItem',
              },
              3: {
                type: 'TextItem',
                value: 'v 0.1',
              },
            },
          },
        ]}
      />
    </View>
  </View>
);

SettingMain.navigationOptions = {
  header: null,
};

export default SettingMain;
