
import React from "react";
import {
    View,
    Text,
} from "react-native";
import commonScreenStyles from "../styles/commonScreen.style";

const CreditCardScreen = () => {
    return (
        <View style={commonScreenStyles.container}>
            <Text style={commonScreenStyles.mainText}>{'Credit Card Screen'}</Text>
        </View>
    );
};

export default CreditCardScreen;
