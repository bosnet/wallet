import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { LeftElement, CenterElement, RightElement } from './partial';
import styles from '../styles';

const Theme = {
  WHITE: 'white',
  PURPLE: 'purple',
};

const ThemeStyle = {
  white: {
    toolbar: styles.whiteToolbar,
  },
  purple: {
    toolbar: styles.purpleToolbar,
  },
};

const DefaultToolbar = ({ theme, data }) => (
  <View style={[styles.toolbarDefault, ThemeStyle[theme].toolbar]}>
    <LeftElement
      theme={theme}
      data={data.left}
    />
    <CenterElement
      theme={theme}
      data={data.center}
    />
    <RightElement
      theme={theme}
      data={data.right}
    />
  </View>
);

DefaultToolbar.propTypes = {
  theme: PropTypes.string.isRequired,
  data: PropTypes.shape({
    left: {
      hasArrow: PropTypes.bool, // 뒤로가기 화살표 Null, false 면 숨김
      title: PropTypes.string, // Null 이면 숨김
    },
    right: {
      actionText: PropTypes.string, // Null 이면 숨김
      action: PropTypes.object, // actionCreator로 생성
    },
    center: {
      title: PropTypes.string, // Null 이면 숨김
    },
  }).isRequired,
};

export { DefaultToolbar, Theme };
