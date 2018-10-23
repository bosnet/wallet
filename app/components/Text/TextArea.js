import React from 'react';
import { connect } from 'react-redux';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import icQR from '../../resources/images/ic_qr.png';
import { Navigation as NavAction } from '../../actions';

const Options = {
  QR_CODE: 'QRCode',
};

class TextArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.createTextField = this.createTextField.bind(this);
    this.createOption = this.createOption.bind(this);
  }

  createOption() {
    const { option, doAction } = this.props;
    const { type, callback } = option;
    switch (type) {
      case Options.QR_CODE:
        return (
          <TouchableOpacity
            style={styles.areaOption}
            onPress={() => {
              doAction(NavAction.pushScreen(NavAction.Screens.QR_SCAN));
            }}
          >
            <Image style={styles.optionIcon} source={icQR} />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  }

  createTextField() {
    const { type, text } = this.props;

    switch (type) {
      case 'text':
        return (
          <Text
            style={styles.textAreaContents}
            textBreakStrategy="simple"
          >
            {text}
          </Text>
        );
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
  }

  render() {
    const {
      label,
      lableColor,
      option,
      underline,
    } = this.props;

    return (
      <View
        style={[
          styles.textArea,
          underline ? null : styles.noUnderline,
        ]}
      >
        <View style={styles.textAreaHead}>
          <Text style={[styles.textAreaTitle, { color: lableColor }]}>{label}</Text>
          {option ? this.createOption() : null}
        </View>
        {this.createTextField()}
      </View>
    );
  }
}

TextArea.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

const connected = connect(null, mapDispatchToProps, null, { withRef: true })(TextArea);
export { connected as TextArea, Options };
