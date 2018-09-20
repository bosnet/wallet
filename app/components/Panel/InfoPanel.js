import React from 'react';
import { View, Image, Text } from 'react-native';
// import PropTypes from 'prop-types';

import styles from './styles';
import icVote from '../../resources/images/ic_vote.png';
import icNode from '../../resources/images/ic_node.png';
import icMember from '../../resources/images/ic_member.png';

const InfoPanel = () => (
  <View style={styles.infoPanel}>
    <View style={styles.info}>
      <Image style={styles.infoIcon} source={icMember} />
      <Text style={styles.infoText}>{'맴버십\n리워드'}</Text>
    </View>
    <View style={styles.info}>
      <Image style={styles.infoIcon} source={icNode} />
      <Text style={styles.infoText}>{'노드\n운영위임'}</Text>
    </View>
    <View style={styles.info}>
      <Image style={styles.infoIcon} source={icVote} />
      <Text style={styles.infoText}>{'Congress\nVoting'}</Text>
    </View>
  </View>
);

export default InfoPanel;
