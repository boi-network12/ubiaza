import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function BalanceCard({ theme }) {
  return (
    <View style={styles.container }>
        <LinearGradient 
            colors={['#2569C9FF', '#0FD0FCFF']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card]}>
            <View style={styles.topText}>
                <Text style={styles.topTextHeader}>your account balance</Text>
                <TouchableOpacity style={styles.eyeSplash}>
                    <Ionicons name="eye-off-outline" size={hp(2)} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomText}>
                <Text style={styles.balanceText}> ₦0.00</Text>
                <Text style={styles.subText}>Available &#8226; account: 2218620823</Text>
            </View>
        </LinearGradient>
        <View style={styles.btnDisplay}>
            <TouchableOpacity style={[styles.btn, { borderColor: theme.border }]}>
                <Entypo name="paper-plane" size={hp(2.2)} color={theme.subText} />
                <Text style={[styles.btnText, { color: theme.subText }]}>send money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { borderColor: theme.border }]}>
                <AntDesign name="plus" size={hp(2.2)} color={theme.subText} />
                <Text style={[styles.btnText, { color: theme.subText }]}>add money</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    card: {
        width: "100%",
        borderRadius: hp(1.5),
        padding: hp(2.5),
        marginBottom: hp(2.1)
    },
    topText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: hp(2)
    },
    topTextHeader: {
        textTransform: "capitalize",
        color: "#fff",
        fontSize: hp(2)
    },
    eyeSplash: {
        width: hp(3.5),
        height: hp(3.5),
        borderRadius: hp(0.5),
        backgroundColor: "#85E9FFFF",
        alignItems: "center",
        justifyContent:'center'
    },
    bottomText: {
        marginTop: hp(2)
    },
    balanceText: {
        fontSize: hp(3.5),
        fontWeight: "700",
        color:  "#fff"
    },
    subText: {
        fontSize: hp(1.5),
        fontWeight: "300",
        color:  "#fff",
        textTransform: "capitalize",
    },
    btnDisplay: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "48%",
        borderWidth: hp(0.1),
        borderRadius: hp(1.5),
        gap: hp(1.5),
        paddingVertical: hp(1.5)
    },
    btnText: {
        fontSize: hp(1.8),
        fontWeight: "300",
        color:  "#fff",
        textTransform: "capitalize",
    }
})