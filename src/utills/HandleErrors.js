import { Alert, BackHandler, StyleSheet } from 'react-native'
import { logoutFunctions } from './LogOut';
// import { ServerTokenError_Logout } from './LogOut'

const HandleErrors = (error, navigation, dispatch,) => {
  const goBackMethod = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate("BottomTabScreen", { screen: "Home" });
    }
    // BackHandler.exitApp()
  }
  if (error.response) {
    if (error.response.status >= 400 && error.response.status < 500) {
      console.log("error.response.status >", error.response.status, "kkkk", error.response.data?.error)
      if (error.response.data?.error == "UnAuthenticated") {
        // ServerTokenError_Logout(undefined, undefined, dispatch)
        logoutFunctions(dispatch)
      }
      else if (error.response.status == 413) {
        Alert.alert("", "Request Entity Too Large");
      }
      else {
        Alert.alert("Request Error", "There was a problem with your request. Please check and try again.");
        console.log("HandleErrors Message", error.response.status)
      }

    }
    else if (error.response.status >= 500) {
      if (error.response.status == 500) {
        Alert.alert("Server error", "Something went wrong. Please try again later. [500]", [
          {
            text: "Logout", onPress: () => { ServerTokenError_Logout(undefined, undefined, dispatch) }
          },
          {
            text: "Ok", onPress: () => { goBackMethod() }
          }
        ]);

      } else if (error.response.status == 503) {
        Alert.alert("Server error", `Something went wrong. Please try again later. [${error?.response?.status}]`);
        console.log(error.response.data.error)
      }
      else {
        Alert.alert("Server error", `Something went wrong. Please try again later. [${error.response.status}]`);
      }
    }
    else {
      console.log("An error occurred response.>>", error?.message)
    }
  }
  else if (error.code === 'ECONNABORTED') {
    console.log('Request timed out. Please try again later.');
    Alert.alert("", 'Request timed out. Please try again later.')
  }
  else if (error.request) {
    console.log("No Response Received From the Server.", error.request);
    if (error.request.status === 0 && error.request._response.includes('Unable to parse TLS packet header')) {
      Alert.alert("Server Unreachable", "Please try again later.");
    }
    else if (
      error.request.status === 0 
      &&
      error.request.responseText.includes("Unable to resolve host")
    ) {
      Alert.alert(
        // "DNS Error",
        undefined,
        "Unable to reach the server. Please check your network or try again later."
      );
    }

    else if (error.request.status === 0) {
      Alert.alert("No Network Found", "Please check your internet connection.");
    }
  }
  else {
    Alert.alert("Error in Setting up the Request.")
  }
}

export default HandleErrors

const styles = StyleSheet.create({})


//   Alert.alert(
//   "Subscription Expired",
//   "Your subscription has expired. Please renew to continue using the app.",
//   [
//     { text: "Subscribe", onPress: () => navigation.navigate('Subscribe') },
//     { text: "Exit", onPress: () => BackHandler.exitApp() }
//   ]
// );
