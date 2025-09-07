import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Beneficiaries({ theme }) {
    const _beneficiariesDisplay = [];

  return (
    <View style={[styles.container, { backgroundColor: theme.background, borderColor: theme.border }]}>
      <View style={[styles.Header, { }]}>
        <Text style={[styles.HeaderTextH1, { color: theme.text  }]}>saved beneficiaries</Text>
        <TouchableOpacity style={[styles.BBtn, { backgroundColor: theme.primary  }]}>
            <AntDesign name="plus" size={hp(2.2)} color="#fff" />
            <Text style={[{ color: "#fff"  }]}>add</Text>
        </TouchableOpacity>
      </View>

      {_beneficiariesDisplay && _beneficiariesDisplay.length > 0 ?  
          <View></View> : 
          <Text style={[styles.beneText, { color: theme.text  }]}>No saved beneficiaries. Add one to make transfers faster</Text>
       }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(2),
        padding: hp(2),
        borderWidth: hp(0.09),
        borderRadius: hp(2)
    },
    Header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: hp(2)
    },
    HeaderTextH1: {
        fontSize: hp(1.9),
        textTransform: "capitalize",
        fontWeight: "500"
    },
    BBtn: {
        padding: hp(0.5),
        borderRadius: hp(0.5),
        paddingHorizontal: hp(1.3),
        flexDirection: "row",
        gap: hp(0.3),
        alignItems: "center",
        justifyContent: "center",
    },
    beneText: {
        fontSize: hp(1.8),
        fontWeight: "300",
        opacity: 0.7,
        textAlign: "center"
    }
})