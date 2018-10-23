import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import { colors } from '../../../resources';
import { TextArea } from '../../Text';

class SelectableAccountItem extends React.Component {
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
        <View style={styles.section}>
          <TextArea
            label={(
              <Text>
                <Text style={{ fontFamily: 'SpoqaHanSans-Bold' }}>어카운트이름기호</Text>
                <Text style={{ fontFamily: 'ZapfDingbatsITC' }}> ✈ </Text>
                <Text style={{ fontFamily: 'SpoqaHanSans-Bold' }}>공개 주소</Text>
              </Text>
            )}
            lableColor={colors.labelTextBlack}
            text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
            underline={false}
          />
          <TextArea
            label="출금 가능 금액"
            text="3,100,000,000.2345678"
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
  addressBook: state.addressBook.list,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectableAccountItem);
