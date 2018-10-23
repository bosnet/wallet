import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from '../../styles';
import { colors, types } from '../../../resources';

import { BottomButton, CheckBox } from '../../../components/Button';
import { NotiPanel } from '../../../components/Panel';
import { InputText, InputTextOptions } from '../../../components/Input';
import { TextArea, LabelText } from '../../../components/Text';
import { Navigation as NavAction } from '../../../actions';
import { SelectableList } from '../../../components/List';

class AddressBook extends React.Component {
  constructor(props) {
    super(props);

    const { callback } = this.props;

    this.state = {
      list: [],
      callback,
    };

    this.buildAccountList = this.buildAccountList.bind(this);
    this.callbackBottomButton = this.callbackBottomButton.bind(this);
  }

  buildAccountList() {
    const { address } = this.props;
    const listArray = [];
    address.forEach((account, index) => {
      listArray.push({
        listKey: `${index}`,
        type: types.ListItem.ADDRESS,
        name: account.name,
        address: account.address,
      });
    });

    return listArray;
  }

  callbackBottomButton() {
    const { callback } = this.state;
    const { doAction } = this.props;

    const item = this.list.getSelected();

    callback(item.address);
    doAction(NavAction.popScreen());
  }

  render() {
    const { callback } = this.state;
    const { doAction } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          <SelectableList
            ref={(c) => { this.list = c; }}
            listData={{
              data: this.buildAccountList(),
            }}
            noDataText="아직 등록된 주소가 없습니다"
          />
          <View style={{ marginBottom: 10 }} />
        </ScrollView>
        <BottomButton
          actions={[
            {
              text: '선택',
              callback: this.callbackBottomButton,
            },
          ]}
        />
      </View>
    );
  }
}

AddressBook.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  address: state.addressBook.list,
  settings: state.settings,
});


const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook);
