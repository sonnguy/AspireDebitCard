
import React from "react";
import {
    View,
    Text,
} from "react-native";
import commonScreenStyles from "../styles/commonScreen.style";

const PaymentScreen = () => {
    return (
        <View style={commonScreenStyles.container}>
            <Text style={commonScreenStyles.mainText}>{'Payment Screen'}</Text>
        </View>
    );
};

export default PaymentScreen;
