import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {IoniconsIcon} from '../components/Icon';
import PrefixCard from '../components/PrefixCard';
import NumberFormat from 'react-number-format';
import colors from '../styles/colors';
import commonUtils from '../utils/commonUtils';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserInfo} from '../store/actions/userActions';
import {UserModal} from '../store/services/userModel';

const HEADER_HEIGHT = 200;

const limitOptions = [5000, 10000, 20000];

const SpendingLimitScreen = (props: any) => {
  const user = useSelector((state: any) => state.user.userData);
  const [limit, setLimit] = useState('');
  const [isValid, setValid] = useState(true);

  const dispatch = useDispatch();

  const updateUserAct = (data: UserModal) => dispatch(updateUserInfo(data));

  const goBack = () => {
    props.navigation.goBack();
  };
  const onSave = () => {
    if (!limit) {
      setValid(false);
    } else {
      setValid(true);
      const data = {
        ...user,
        weeklySpendingLimit: limit.toString().replace(/,/g, ''),
        weeklySpendingLimitOn: true,
      };
      updateUserAct(data);
      goBack();
    }
  };

  const onSpendingLimitChange = (value: any) => {
    setLimit(value);
    setValid(parseInt(value) >= 0);
  };

  useEffect(() => {
    setLimit(user.weeklySpendingLimit);
  }, [user]);

  return (
    <View style={styles.container}>
      <HeaderContainer goBack={goBack} />
      <BodyContainer
        onSpendingLimitChange={onSpendingLimitChange}
        onSave={onSave}
        limit={limit}
        options={limitOptions}
        isValid={isValid}
      />
    </View>
  );
};

export interface HeaderContainerProps {
  goBack: () => void;
}

const HeaderContainer = ({goBack}: HeaderContainerProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.headerActions}>
          <IoniconsIcon
            onPress={goBack}
            name="ios-chevron-back"
            size={28}
            color={colors.iconWhite}
          />
          <Image source={require('../assets/images/logo.png')} />
        </View>
        <View style={styles.headerMainText}>
          <Text style={styles.headerMainText}>{'Spending limit'}</Text>
        </View>
      </View>
    </View>
  );
};

export interface BodyContainerProps {
  options: number[];
  limit: string;
  isValid: boolean;
  onSpendingLimitChange: (value: any) => void;
  onSave: () => void;
}

const BodyContainer = (props: BodyContainerProps) => {
  const {options, limit, isValid, onSpendingLimitChange, onSave} = props;
  return (
    <View style={styles.bodyContainer}>
      <View>
        <View style={styles.flexRowCenter}>
          <Image source={require('../assets/images/speed.png')} />
          <Text style={styles.bodyLabel}>
            {'Set a weekly debit card spending limit'}
          </Text>
        </View>
        <View style={[styles.bodyInputContainer, styles.flexRowCenter]}>
          <PrefixCard />
          <NumberFormat
            value={limit}
            displayType={'text'}
            thousandSeparator={true}
            renderText={value => (
              <TextInput
                style={styles.limitInput}
                onChangeText={onSpendingLimitChange}
                value={value}
                keyboardType="numeric"
                autoFocus
              />
            )}
          />
        </View>
        <Text style={styles.bodyInputNote}>
          {'Here weekly means the last 7 days - not the calendar week'}
        </Text>
        <View style={[styles.limitOption, styles.flexRowCenter]}>
          {options.map((opt: number) => (
            <LimitSuggestion
              key={opt}
              value={opt}
              onSelect={onSpendingLimitChange}
            />
          ))}
        </View>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={onSave}
          style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}>
          <Text style={styles.saveButtonText}>{'Save'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export interface LimitSuggestionProps {
  value: any;
  onSelect: (value: any) => void;
}

const LimitSuggestion = (props: LimitSuggestionProps) => {
  const {value, onSelect} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(value);
      }}
      style={styles.limitOptionItem}>
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        renderText={val => (
          <Text style={styles.limitOptionItemValue}>S$ {val}</Text>
        )}
      />
    </TouchableOpacity>
  );
};

export default SpendingLimitScreen;

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
    paddingTop: commonUtils.statusBarHeight,
  },
  headerActions: {
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
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.defaultBackground,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  bodyLabel: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 14,
    color: colors.textBlack,
    paddingLeft: 10,
  },
  bodyInputContainer: {
    marginTop: 10,
    paddingVertical: 10,
    borderBottomColor: colors.defaultBorder,
    borderBottomWidth: 0.5,
  },
  limitInput: {
    paddingLeft: 10,
    width: '90%',
    height: '100%',
  },
  bodyInputNote: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 13,
    color: colors.textGray,
    marginTop: 10,
  },
  limitOption: {
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  limitOptionItem: {
    width: commonUtils.deviceDimension.width / 3 - 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    paddingVertical: 10,
    borderRadius: 4,
  },
  limitOptionItemValue: {
    color: colors.secondary,
    fontSize: 12,
  },
  actionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colors.secondary,
    width: '90%',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 30,
  },
  saveButtonDisabled: {
    backgroundColor: colors.defaultGray,
  },
  saveButtonText: {
    color: colors.textPrimary,
    fontFamily: 'AvenirNext-Bold',
  },
});
