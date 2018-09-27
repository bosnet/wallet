import React from 'react';
import { View, ViewPagerAndroid } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import BannerPage from './BannerPage';
import BannerPageIndicator from './BannerPageIndicator';
import { colors } from '../../resources';

const getPageKey = index => `banner${index}`;

const createBannerPage = (data, textColor) => data.map((item, index) => (
  <View style={styles.bannerLayout} key={getPageKey(index)}>
    <BannerPage
      text={item.text}
      textColor={textColor}
      color={item.color}
    />
  </View>
));

class BannerPager extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pageIndex: 0 };
    this.onPageSelected = this.onPageSelected.bind(this);
  }

  onPageSelected(event) {
    const { position } = event.nativeEvent;
    this.setState({ pageIndex: position });
  }

  render() {
    const { data, textColor } = this.props;
    const { pageIndex } = this.state;
    return (
      <View style={styles.bannerPager}>
        <BannerPageIndicator
          size={data.length}
          index={pageIndex}
        />
        <ViewPagerAndroid
          style={[styles.container]}
          initialPage={0}
          pageMargin={-50}
          onPageSelected={this.onPageSelected}
        >
          {createBannerPage(data, textColor)}
        </ViewPagerAndroid>
      </View>
    );
  }
}

BannerPager.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
  })).isRequired,
  textColor: PropTypes.string,
};

BannerPager.defaultProps = {
  textColor: colors.panelTextWhite,
};

export default BannerPager;
