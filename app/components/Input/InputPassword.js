import React from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import icEye from '../../resources/images/eye.png';
import { colors } from '../../resources';

const InputPassword = ({ label, placeholder }) => (
  <View style={styles.input}>
    <Text style={styles.inputTitle}>{label}</Text>
    <View style={styles.inputArea}>
      <TextInput
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={colors.inputPlaceholderGray}
        secureTextEntry
        style={styles.inputText}
      />
      <TouchableOpacity style={styles.inputSupport}>
        <Image style={styles.supportButton} source={icEye} />
      </TouchableOpacity>
    </View>

  </View>
);

InputPassword.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

InputPassword.defaultProps = {
  label: null,
  placeholder: null,
};

export default InputPassword;
