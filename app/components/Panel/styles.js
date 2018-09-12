import { StyleSheet } from 'react-native';
import { colors } from '../../res/index';

const styles = StyleSheet.create({
  addressPanel: {
    width: 327,
    height: 96,
    alignSelf: 'center',
    borderRadius: 6,
    backgroundColor: colors.panelBkgPurble,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressPanelTitle: {
    marginTop: 20,
    marginLeft: 25,
    fontSize: 16,
    color: colors.panelTextWhite,
  },
  addressPanelContents: {
    color: colors.panelTextWhite,
    alignSelf: 'flex-end',
    marginBottom: -16 + 25, /* font 자체에 하단 여백 있어 -값 추가 */
    marginRight: 25,
  },
  PanelContentsNum: {
    fontSize: 36,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  PanelContentsStr: {
    fontSize: 16,
    fontFamily: 'SpoqaHanSans-Bold',

  },
});

export default styles;
