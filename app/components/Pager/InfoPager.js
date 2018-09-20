import React from 'react';
import { View, ViewPagerAndroid } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import InfoPage from './InfoPage';
import InfoPageIndicator from './InfoPageIndicator';

const getPageKey = index => `warning${index}`;

const createInfoPage = data => data.map((item, index) => (
  <View style={styles.pageLayout} key={getPageKey(index)}>
    <InfoPage
      headText={item.headText}
      image={item.image}
      size={item.size}
      contentText={item.contentText}
    />
  </View>
));

class InfoPager extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pageIndex: 0 };
    this.onPageSelected = (event) => {
      const { position } = event.nativeEvent;
      this.setState({ pageIndex: position });
    };
  }

  render() {
    const { data } = this.props;
    const { pageIndex } = this.state;
    return (
      <View style={styles.container}>
        <ViewPagerAndroid
          style={styles.container}
          initialPage={0}
          pageMargin={0}
          onPageSelected={this.onPageSelected}
        >
          {createInfoPage(data)}
        </ViewPagerAndroid>
        <InfoPageIndicator
          size={data.length}
          index={pageIndex}
        />
      </View>
    );
  }
}

InfoPager.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    headText: PropTypes.string,
    contentText: PropTypes.string,
  })).isRequired,
};

export default InfoPager;
