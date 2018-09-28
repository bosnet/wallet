import React from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import icEye from '../../resources/images/eye.png';
import icEyeOff from '../../resources/images/eye_off.png';
import { colors } from '../../resources';
import { ComponentText } from '../../resources/strings';
import { NotiPanel } from '../Panel';

// const InputPassword = ({ label, placeholder }) => (
//   <View style={styles.input}>
//     <Text style={styles.inputTitle}>{label}</Text>
//     <View style={styles.inputArea}>
//       <TextInput
//         underlineColorAndroid="transparent"
//         autoCapitalize="none"
//         autoCorrect={false}
//         placeholder={placeholder}
//         placeholderTextColor={colors.inputPlaceholderGray}
//         secureTextEntry
//         style={styles.inputText}
//       />
//       <TouchableOpacity style={styles.inputSupport}>
//         <Image style={styles.supportButton} source={icEye} />
//       </TouchableOpacity>
//     </View>

//   </View>
// );

const NotiType = {
  ERROR: 'noti/error',
  NORMAL: 'noti/normal',
};

class InputPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSecure: true,
    };

    this.onPressTouchable = this.onPressTouchable.bind(this);
    this.drawIcon = this.drawIcon.bind(this);
  }

  onPressTouchable() {
    this.setState(prevState => ({ isSecure: !prevState.isSecure }));
  }

  drawIcon() {
    const { isSecure } = this.state;
    const { isIconVisible } = this.props;

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
      label, placeholder,
      onChangeText, onFocus, onEndEditing,
    } = this.props;
    const { isSecure } = this.state;
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.input}>
          <Text style={styles.inputTitle}>{label}</Text>
          <View style={styles.inputArea}>
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={placeholder}
              placeholderTextColor={colors.inputPlaceholderGray}
              secureTextEntry={isSecure}
              style={styles.inputText}
              onChangeText={onChangeText}
              onFocus={onFocus}
              onEndEditing={onEndEditing}
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
  isIconVisible: PropTypes.bool,
};

InputPassword.defaultProps = {
  label: null,
  placeholder: null,
  onChangeText: null,
  onFocus: null,
  onEndEditing: null,
  isIconVisible: false,
};

export default InputPassword;
