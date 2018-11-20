import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../resources';

class labelText extends React.Component {
  render() {
    const {
      text,
      color,
      bold,
      children,
      style
    } = this.props;

    return (
      <View
        {...this.props}
        style={[style, styles.label]}
      >
        <Text style={[styles.labelText, { color }, bold ? styles.labelTextbold : null]}>{text}</Text>
        {children}
      </View>
    )
  }
}

labelText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  color: PropTypes.string,
  bold: PropTypes.bool,
  children: PropTypes.element,
};

labelText.defaultProps = {
  bold: null,
  color: colors.itemTextGray,
  children: null,
};

export default labelText;
