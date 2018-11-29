import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import { colors, types } from '../../../resources';
import styles from '../styles';
import { TextArea } from '../../Text';

import strings from '../../../resources/strings';

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
    const { id, address, name, balance, setSelected, settings } = this.props;
    const { selected } = this.state;

    const Strings = strings[settings.language].ComponentText;

    return (
      <TouchableOpacity
        style={[(selected ? { backgroundColor: '#DCE7F6' } : null)]}
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
            label={Strings.WITHDRAWAL_ITEM_LABEL}
            text={
              new BigNumber(balance)
                .toFormat(7)
                .replace(/[0]+$/, '')
                .replace(/[.]+$/, '')
            }
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

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectableAccountItem);
