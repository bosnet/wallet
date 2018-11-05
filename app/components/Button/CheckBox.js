import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import icCheckOn from '../../resources/images/ic_check_on.png';
import icCheckOff from '../../resources/images/ic_check_off.png';

// const CheckBox = ({ label, value }) => (
//   <View style={styles.checkBox}>
//     <TouchableOpacity style={styles.checkArea}>
//       <Image style={styles.checkIcon} source={icCheckOff} />
//     </TouchableOpacity>
//     <Text style={styles.checkBoxLabel}>{label}</Text>
//   </View>
// );

class CheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress(callback) {
    this.setState(prevState => ({ value: !prevState.value }), callback);
  }

  render() {
    const { value } = this.state;
    const { label, callback } = this.props;

    return (
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => {
          this.onPress(callback);
        }}
      >
        <View
          style={styles.checkArea}
          
        >
          <Image style={styles.checkIcon} source={value ? icCheckOn : icCheckOff} />
        </View>
        <Text
          style={styles.checkBoxLabel}
          textBreakStrategy="simple"
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

CheckBox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  value: PropTypes.bool,
  callback: PropTypes.func,
};

CheckBox.defaultProps = {
  value: false,
  callback: null,
};

export default CheckBox;
