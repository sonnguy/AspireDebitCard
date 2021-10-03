import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageProps,
} from 'react-native';
import Card from '../components/Card';
import colors from '../styles/colors';
import ToggleSwitch from 'toggle-switch-react-native';
import PrefixCard from '../components/PrefixCard';
import {IoniconsIcon} from '../components/Icon';
import commonUtils from '../utils/commonUtils';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfo, updateUserInfo} from '../store/actions/userActions';
import NumberFormat from 'react-number-format';
import {UserModal} from '../store/services/userModel';

const HEADER_HEIGHT = 300;
const PROGRESS_BAR_WIDTH = commonUtils.deviceDimension.width - 40;

const USER_ID = 1;

const DebitCardScreen = (props: any) => {
  const user = useSelector((state: any) => state.user.userData);
  const [hideCardNumber, setHideCardNumber] = useState(false);
  const [spendingLimitOn, setSpendingLimitOn] = useState(false);

  const dispatch = useDispatch();

  const getUserAct = () => dispatch(getUserInfo(USER_ID));
  const updateUserAct = (data: UserModal) => dispatch(updateUserInfo(data));

  const gotoSpendingLimit = () => {
    props.navigation.navigate('SpendingLimit');
  };

  const onHideCardToggle = () => {
    setHideCardNumber(!hideCardNumber);
  };

  const onFreezeCardToggle = (isOn: boolean) => {
    const data = {...user, freezeCard: isOn};
    updateUserAct(data);
  };

  const onSpendingLimitToggle = (isOn: boolean) => {
    const data = {
      ...user,
      weeklySpendingLimit: isOn ? user.weeklySpendingLimit : null,
    };
    setSpendingLimitOn(isOn);
    updateUserAct(data);
    isOn && gotoSpendingLimit();
  };

  useEffect(() => {
    getUserAct();
  }, []);

  useEffect(() => {
    setSpendingLimitOn(user.weeklySpendingLimit ? true : false);
  }, [user]);

  return (
    <View style={styles.container}>
      <HeaderContainer user={user} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BodyContainer
          user={user}
          hideCardNumber={hideCardNumber}
          spendingLimitOn={spendingLimitOn}
          onHideCardToggle={onHideCardToggle}
          onFreezeCardToggle={onFreezeCardToggle}
          onSpendingLimitToggle={onSpendingLimitToggle}
          gotoSpendingLimit={gotoSpendingLimit}
        />
      </ScrollView>
    </View>
  );
};

export interface HeaderContainerProps {
  user: UserModal;
}

