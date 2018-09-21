import { StyleSheet } from 'react-native';
import { colors } from '../../resources';

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: 315,
    marginLeft: 16,
    paddingRight: 16,
    height: 24,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  labelTextbold: {
    fontFamily: 'SpoqaHanSans-Bold',
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
  textArea: {
    width: 315,
    borderBottomWidth: 2,
    borderBottomColor: colors.listSeperatorGray,
    marginBottom: 7,
  },
  noUnderline: {
    borderBottomWidth: 0,
  },
  textAreaHead: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  textAreaTitle: {
    flex: 1,
    color: colors.textAreaTitleGray,
    fontSize: 16,
    marginLeft: 8,
    marginTop: 15,
    marginBottom: 8,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  textAreaContents: {
    color: colors.textAreaContentsGray,
    fontSize: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  balanceTextArea: {
    marginHorizontal: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  balanceText: {
    fontFamily: 'SpoqaHanSans-Bold',
    fontSize: 16,
    paddingHorizontal: 3,
    textAlignVertical: 'center',
    textAlign: 'right',
  },
  balanceTextUnit: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 10,
    paddingHorizontal: 3,
    textAlignVertical: 'center',
    textAlign: 'right',
  },
  balanceArea: {
    width: 315,
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.listSeperatorGray,
    marginBottom: 10,
    alignSelf: 'center',
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
  headText: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 30,
    height: 36,
    width: 315,
  },
  headTextContent: {
    fontSize: 18,
    fontFamily: 'SpoqaHanSans-Bold',
  },
});

export default styles;
