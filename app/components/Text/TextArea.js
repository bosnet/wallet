import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
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

const createTextField = (type, text) => {
  switch (type) {
    case 'text':
      return (<Text style={styles.textAreaContents}>{text}</Text>);
    case 'balance':
      return (
        <View style={styles.balanceTextArea}>
          <Text style={styles.balanceText}>{text}</Text>
          <Text style={styles.balanceTextUnit}>BOS</Text>
        </View>
      );
    default:
      return (<Text style={styles.textAreaContents}>{text}</Text>);
  }
};

const TextArea = ({
  label,
  lableColor,
  option,
  type,
  text,
  underline,
}) => (
  <View
    style={[
      styles.textArea,
      underline ? null : styles.noUnderline,
    ]}
  >
    <View style={styles.textAreaHead}>
      <Text
        style={[
          styles.textAreaTitle,
          { color: lableColor },
        ]}
      >
        {label}
      </Text>
      { option ? createOption(option) : null }
    </View>
    {createTextField(type, text)}
  </View>
);

TextArea.propTypes = {
  label: PropTypes.oneOfType(PropTypes.string, PropTypes.element),
  option: PropTypes.shape({
    type: PropTypes.string,
  }),
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  lableColor: PropTypes.string,
  underline: PropTypes.bool,
};

TextArea.defaultProps = {
  label: null,
  option: null,
  lableColor: null,
  underline: true,
  type: 'text',
};

export { TextArea, Options };
export default TextArea;