const HeaderContainer = ({user}: HeaderContainerProps) => {
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
            <NumberFormat
              value={user?.balanceNumber}
              displayType={'text'}
              thousandSeparator={true}
              renderText={value => (
                <Text style={styles.balanceNumber}>{value}</Text>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export interface BodyContainerProps {
  user: UserModal;
  hideCardNumber: boolean;
  spendingLimitOn: boolean;
  onHideCardToggle: () => void;
  onSpendingLimitToggle: (isOn: boolean) => void;
  onFreezeCardToggle: (isOn: boolean) => void;
  gotoSpendingLimit: () => void;
}

const BodyContainer = (props: BodyContainerProps) => {
  const {
    user,
    hideCardNumber,
    spendingLimitOn,
    onHideCardToggle,
    onSpendingLimitToggle,
    onFreezeCardToggle,
    gotoSpendingLimit,
  } = props;
  const {
    cardName,
    cardNumber,
    cardExpireDate,
    cardCVV,
    payed,
    weeklySpendingLimit,
  } = user;

  const getProgressWidth = () => {
    if (!weeklySpendingLimit) {
      return 0;
    }
    if (weeklySpendingLimit < payed) {
      return PROGRESS_BAR_WIDTH;
    }
    const percent = (payed * 100) / weeklySpendingLimit;
    const width = (percent / 100) * PROGRESS_BAR_WIDTH;
    return width;
  };

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.bodyContentBlock}>
        <View style={styles.cardContainer}>
          <View style={styles.hideCardNumberContainer}>
            <TouchableOpacity
              style={styles.hideCardNumberContent}
              onPress={onHideCardToggle}>
              <IoniconsIcon
                name={hideCardNumber ? 'ios-eye' : 'ios-eye-off'}
                size={16}
                color={colors.secondary}
              />
              <Text style={styles.cardHideCardNumberText}>
                {`${hideCardNumber ? 'Show' : 'Hide'} card number`}
              </Text>
            </TouchableOpacity>
          </View>
          <Card
            cardInfo={{cardName, cardNumber, cardExpireDate, cardCVV}}
            hideCardNumber={hideCardNumber}
          />
        </View>
        <View style={styles.cardConfigContainer}>
          {spendingLimitOn && (
            <View style={styles.weeklySpendingTrackContainer}>
              <View style={styles.flexRowCenter}>
                <Text style={styles.weeklySpendingTrackText}>
                  {'Debit card spending limit'}
                </Text>
                <View style={styles.flexRowCenter}>
                  <NumberFormat
                    value={user.payed}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => (
                      <Text style={styles.weeklySpendingPayed}>${value}</Text>
                    )}
                  />
                  <View style={styles.separateLine} />
                  <NumberFormat
                    value={user.weeklySpendingLimit}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => (
                      <Text style={styles.weeklySpendingLimit}>${value}</Text>
                    )}
                  />
                </View>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressCompleted,
                    {
                      width: getProgressWidth(),
                      backgroundColor:
                        weeklySpendingLimit < payed
                          ? colors.overLimit
                          : colors.secondary,
                    },
                  ]}
                />
              </View>
            </View>
          )}
          <View style={styles.cardConfigItem}>
            <CardConfig
              title={'Top-up account'}
              description={'Deposit money to your account to use with card'}
              image={require('../assets/images/top-up.png')}
            />
          </View>
          <View style={styles.cardConfigItem}>
            <CardConfig
              onPress={gotoSpendingLimit}
              title={'Weekly spending limit'}
              description={
                user.weeklySpendingLimit > 0 ? (
                  <NumberFormat
                    value={user?.weeklySpendingLimit}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => (
                      <Text>Your week spending limit is S$ {value}</Text>
                    )}
                  />
                ) : (
                  "You haven't set any spending limit on card"
                )
              }
              image={require('../assets/images/spending.png')}
              showToggle
              isToggle={spendingLimitOn}
              onToggleSwitch={onSpendingLimitToggle}
            />
          </View>
          <View style={styles.cardConfigItem}>
            <CardConfig
              title={'Freeze card'}
              description={`Your debit card is current ${
                user.freezeCard ? 'freeze' : 'active'
              }`}
              image={require('../assets/images/freeze.png')}
              showToggle
              isToggle={user.freezeCard}
              onToggleSwitch={onFreezeCardToggle}
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
    </View>
  );
};

export interface CardConfigProps {
  image: ImageProps;
  title: string;
  description: any;
  showToggle?: boolean;
  isToggle?: boolean;
  onToggleSwitch?: (isOn: boolean) => void;
  onPress?: () => void;
}

const CardConfig = (props: CardConfigProps) => {
  const {
    image,
    title,
    description,
    showToggle,
    isToggle,
    onToggleSwitch,
    onPress,
  } = props;
  return (
    <TouchableOpacity style={styles.cardConfig} onPress={onPress}>
      <Image source={image} />
      <View style={styles.cardConfigInfo}>
        <Text style={styles.cardConfigTitle}>{title}</Text>
        <Text style={styles.cardConfigDescription}>{description}</Text>
      </View>
      {showToggle && (
        <ToggleSwitch
          isOn={isToggle}
          onColor={colors.secondary}
          onToggle={onToggleSwitch}
        />
      )}
    </TouchableOpacity>
  );
};

export default DebitCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: commonUtils.statusBarHeight,
  },
  titleAndLogoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerMainText: {
    fontFamily: 'AvenirNext-Bold',
    fontSize: 24,
    color: colors.textPrimary,
    marginTop: 5,
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceBlock: {
    marginTop: 10,
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
    paddingTop: HEADER_HEIGHT,
  },
  bodyContentBlock: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: colors.defaultBackground,
    paddingBottom: 30,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHideCardNumberText: {
    color: colors.secondary,
    fontFamily: 'AvenirNext-Bold',
    fontSize: 12,
    paddingLeft: 5,
  },
  weeklySpendingTrackContainer: {
    paddingVertical: 10,
  },
  weeklySpendingTrackText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 13,
  },
  weeklySpendingPayed: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 13,
    color: colors.secondary,
  },
  separateLine: {
    height: 12,
    width: 2,
    backgroundColor: colors.textGray2,
    marginHorizontal: 5,
  },
  weeklySpendingLimit: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 13,
    color: colors.textGray2,
  },
  progressBar: {
    width: PROGRESS_BAR_WIDTH,
    backgroundColor: colors.buttonBg,
    height: 15,
    borderRadius: 10,
    marginTop: 10,
    position: 'relative',
  },
  progressCompleted: {
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    color: colors.textGray,
    fontFamily: 'AvenirNext-Regular',
    fontSize: 13,
  },
});
