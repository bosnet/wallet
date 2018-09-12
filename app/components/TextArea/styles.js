import { StyleSheet } from 'react-native';
import { colors } from '../../res/index';

const styles = StyleSheet.create({
  labeledArea: {
    width: 327,
    borderBottomWidth: 2,
    borderBottomColor: colors.listSeperatorGray,
    marginBottom: 7,
  },
  labeledAreaTitle: {
    color: colors.textAreaTitleGray,
    fontSize: 16,
    marginLeft: 8,
    marginTop: 15,
    marginBottom: 8,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  labeledAreaContents: {
    color: colors.textAreaContentsGray,
    fontSize: 16,
    marginHorizontal: 8,
    marginBottom: 12,
    fontFamily: 'SpoqaHanSans-Regular',
  },

  noticeArea: {
    width: 315, // 제플린 가이드에서 단어단위로 줄바뀜으로 인해 좌우 여백이 다른 듯, 차이만큼 너비 조정함
    marginBottom: 24,
    alignSelf: 'center',
  },
  noticeText: {
    fontSize: 12,
    lineHeight: 18,
    paddingBottom: 6,
    color: colors.textAreaNoticeTextGray,
    fontFamily: 'SpoqaHanSans-Regular',
  },

});

export default styles;
