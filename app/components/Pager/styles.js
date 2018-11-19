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
    marginHorizontal: 30,
    fontSize: 26,
    lineHeight: 40,
    color: colors.warningTextPurple,
    fontFamily: 'SpoqaHanSans-Bold',
  },
  infoImage: {
    marginHorizontal: 30,
    marginVertical: 50,
  },
  infoContentArea: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  infoContentText: {
    marginHorizontal: 30,
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

  bannerLayout: {
    alignItems: 'flex-start',
  },
  bannerPager: {
    height: 160,
  },
  bannerCard: {
    width: 304,
    height: 105,
    marginHorizontal: 2.5,
    marginLeft: 15,
    backgroundColor: colors.buttonTextPurple,
    elevation: 5,
    borderRadius: 6,
  },
  bannerTextArea: {
    width: 202,
    height: 56,
    marginTop: 13,
    marginLeft: 23,
  },
  bannerText: {
    fontFamily: 'SpoqaHanSans-Light',
    fontSize: 16,
    lineHeight: 28,
  },
  bannerPageIndicator: {
    flexDirection: 'row',
    marginVertical: 13,
    alignSelf: 'center',
  },
});

export default styles;
