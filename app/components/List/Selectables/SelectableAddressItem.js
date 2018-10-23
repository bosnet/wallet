import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import { colors } from '../../../resources';
import { TextArea } from '../../Text';

class SelectableAddressItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };

    const { addItem, id, name, address } = this.props;
    this.setSelected = this.setSelected.bind(this);

    addItem({
      id,
      name,
      address,
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
    const { id, address, name, setSelected } = this.props;
    const { selected } = this.state;

    return (
      <TouchableOpacity
        style={[(selected ? { backgroundColor: '#DCE7F6' } : null), { paddingLeft: 24 }]}
        onPress={() => {
          setSelected(id);
        }}
        activeOpacity={1.0}
      >
        <TextArea
          label={name}
          text={address}
          underline={false}
        />
      </TouchableOpacity>
    );
  }
}

SelectableAddressItem.propTypes = {
  action: PropTypes.shape({ type: {} }),
};

SelectableAddressItem.defaultProps = {
  action: null,
};

const mapStateToProps = state => ({
  addressBook: state.addressBook.list,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectableAddressItem);
