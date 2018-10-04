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

class InputText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isIconVisible: false,
    };

    this.setIconVisible = this.setIconVisible.bind(this);
    this.drawIcon = this.drawIcon.bind(this);
    this.getText = this.getText.bind(this);
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
    const { isIconVisible } = this.state;

    if (isIconVisible) {
      return (
        <TouchableOpacity
          style={styles.inputSupport}
          onPress={() => {
            this.textinput.clear();
          }}
        >
          <Image style={styles.supportButton} source={icInputDel} />
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const {
      label,
      labelColor,
      multiline,
      option,
      onChangeText,
    } = this.props;

    return (
      <View style={styles.input}>
        <View style={styles.inputHead}>
          <Text style={[styles.inputTitle, { color: labelColor }]}>{label}</Text>
          {option ? createOption(option) : null}
        </View>
        <View style={styles.inputArea}>
          <TextInput
            {...this.props}
            ref={(c) => { this.textinput = c; }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            multiline={multiline}
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
    );
  }
}

InputText.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  placeholder: PropTypes.string,
  labelColor: PropTypes.string,
  option: PropTypes.shape({
    type: PropTypes.string,
  }),
  multiline: PropTypes.bool,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onEndEditing: PropTypes.func,
};

InputText.defaultProps = {
  label: null,
  placeholder: null,
  labelColor: null,
  option: null,
  multiline: false,
  onChangeText: null,
  onFocus: null,
  onEndEditing: null,
};

export { InputText, Options };
