import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const NoticeArea = ({ children }) => (
  <View style={styles.noticeArea}>
    {children}
  </View>
);


/* <Text style={styles.noticeText}>
* BOS Wallet을 삭제하면 주소록에 저장된 정보는 모두 사라지
{'\n   '}
며 복구할 수 없습니다
</Text>
<Text style={styles.noticeText}>* 중요한 주소는 따로 안전한 곳에 보관해 주시기 바랍니다</Text> */

export default NoticeArea;
