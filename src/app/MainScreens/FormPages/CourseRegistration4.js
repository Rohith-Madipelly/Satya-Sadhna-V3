import { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,

  ScrollView,
  StyleSheet,
  Text,

  TouchableOpacity,
  View,
} from 'react-native';
import { ImageBackground } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import CustomStatusBar from '../../../components/UI/CustomStatusBar/CustomStatusBar';
import Metrics from '../../../utills/ResposivesUtils/Metrics';


const CourseRegistration4 = ({ route }) => {
  const { params } = route;
  const category = params?.category || 'nan';
  const Type = params?.Type || 'nan';
  const Courses = params?.Courses || 'nan'
  const selectedCourseData = params?.selectedCourseData || 'nan'
  console.log("category Type  CourseRegistration3>", category, Type, Courses, "selectedCourseData", selectedCourseData)


  const navigation = useNavigation()



  useEffect(() => {
    // Updated Header here
    navigation.setOptions({ title: 'Registration Successful' });
  }, [navigation]);




  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />


      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ height: Metrics.height, flex: 1 }}>

          <Text style={[styles.bold, { color: 'rgba(3, 3, 112, 1)', paddingHorizontal: 15, marginTop: 40, textAlign: 'center', fontSize: 20 }]}>Registration Successful</Text>
          <Text style={[styles.bold, { color: 'rgba(3, 3, 112, 1)', paddingHorizontal: 15, marginTop: 40 }]}>Registered Course Details</Text>
          <View
            style={[styles.courseContainer, { borderWidth: 1, borderColor: 'rgba(3, 3, 112, 1)', }]}
          >
            <ImageBackground
              style={styles.imageBackground}
              source={require('../../../assets/Image/Home/Vector2.png')}
            >
              <Text style={styles.courseName}>
                <Text style={styles.bold}>Course name: </Text>
                {selectedCourseData.courseName}
              </Text>
              <View style={styles.courseDetails}>
                <View>
                  <Text style={styles.bold}>From</Text>
                  <Text>{selectedCourseData.from}</Text>
                </View>
                <View>
                  <Text style={styles.bold}>Course duration</Text>
                  <Text>{selectedCourseData.courseDuration}</Text>
                </View>
                <View>
                  <Text style={styles.bold}>To</Text>
                  <Text>{selectedCourseData.to}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>


          <Text style={[styles.bold, { color: 'rgba(3, 3, 112, 1)', paddingHorizontal: 15, marginTop: 10, textAlign: 'center' }]}>
            Thank you for registering for the Satya Sadhna meditation course.
          </Text>

          <View style={{
            height: Metrics.rfv(100),
            justifyContent: 'center',
            alignItems: 'center'
          }}>

            <TouchableOpacity
              // onPress={()=>{navigation.navigate("BottomTabScreen",screen:"Home")}}
              onPress={() => navigation.navigate("BottomTabScreen", { screen: "Home" })}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={[styles.bold, { color: 'rgb(107, 107, 172)', paddingHorizontal: 15, marginTop: 10, textAlign: 'center' }]}>
                Back to home
              </Text>
              <Ionicons name="return-down-back-sharp" size={24} color="rgb(107, 107, 172)" />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>


    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  sortButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  sortButtonText: {
    fontWeight: 'bold',
  },
  courseContainer: {
    maxHeight: Metrics.height * 0.19,
    minHeight: 120,
    backgroundColor: 'rgba(168, 168, 255, 0.30)',
    padding: 10,
    borderRadius: 13,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
  },
  courseName: {
    color: 'rgba(3, 3, 112, 1)',
    fontWeight: '400',
    fontSize: Metrics.rfv(20),
  },
  bold: {
    fontWeight: '700',
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default CourseRegistration4;
