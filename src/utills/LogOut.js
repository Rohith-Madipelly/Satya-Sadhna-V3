
import { setToken } from "../redux/actions/AuthActions"
import AsyncStorage from "@react-native-async-storage/async-storage"



export const logoutFunctions = async (dispatch) => {
        try {
          // ASO.RemoveAsyncValue('Token', (error, success) => {
          //   if (error) {
          //     console.error('Error removing token:', error);
          //   } else {
          //     console.log('Token removed successfully:', success);
          //     dispatch(setToken(null));
          //     // You can add additional logic here after the token has been successfully removed
          //   }
          // });

          await AsyncStorage.clear();
          dispatch(setToken(null));
        } catch (e) {
          console.log("error", e);
        }
}

//   import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from 'react-native';
// import { setToken } from "../redux/actions/loginAction";
// import { setAccountPage } from '../redux/actions/AccountSetUpAction';

// export const LogOutHandle = async (dispatch) => {
//   Alert.alert(
//     "Confirm Logout",
//     "Are you sure you want to log out?",
//     [
//       {
//         text: "Cancel",
//         style: "cancel"
//       },
//       {
//         text: "OK",
//         onPress: async () => {
//           try {
//             await AsyncStorage.removeItem('BuyKeys$:' + 'Token');
//             dispatch(setToken(null));
//             try {
//               await AsyncStorage.removeItem('BuyKeys$:' + 'pageNumber');
//               dispatch(setAccountPage(null));
//             } catch (e) {
//               console.log("error in pageNumber Remover", e);
//             }
//           } catch (e) {
//             console.log("error", e);
//           }
//         }
//       }
//     ],
//     { cancelable: false }
//   );
// }
