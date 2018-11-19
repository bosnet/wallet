import { StyleSheet } from 'react-native';
import { colors } from '../../resources';

const styles = StyleSheet.create({
  input: {
    alignItems: 'stretch',
    alignSelf: 'stretch',
    borderBottomWidth: 2,
    borderBottomColor: colors.listSeperatorGray,
    marginBottom: 10,
    marginHorizontal: 24,
  },
  inputTitle: {
    color: colors.textAreaTitleGray,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 8,
    marginLeft: 2,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  inputArea: {
    flexDirection: 'row',
  },
  inputHead: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  inputSupport: {
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  supportButton: {
    width: 20,
    height: 20,
  },
  eyeButton: {
    width: 22,
    height: 20,
  },
  areaOption: {
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  inputText: {
    flex: 1,
    color: colors.textAreaContentsGray,
    fontSize: 16,
    borderBottomWidth: 0,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  balanceArea: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.listSeperatorGray,
    marginBottom: 10,
    marginHorizontal: 24,
    alignSelf: 'stretch',
  },
  balanceHead: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },
  balanceTitle: {
    fontSize: 16,
    fontFamily: 'SpoqaHanSans-Bold',
  },
  balanceSubTitle: {
    fontSize: 12,
    marginLeft: 10,
    color: colors.textAreaNotiTextGray,
    fontFamily: 'SpoqaHanSans-Regular',
    textAlignVertical: 'center',
  },
  balanceAmount: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'SpoqaHanSans-Regular',
    textAlignVertical: 'center',
    paddingHorizontal: 3,
  },
  balanceUnit: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 10,
    paddingHorizontal: 3,
    paddingTop: 3, // 폰트 자체 하단 여백 떄문에 적용
    textAlignVertical: 'center',
    textAlign: 'right',
  },
  balanceContentArea: {
    marginHorizontal: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default styles;
