import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { IoniconsIcon } from '../components/Icon';
import PrefixCard from '../components/PrefixCard';
import NumberFormat from 'react-number-format';
import colors from '../styles/colors';
import commonUtils from '../utils/commonUtils';

const HEADER_HEIGHT = 200;

const limitOptions = [5000, 10000, 20000];

const SpendingLimitScreen = props => {
    const [limit, setLimit] = useState(0);
    const [options, setOptions] = useState(limitOptions);
    const { spendingLimit } = props;
    const goBack = () => {
        props.navigation.goBack();
    };
    const onSave = () => {
        props.navigation.goBack();
    };

    const onSpendingLimitChange = value => {
        setLimit(value);
        setOptions(getOptions(value));
    };

    const getOptions = value => {
        if (value > 10000000) {
            return [limitOptions];
        } else if (value > 1000000) {
            return [value * 10];
        } else if (value > 100000) {
            return [value * 10, value * 100];
        } else if (value > 10000) {
            return [value * 10, value * 100, value * 1000];
        } else if (value > 1000) {
            return [value * 100, value * 1000, value * 10000];
        }
        return [limitOptions];
    };

    useEffect(() => {
        setLimit(spendingLimit);
    }, [props, spendingLimit]);

    return (
        <View style={styles.container}>
            <HeaderContainer goBack={goBack} />
            <BodyContainer
                onSpendingLimitChange={onSpendingLimitChange}
                onSave={onSave}
                limit={limit}
                options={limitOptions}
            />
        </View>
    );
};

const HeaderContainer = props => {
    const { goBack } = props;
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


const BodyContainer = props => {
    const { options, limit, onSpendingLimitChange, onSave } = props;
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
                            />
                        )}
                    />
                </View>
                <Text style={styles.bodyInputNote}>
                    {'Here weekly means the last 7 days - not the calendar week'}
                </Text>
                <View style={[styles.limitOption, styles.flexRowCenter]}>
                    {options.map((opt: number) => (
                        <NumberFormat
                            key={opt}
                            value={opt}
                            displayType={'text'}
                            thousandSeparator={true}
                            renderText={value => (
                                <LimitSuggestion value={value} onSelect={onSpendingLimitChange} />
                            )}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity
                    onPress={onSave}
                    style={[styles.saveButton, styles.saveButtonDisabled]}>
                    <Text style={styles.saveButtonText}>{'Save'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const LimitSuggestion = props => {
    const { value, onSelect } = props;
    return (
        <TouchableOpacity
            onPress={() => {
                onSelect(value);
            }}
            style={styles.limitOptionItem}>
            <Text style={styles.limitOptionItemValue}>S$ {value}</Text>
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
        justifyContent: 'space-between'
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
        alignItems:'center'
    },
    saveButton:{
        backgroundColor: colors.secondary,
        width:'90%',
        alignItems:'center',
        paddingVertical:20,
        borderRadius:30
    },
    saveButtonDisabled:{
        backgroundColor: colors.defaultGray,
    },
    saveButtonText:{
        color: colors.textPrimary,
        fontFamily: 'AvenirNext-Bold',
    }
});
