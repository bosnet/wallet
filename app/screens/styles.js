import { StyleSheet } from 'react-native';
import { colors } from '../resources';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  defaultLayout: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  centerLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixBottom: {
    position: 'absolute',
    bottom: 0,
  },
  footer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  section: {
    marginTop: 15,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  sectionHeadText: {
    lineHeight: 36,
    fontSize: 18,
    fontFamily: 'SpoqaHanSans-Bold',
    color: colors.headTextBlack,
    marginBottom: 8,
  },
  paragraphText: {
    lineHeight: 24,
    fontSize: 18,
    fontFamily: 'SpoqaHanSans-Regular',
    color: colors.paragraphGray,
    marginBottom: 11,
  },

  layoutHead: {
    marginTop: 20,
  },
  headText: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: 'SpoqaHanSans-Regular',
    color: colors.layoutHeadText,
    lineHeight: 26,
    marginBottom: 40,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  filler: {
    alignSelf: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  textBold: {
    fontFamily: 'SpoqaHanSans-Bold',
  },
  noToolbar: {
    paddingTop: 45,
  },
  seperator: {
    marginTop: 5,
    height: 1,
    width: 351,
    marginLeft: 30,
    opacity: 0.8,
    borderBottomWidth: 1,
    borderColor: colors.seperatorGray,
  },
  hyperlink: {
    color: '#6770cb',
    textDecorationLine: 'underline',
  },

  imageNew: {
    position: 'absolute',
    top: 0,
    right: 72 + 12,
    width: 240,
    height: 118,
  },
  imageCombine: {
    position: 'absolute',
    top: 0,
    right: 28 + 13,
    width: 219,
    height: 183,
  },
  imageNewEng: {
    position: 'absolute',
    top: 0,
    right: 72 + 12,
    width: 251,
    height: 152,
  },
  imageCombineEng: {
    position: 'absolute',
    top: 0,
    right: 16 + 13,
    width: 185,
    height: 230,
  },
});

export default styles;
