import React, {useRef} from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Card from '../components/Card';
import colors from '../styles/colors';
import ToggleSwitch from 'toggle-switch-react-native';
import PrefixCard from '../components/SmallCard';

const {height} = Dimensions.get('window');

const HEADER_HEIGHT = height * 0.4;
const DebitCardScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const gotoSpendingLimit = () => {
    props.navigation.navigate('SpendingLimit');
  };

  const onHideCardNumberPress = () => {};

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderContainer />
        <BodyContainer onHideCardNumberPress={onHideCardNumberPress} />
      </ScrollView>
    </View>
  );
};

const HeaderContainer = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.titleAndLogoBlock}>
          <View style={styles.headerMainText}>
            <Text style={styles.headerMainText}>{'Debit Card'}</Text>
          </View>
          <Image source={require('../assets/images/logo.png')} />
        </View>
        <View style={styles.balanceBlock}>
          <Text style={styles.balanceLabel}>{'Available balance'}</Text>
          <View style={styles.balanceInfo}>
            <PrefixCard />
            <Text style={styles.balanceNumber}>{'3,000'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const BodyContainer = props => {
  const {onHideCardNumberPress} = props;
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.hideCardNumberContainer}>
          <TouchableOpacity
            style={styles.hideCardNumberContent}
            onPress={onHideCardNumberPress}>
            <Text style={styles.cardHideCardNumbemText}>
              {'Hide card number'}
            </Text>
          </TouchableOpacity>
        </View>
        <Card />
      </View>
      <View style={styles.cardConfigContainer}>
        <View style={styles.cardConfigItem}>
          <CardConfig
            title={'Top-up account'}
            description={'Deposit money to your account to use with card'}
            image={require('../assets/images/top-up.png')}
          />
        </View>
        <View style={styles.cardConfigItem}>
          <CardConfig
            title={'Weekly spending limit'}
            description={"you haven't set any spending limit on card"}
            image={require('../assets/images/spending.png')}
            isToggle
          />
        </View>
        <View style={styles.cardConfigItem}>
          <CardConfig
            title={'Freeze card'}
            description={'Your debit card is current active'}
            image={require('../assets/images/freeze.png')}
            isToggle
          />
        </View>
        <View style={styles.cardConfigItem}>
          <CardConfig
            title={'Get a new card'}
            description={'This the deactivates your current debit card'}
            image={require('../assets/images/newcard.png')}
          />
        </View>
        <View style={styles.cardConfigItem}>
          <CardConfig
            title={'Deactivated card'}
            description={'Your previously deactivated card'}
            image={require('../assets/images/deactivated.png')}
          />
        </View>
      </View>
    </View>
  );
};

const CardConfig = props => {
  const {image, title, description, isToggle, onToggleSwitch} = props;
  return (
    <View style={styles.cardConfig}>
      <Image source={image} />
      <View style={styles.cardConfigInfo}>
        <Text style={styles.cardConfigTitle}>{title}</Text>
        <Text style={styles.cardConfigDescription}>{description}</Text>
      </View>
      {isToggle && (
        <ToggleSwitch
          isOn={false}
          onColor={colors.secondary}
          onToggle={isOn => console.log('changed to : ', isOn)}
        />
      )}
    </View>
  );
};

export default DebitCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    backgroundColor: colors.primary,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 50,
  },
  titleAndLogoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerMainText: {
    fontFamily: 'AvenirNext-Bold',
    fontSize: 24,
    color: colors.textPrimary,
    marginTop: 5,
  },
  balanceBlock: {
    marginTop: 20,
  },
  balanceLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: 'AvenirNext-Medium',
  },
  balanceInfo: {
    color: colors.textPrimary,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  balanceNumber: {
    color: colors.textPrimary,
    paddingHorizontal: 10,
    fontFamily: 'AvenirNext-Bold',
    fontSize: 24,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.defaultBackground,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -30,
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginTop: -90,
  },
  hideCardNumberContainer: {
    alignItems: 'flex-end',
  },
  hideCardNumberContent: {
    backgroundColor: colors.defaultBackground,
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 20,
    borderRadius: 5,
  },
  cardHideCardNumbemText: {
    color: colors.secondary,
    fontFamily: 'AvenirNext-Bold',
    fontSize: 12,
  },
  cardConfigContainer: {
    marginTop: 20,
  },
  cardConfigItem: {
    paddingVertical: 15,
  },
  cardConfig: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardConfigInfo: {
    paddingHorizontal: 10,
    flex: 1,
  },
  cardConfigTitle: {
    color: colors.cardConfigTitle,
    fontFamily: 'AvenirNext-Medium',
    fontSize: 14,
    marginBottom: 5,
  },
  cardConfigDescription: {
    color: colors.cardConfigDes,
    fontFamily: 'AvenirNext-Regular',
    fontSize: 13,
    opacity: 0.4,
  },
});
