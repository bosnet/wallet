import React from 'react';
import { View, ViewPagerAndroid, Platform, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import InfoPage from './InfoPage';
import InfoPageIndicator from './InfoPageIndicator';

const { width } = Dimensions.get('window');
const getPageKey = index => `warning${index}`;


class InfoPager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: 0,
      width,
      height: 0,
    };
    this.onPageSelected = (event) => {
      const { position } = event.nativeEvent;
      this.setState({ pageIndex: position });
    };
  }

  handlePageChange(e) {
    const index = e.nativeEvent.contentOffset.x / this.state.width;

    if (index === parseInt(index)) {
      this.setState({
        pageIndex: index,
      });
    }
  }

  createInfoPage(data) {
    return data.map((item, index) => 
    {
      const iosStyles = {};
      if (Platform.OS === "ios") {
        iosStyles.width = this.state.width;
        iosStyles.height = this.state.height;
      }
    
      return (
        <View style={[styles.pageLayout, iosStyles]} key={getPageKey(index)}>
          <InfoPage
            headText={item.headText}
            image={item.image}
            size={item.size}
            contentText={item.contentText}
          />
        </View>
      );
    });
  }

  setDimensions(e) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }

  render() {
    const { data } = this.props;
    const { pageIndex } = this.state;

    if (Platform.OS === "ios") {

      const iosStyles = {};

      iosStyles.width = this.state.width;
      iosStyles.height = this.state.height;

      return (
        <View style={styles.container}>
          <ScrollView
            style={[styles.container, { width: '100%' }]}
            horizontal
            pagingEnabled
            directionalLockEnabled
            scrollEventThrottle={100}
            bounces={false}
            scrollsToTop={false}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onScroll={(e) => this.handlePageChange(e)}
            onLayout={e => this.setDimensions(e)}
          >
            {this.createInfoPage(data)}
          </ScrollView>
          <InfoPageIndicator
            size={data.length}
            index={pageIndex}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ViewPagerAndroid
          style={styles.container}
          initialPage={0}
          pageMargin={0}
          onPageSelected={this.onPageSelected}
        >
          {this.createInfoPage(data)}
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
