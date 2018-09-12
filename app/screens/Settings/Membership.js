import React from 'react';
import { View } from 'react-native';

import PurpleStatusBar from '../../components/StatusBar/PurpleStatusBar';
import PurpleToolbar from '../../components/Toolbar/PurpleToolbar';
import ItemList from '../../components/ItemList/ItemList';

import styles from '../styles';
import strings from '../../res/strings';

const Membership = () => (
  <View style={styles.container}>
    <PurpleStatusBar />
    <PurpleToolbar
      title={strings.Settings.titleMembership}
      backText={strings.Toolbar.close}
    />
    <View style={styles.defaultLayout}>
      <ItemList
        data={[
          { key: strings.Settings.dataChangePIN },
          { key: strings.Settings.dataReRegisterFace },
          { key: strings.Settings.dataWithdraw },
          { key: strings.Settings.dataMembershipContact },
        ]}
      />
    </View>
  </View>
);

Membership.navigationOptions = {
  header: null,
};

export default Membership;
