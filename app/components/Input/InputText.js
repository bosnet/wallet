import React from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import icInputDel from '../../resources/images/icon_input_del.png';
import icQR from '../../resources/images/ic_qr.png';

const Options = {
  QR_CODE: 'QRCode',
};

class InputText extends React.Component {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      text: '',
      isIconVisible: value ? Boolean(value) : false,
      exMultiline: false,
    };

    this.setIconVisible = this.setIconVisible.bind(this);
    this.drawIcon = this.drawIcon.bind(this);
    this.getText = this.getText.bind(this);
    this.clearText = this.clearText.bind(this);
    this.createOption = this.createOption.bind(this);
    this.focus = this.focus.bind(this);
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

  async setText(text) {
    if (text) {
      this.textinput.setNativeProps({ text });
      this.setState({
        text,
        isIconVisible: true,
      });
    }
  }

  setMultiline() {
    this.setState({
      exMultiline: true,
    });
  }

  clearText() {
    const { onChangeText } = this.props;

    this.textinput.clear();
    this.setState({
      text: '',
      isIconVisible: false,
    });

    if (onChangeText) onChangeText('');
  }

  createOption() {
    const { option, doAction } = this.props;
    const { type, action } = option;
    switch (type) {
      case Options.QR_CODE:
        return (
          <TouchableOpacity
            style={styles.areaOption}
            onPress={() => {
              doAction(action);
            }}
          >
            <Image style={styles.optionIcon} source={icQR} />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  }


  drawIcon() {
    const { isIconVisible } = this.state;

    if (isIconVisible) {
      return (
        <TouchableOpacity
          style={styles.inputSupport}
          onPress={() => {
            this.clearText();
          }}
        >
          <Image style={styles.supportButton} source={icInputDel} />
        </TouchableOpacity>
      );
    }

    return null;
  }

  focus() {
    this.textinput.focus();
  }

  render() {
    const {
      label,
      labelColor,
      multiline,
      option,
      onChangeText,
      noClear,
    } = this.props;

    const { exMultiline } = this.state;

    return (
      <KeyboardAvoidingView style={styles.input}>
        <View style={styles.inputHead}>
          <Text style={[styles.inputTitle, { color: labelColor }]}>{label}</Text>
          {option ? this.createOption() : null}
        </View>
        <View style={styles.inputArea}>
          <TextInput
            {...this.props}
            ref={(c) => { this.textinput = c; }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            multiline={exMultiline ? true : multiline}
            style={styles.inputText}
            onChangeText={(text) => {
              this.setState({ text });
              this.setIconVisible(text.length > 0);
              if (onChangeText) onChangeText(text);
            }}
          />
          {noClear ? null : this.drawIcon()}
        </View>

      </KeyboardAvoidingView>
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

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

const connected = connect(null, mapDispatchToProps, null, { withRef: true })(InputText);
export { connected as InputText, Options };
