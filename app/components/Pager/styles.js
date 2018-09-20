import { StyleSheet } from 'react-native';
import { colors } from '../../resources';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageLayout: {
    flex: 1,
    alignItems: 'flex-start',
  },

  infoPage: {
    flex: 1,
  },
  infoHeadText: {
    marginTop: 25,
    marginLeft: 50,
    fontSize: 30,
    lineHeight: 40,
    color: colors.warningTextPurple,
    fontFamily: 'SpoqaHanSans-Bold',
  },
  infoImage: {
    margin: 50,

  },
  infoContentArea: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  infoContentText: {
    marginLeft: 50,
    marginBottom: 50,
    fontSize: 18,
    lineHeight: 24,
    color: colors.warningTextGray,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  infoPageIndicator: {
    flexDirection: 'row',
    marginBottom: 30,
    alignSelf: 'center',
  },
  pageActive: {
    width: 22,
    height: 7,
    borderRadius: 17,
    backgroundColor: '#272f7e',
    margin: 3,
  },
  pageInactive: {
    width: 7,
    height: 7,
    borderRadius: 17,
    backgroundColor: '#9b9b9b',
    margin: 3,
  },
});

export default styles;
