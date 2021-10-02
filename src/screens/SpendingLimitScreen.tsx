
import React from "react";
import {
    View,
    Text,
} from "react-native";
import commonScreenStyles from "../styles/commonScreen.style";

const SpendingLimitScreen = () => {
    return (
        <View style={commonScreenStyles.container}>
            <Text style={commonScreenStyles.mainText}>{'SpendingLimit Screen'}</Text>
        </View>
    );
};

export default SpendingLimitScreen;
