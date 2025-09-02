import { Text, TouchableOpacity, View } from "react-native";


export const BottomTabConfig = {
  headerShown: true,
  headerBackVisible: false,
  // headerTitle: 'Hello Rohith',
  // headerTitleAlign: 'center',
  headerTitleAlign: 'start',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTintColor: '#140301CC',
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
  },
}

export const BottomTabConfigNoHeader = {
  headerShown: false,
  headerBackVisible: false, 
  // headerTitle: 'Hello Rohith',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTintColor: '#FF6757',
  headerTitleStyle: {
    fontFamily: 'Gabarito-VariableFont',
    fontSize: 20,
    fontWeight: '600',
  },
}



// Stack Bar

export const defaultHeaderOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: 'white',
    elevation: 0, // Removes shadow on Android
    shadowOpacity: 0, // Removes shadow on iOS
  },
  headerTintColor: '#140301CC',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitleVisible: false,

});


export const customHeaderOptions = ({ navigation }) => ({


  headerStyle: {
    backgroundColor: "#FF6757",
    elevation: 0, // Removes shadow on Android
    shadowOpacity: 0, // Removes shadow on iOS
  },
  headerTitleAlign: 'start',
  headerTintColor: '#140301CC',
  headerTitleStyle: {
    fontWeight: 'bold',
  },

  headerBackTitleVisible: false,
});



export const customHeaderOptions2 = ({ navigation }) => ({
  headerTitleAlign: 'left',
  headerTitle: props => (
    <View style={{ flex: 1, flexDirection: "row", padding: 10, height: '100%', }}>
      <Text>
        {props.children}
      </Text>
    </View>
  ),

  // headerLeft: props => (
  //   <TouchableOpacity onPress={() => { console.log("shgfa") }} style={{ padding: 10, height: '100%', justifyContent: 'center' }}>
  //     <BackIcons />
  //   </TouchableOpacity>
  // ),

});