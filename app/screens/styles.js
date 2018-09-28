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
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 30,
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
    marginTop: 30,
  },
  headText: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: 'SpoqaHanSans-Regular',
    color: colors.layoutHeadText,
    marginBottom: 40,
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
    marginTop: 30,
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
});

export default styles;
