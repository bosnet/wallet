import React from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import icEye from '../../resources/images/eye.png';
import icEyeOff from '../../resources/images/eye_off.png';
import { colors } from '../../resources';
import { ComponentText } from '../../resources/strings/ko';
import { NotiPanel } from '../Panel';

const NotiType = {
  ERROR: 'noti/error',
  NORMAL: 'noti/normal',
};

class InputPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isSecure: true,
      isIconVisible: false,
    };

    this.onPressTouchable = this.onPressTouchable.bind(this);
    this.setIconVisible = this.setIconVisible.bind(this);
    this.drawIcon = this.drawIcon.bind(this);
    this.getText = this.getText.bind(this);
  }

  onPressTouchable() {
    this.setState(prevState => ({ isSecure: !prevState.isSecure }));
  }

  setIconVisible(value) {
    this.setState({
      isIconVisible: value,
    });
  }

  getText() {
    const { text } = this.state;
    return text;
  }

  drawIcon() {
    const { isSecure, isIconVisible } = this.state;

    if (isIconVisible) {
      return (
        <TouchableOpacity
          style={[
            styles.inputSupport,
          ]}
          onPress={this.onPressTouchable}
        >
          <Image style={styles.supportButton} source={isSecure ? icEye : icEyeOff} />
        </TouchableOpacity>
      );
    }

    return null;
  }


  render() {
    const {
      label,
      onChangeText,
    } = this.props;
    const { isSecure } = this.state;
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.input}>
          <View style={styles.inputHead}>
            <Text style={styles.inputTitle}>{label}</Text>
          </View>
          <View style={styles.inputArea}>
            <TextInput
              {...this.props}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={colors.inputPlaceholderGray}
              secureTextEntry={isSecure}
              style={styles.inputText}
              onChangeText={(text) => {
                this.setState({ text });
                this.setIconVisible(text.length > 0);
                if (onChangeText) onChangeText(text);
              }}
            />
            {this.drawIcon()}
          </View>
        </View>
      </View>
    );
  }
}

InputPassword.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onEndEditing: PropTypes.func,
};

InputPassword.defaultProps = {
  label: null,
  placeholder: null,
  onChangeText: null,
  onFocus: null,
  onEndEditing: null,
};

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(null, mapDispatchToProps, null, { withRef: true })(InputPassword);
