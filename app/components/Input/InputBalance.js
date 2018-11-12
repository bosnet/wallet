import React from 'react';
import {
  View, Text, TextInput,
} from 'react-native';

import PropTypes from 'prop-types';
import styles from './styles';
import { colors } from '../../resources';

class InputBalance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.getText = this.getText.bind(this);
  }

  getText() {
    const { text } = this.state;
    return text;
  }

  async setText(text) {
    if (text) {
      this.textinput.setNativeProps({ text });
      this.setState({
        text,
      });
    }
  }

  clear() {
    this.textinput.clearText();
  }

  render() {
    const {
      label,
      subLabel,
      lableColor,
      textColor,
      onChangeText,
    } = this.props;

    return (
      <View
        style={styles.balanceArea}
      >
        <View style={styles.balanceHead}>
          <Text
            style={[
              styles.balanceTitle,
              { color: lableColor },
            ]}
          >
            {label}
          </Text>
          <Text style={styles.balanceSubTitle}>
            {subLabel}
          </Text>
        </View>
        <View style={styles.balanceContentArea}>
          <TextInput
            {...this.props}
            ref={(c) => { this.textinput = c; }}
            style={[styles.balanceAmount, { color: textColor }]}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={(text) => {
              this.setState({ text });
              if (onChangeText) onChangeText(text);
            }}
          />
          <Text style={[styles.balanceUnit, { color: textColor }]}>BOS</Text>
        </View>
      </View>
    );
  }
}

InputBalance.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  lableColor: PropTypes.string,
  textColor: PropTypes.string,
  underline: PropTypes.bool,
};

InputBalance.defaultProps = {
  label: null,
  lableColor: colors.labelTextBlack,
  textColor: colors.textAreaContentsGray,
  underline: true,
};

export default InputBalance;
