import React from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import icInputDel from '../../resources/images/icon_input_del.png';
import icQR from '../../resources/images/ic_qr.png';

const Options = {
  QR_CODE: 'QRCode',
};

const createOption = (option) => {
  const { type } = option;
  switch (type) {
    case Options.QR_CODE:
      return (
        <TouchableOpacity style={styles.areaOption}>
          <Image style={styles.optionIcon} source={icQR} />
        </TouchableOpacity>
      );
    default:
      return null;
  }
};

const InputText = ({
  label,
  labelColor,
  placeholder,
  multiline,
  option,
}) => (
  <View style={styles.input}>
    <View style={styles.inputHead}>
      <Text style={[styles.inputTitle, { color: labelColor }]}>{label}</Text>
      { option ? createOption(option) : null }
    </View>
    <View style={styles.inputArea}>
      <TextInput
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        multiline={multiline}
        placeholder={placeholder}
        style={styles.inputText}
      />
      <TouchableOpacity style={styles.inputSupport}>
        <Image style={styles.supportButton} source={icInputDel} />
      </TouchableOpacity>
    </View>

  </View>
);

InputText.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  placeholder: PropTypes.string,
  labelColor: PropTypes.string,
  option: PropTypes.shape({
    type: PropTypes.string,
  }),
  multiline: PropTypes.bool,
};

InputText.defaultProps = {
  label: null,
  placeholder: null,
  labelColor: null,
  option: null,
  multiline: false,
};

export { InputText, Options };
