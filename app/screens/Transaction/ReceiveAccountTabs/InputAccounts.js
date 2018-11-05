import React from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import styles from '../../styles';
import { colors, types } from '../../../resources';
import strings from '../../../resources/strings';

import { BottomButton, CheckBox } from '../../../components/Button';
import { NotiPanel } from '../../../components/Panel';
import { InputText, InputTextOptions } from '../../../components/Input';
import { TextArea, LabelText } from '../../../components/Text';
import { Navigation as NavAction } from '../../../actions';
import { SelectableList } from '../../../components/List';

class InputAccounts extends React.Component {
  constructor(props) {
    super(props);

    const { callback } = this.props;
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.ReceiveAccount.InputAccounts;

    this.state = {
      list: [],
      callback,

      addressNotiColor: colors.textAreaNotiTextGray,
      addressNotiText: Strings.HELPER_ADDRESS_DEFAULT,
    };

    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
    this.buildAccountList = this.buildAccountList.bind(this);
    this.callbackBottomButton = this.callbackBottomButton.bind(this);
  }

  componentDidMount() {
    // this.input.getWrappedInstance().setText('GD2KIHL4OYMHHGX55D2D3LVTT44JDHVC6TPLNCUTLWHGIWTJM5MVNC66');
  }

  onNavigateWithResult(key) {
    this.input.getWrappedInstance().setText(key.toString());
  }

  buildAccountList() {
    const { recents, addressBook, accounts } = this.props;
    const listArray = [];
    recents.forEach((recent, index) => {

      const adrIndex = addressBook.map(e => e.address).indexOf(recent.address);
      let name = '';

      if (adrIndex >= 0) {
        name = addressBook[adrIndex].name;
      } else {
        const accIndex = accounts.map(e => e.address).indexOf(recent.address);

        if (accIndex >= 0) {
          name = accounts[accIndex].name;
        } else {
          name = '';
        }
      }

      listArray.push({
        listKey: `${index}`,
        type: types.ListItem.ADDRESS,
        address: recent.address,
        name,
      });
    });

    return listArray;
  }

  callbackBottomButton() {
    const { callback } = this.state;
    const { doAction } = this.props;
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.ReceiveAccount.InputAccounts;

    const text = this.input.getWrappedInstance().getText();

    const item = this.list.getSelected();

    if (item) {
      callback(item.address);
    } else {
      if (text.length === 0) {
        ToastAndroid.show(Strings.TOAST_NO_ADDRESS, ToastAndroid.SHORT);

        this.setState({
          addressNotiText: Strings.HELPER_ADDRESS_ERROR_NO_INPUT,
          addressNotiColor: colors.alertTextRed,
        });

        return;
      }

      if (!text.match(/^G.+/)) {
        this.setState({
          addressNotiText: Strings.HELPER_ADDRESS_ERROR_NOT_VALID,
          addressNotiColor: colors.alertTextRed,
        });
        
        return;
      }

      callback(text);
    }

    doAction(NavAction.popScreen());
  }

  render() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.ReceiveAccount.InputAccounts;

    const { callback, addressNotiText, addressNotiColor } = this.state;
    const { doAction } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          <InputText
            ref={(c) => { this.input = c; }}
            label={(<Text style={styles.textBold}>{Strings.LABEL_PUBLIC_ADDRESS}</Text>)}
            labelColor={colors.labelTextBlack}
            placeholder={Strings.INPUT_PLACEHOLDER}
            option={{
              type: InputTextOptions.QR_CODE,
              action: NavAction.pushScreen(
                NavAction.Screens.QR_SCAN,
                {
                  callback: this.onNavigateWithResult,
                },
              ),
            }}
            multiline
          />
          <NotiPanel
            texts={[
              addressNotiText,
            ]}
            color={addressNotiColor}
          />
          <LabelText
            text={(
              <Text>
                <Text style={{ fontWeight: 'bold' }}>{Strings.LABEL_RECENT_SENT}</Text>
              </Text>
            )}
          />
          <SelectableList
            ref={(c) => { this.list = c; }}
            listData={{
              data: this.buildAccountList(),
            }}
            noDataText={Strings.NO_RECENT_ADDRESS}
          />
          <View style={{ marginBottom: 10 }} />
        </ScrollView>
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_SELECT,
              callback: this.callbackBottomButton,
            },
          ]}
        />
      </View>
    );
  }
}

InputAccounts.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accounts: state.accounts.list,
  addressBook: state.addressBook.list,
  settings: state.settings,
  recents: state.recentAddress.list,
});


const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputAccounts);
