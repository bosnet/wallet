import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated, Easing,
} from 'react-native';
import { connect } from 'react-redux';

// import PropTypes from 'prop-types';

import styles from './styles';
import strings from '../../resources/strings';

import icRefresh from '../../resources/images/ic_refresh.png';

class LoadingPanel extends React.Component {
  constructor(props) {
    super(props);

    this.spinValue = new Animated.Value(0);

    this.state = {
      counter: 0,
    };

    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.reset();
    this.spin();

    if (!this.countdown) {
      this.countdown = setInterval(() => {
        // if (this.counter > 0) {
        //   this.counter -= this.counter;
        // }
        const { counter } = this.state;

        if (counter > 0) {
          this.setState(prevstate => ({
            counter: prevstate.counter - 1,
          }));
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
    this.countdown = null;
  }

  reset() {
    this.setState({
      counter: 60,
    });
  }

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
      },
    ).start(() => this.spin());
  }

  render() {
    const { text } = this.props;
    const { counter } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Home;

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.loadingPanel}>
        <View style={styles.loadingTextArea}>
          <Text
            style={styles.loadingTitle}
            numberOfLines={1}
          >
            {text}
          </Text>
          <Text style={styles.loadingSubText}>{`${counter} ${Strings.WALLET_SECOND}`}</Text>
        </View>
        <TouchableOpacity style={{ padding: 5 }}>
          <Animated.Image
            style={
              [
                styles.loadingRefreshIcon,
                {
                  transform: [
                    { rotate: spin },
                  ],
                },
              ]
            }
            source={icRefresh}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});


export default connect(mapStateToProps, null, null, { withRef: true })(LoadingPanel);
