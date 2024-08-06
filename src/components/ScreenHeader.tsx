import { Text, View, StyleSheet } from "react-native";
import theme from "../theme";
import Center from "./Center";

type Props = {
    title: string;
}

const ScreenHeader = ({title}: Props) => {
    return (
        <View style={styles.styleScreen}>
            <Text style={styles.styleText}>
                {title}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    styleScreen: {
        backgroundColor: theme.colors.gray600,
        paddingBottom: 28,
    },
    styleText: {
        color: theme.colors.white,
        fontSize: theme.fontSizes.lg,
        fontFamily: theme.fonts.regular.body,
        textAlign: "center",
        paddingTop: 30
        
    }
});


export default ScreenHeader;