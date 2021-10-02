
import React from "react";
import {
    View,
    Text,
} from "react-native";
import commonScreenStyles from "../styles/commonScreen.style";

const HomeScreen = () => {
    return (
        <View style={commonScreenStyles.container}>
            <Text style={commonScreenStyles.mainText}>{'Home Screen'}</Text>
        </View>
    );
};

export default HomeScreen;
