import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from 'react-redux';

import NoInternetIcon from '../../assets/SVGS/NoInternetIcon';
import { useNavigation } from '@react-navigation/native';
import LoaderComponents from '../../components/UI/Loadings/LoaderComponents';

const NoInternetScreen = () => {
  const dispatch = useDispatch()
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation()

  const handleRetry = () => {
    setLoading(true);
    setTimeout(() => {
      NetInfo.fetch().then((state) => {
        setIsConnected(state.isConnected);
        // dispatch(InternetAction(state.isConnected))
        setLoading(false);
      });
    }, 2000);
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <LoaderComponents
        visible={isLoading}
      />
      <NoInternetIcon />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={[styles.subtitle, { paddingHorizontal: 10 }]}>
        Oops! It looks like you're offline. Please check your internet connection and try again.
      </Text>
      <TouchableOpacity style={styles.button}
        onPress={() => { handleRetry() }}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>


      <TouchableOpacity style={[styles.button, { marginTop: 20 }]}
        onPress={() => { navigation.navigate("Downloads") }}
      >
        <Text style={styles.buttonText}>Go to Downloads</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NoInternetScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#283E71",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});