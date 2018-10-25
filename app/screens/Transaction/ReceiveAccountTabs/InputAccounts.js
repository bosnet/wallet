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
import { ItemList } from '../../../components/List';

class InputAccounts extends React.Component {
  constructor(props) {
    super(props);

    const { callback } = this.props;

    this.state = {
      list: [],
      callback,
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
    const { list } = this.state;
    const listArray = [];
    list.forEach((account, index) => {
      listArray.push({
        listKey: `${index}`,
        type: types.ListItem.TEXTAREA,
        name,
        key,
      });
    });

    return listArray;
  }

  callbackBottomButton() {
    const { callback } = this.state;
    const { doAction } = this.props;

    const text = this.input.getWrappedInstance().getText();

    callback(text);
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
          <InputText
            ref={(c) => { this.input = c; }}
            label={(<Text style={styles.textBold}>공개주소</Text>)}
            labelColor={colors.labelTextBlack}
            placeholder="G로 시작하는 공개주소 56자를 입력하세요"
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
          <LabelText
            text={(
              <Text>
                <Text style={{ fontWeight: 'bold' }}>최근송금내역</Text>
              </Text>
            )}
          />
          <ItemList
            listType={types.ListType.FLAT}
            listData={{
              data: this.buildAccountList(),
            }}
            noDataText={
              '아직 등록된\n'
              + '주소가 없습니다'
            }
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

InputAccounts.navigationOptions = {
  header: null,
};

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(null, mapDispatchToProps)(InputAccounts);
