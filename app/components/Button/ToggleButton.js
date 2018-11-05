import React from 'react';
import {
  TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import toogleOn from '../../resources/images/switch_on.png';
import toogleOff from '../../resources/images/switch_off.png';

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);

    const { value } = this.props;
    this.state = {
      value,
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.setState(prevState => ({
      value: !prevState.value,
    }));
  }

  render() {
    const { value } = this.state;

    return (
      <TouchableOpacity
        style={{ marginTop: -11 }}
        onPress={this.onPress}
      >
        <Image style={styles.toggleButton} source={value ? toogleOn : toogleOff} />
      </TouchableOpacity>
    );
  }
}

export default ToggleButton;
