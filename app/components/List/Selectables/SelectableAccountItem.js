import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity, View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { colors, types } from '../../../resources';
import styles from '../styles';
import { TextArea } from '../../Text';
import { TRANSACTION_FEE, MINIMUM_BALANCE } from '../../../config/transactionConfig'

class SelectableAccountItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };

    const { addItem, id, name, address, balance, account } = this.props;
    this.setSelected = this.setSelected.bind(this);

    addItem({
      id,
      name,
      address,
      balance,
      account,
      setSelected: (value) => {
        this.setState({
          selected: value,
        });
      },
    });
  }

  setSelected(value) {
    this.setState({
      selected: value,
    });
  }


  render() {
    const { id, address, name, balance, setSelected } = this.props;
    const { selected } = this.state;

    return (
      <TouchableOpacity
        style={[(selected ? { backgroundColor: '#DCE7F6' } : null), { paddingLeft: 24 }]}
        onPress={() => {
          setSelected(id);
        }}
        activeOpacity={1.0}
      >
        <View style={styles.section}>
          <TextArea
            label={name}
            lableColor={colors.labelTextBlack}
            text={address}
            underline={false}
          />
          <TextArea
            label="출금 가능 금액"
            text={(balance > 0) ? balance - TRANSACTION_FEE - MINIMUM_BALANCE : 0}
            type={types.TextArea.BALACNE}
            underline={false}
          />
        </View>
        <View style={styles.seperator} />
      </TouchableOpacity>
    );
  }
}

SelectableAccountItem.propTypes = {
  action: PropTypes.shape({ type: {} }),
};

SelectableAccountItem.defaultProps = {
  action: null,
};


const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(null, mapDispatchToProps)(SelectableAccountItem);
