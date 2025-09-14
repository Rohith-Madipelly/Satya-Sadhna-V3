import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../../components/UI/CustomStatusBar/CustomStatusBar';
import Metrics from '../../../utills/ResposivesUtils/Metrics';
import CustomButton1 from '../../../components/UI/CustomButtons/CustomButton1';
import { PRIMARY_COLOR } from '../../../components/UIConfig/AppContants';

const CourseRegistration1 = () => {

  const navigation = useNavigation()



  const [isSelectedCategory, setIsSelectedCategory] = useState("")
  const categoryData_0 = [
    // { title: 'Select Category', value: 'N/A' },
    { title: 'For New Students', value: 'For New Students' },
    { title: 'For old students', value: 'For Old Students' },
    { title: 'For Children/Teens', value: 'For Children/Teens' },
    { title: 'For Executives', value: 'For Executives' },
  ];


  const [selectSubCategory, setSelectSubCategory] = useState("")
  const subCategoryData = [
    { title: 'Attend', value: 'Attend' },
    { title: 'Serve', value: 'Serve' },
  ];


  useEffect(() => {
    navigation.setOptions({ title: 'Registration for course' });
  }, [navigation]);

  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={{ paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[{ color: '#64748B', fontSize: Metrics.rfv(20), }]}>Select category</Text>
        <TouchableOpacity onPress={() => { setIsSelectedCategory("") }} style={{ justifyContent: 'flex-end' }}>
          <Text style={[{ color: '#64748B', fontSize: Metrics.rfv(16), }]}>Clear</Text>
        </TouchableOpacity>
      </View>


      <View style={{ flex: 1 }}>
        <View>
          <FlatList
            data={categoryData_0}
            keyExtractor={(item, index) => index.toString()}

            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[styles.courseContainer, { flexDirection: 'row' }]}
                onPress={() => {
                  setIsSelectedCategory(item.title)
                }}
                key={index}
              >
                <View style={{ width: '17%', minHeight: 50, alignItems: 'center', justifyContent: 'center' }}>
                  {isSelectedCategory == item.title ? <View style={{
                    width: 30, height: 30, borderRadius: 15,

                    backgroundColor: '#030370',
                    justifyContent: 'center', alignItems: 'center'

                  }}>
                    <View style={{
                      width: 15, height: 15, borderRadius: 7.5,
                      backgroundColor: 'white',
                    }}>
                    </View>
                  </View> : <View style={{
                    width: 30, height: 30, borderRadius: 15, borderColor: '#D9D9D9',
                    borderWidth: 1.3
                  }}></View>}
                </View>

                <View style={{ width: '80%', minHeight: 50, justifyContent: 'center' }}>
                  <Text style={{ color: isSelectedCategory == item.title ? "#030370" : "#8B8BA9" }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyList}>No courses available</Text>}
          />
        </View>



        {isSelectedCategory == "For old students" && <View
          style={{ marginTop: Metrics.rfv(20) }}
        >
          <View style={{ paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[{ color: '#64748B', fontSize: Metrics.rfv(20), }]}>Select type</Text>
            <TouchableOpacity onPress={() => { setSelectSubCategory("") }} style={{ justifyContent: 'flex-end' }}>
              <Text style={[{ color: '#64748B', fontSize: Metrics.rfv(16), }]}>Clear</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={subCategoryData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[styles.courseContainer, { flexDirection: 'row' }]}
                onPress={() => {
                  setSelectSubCategory(item.title)
                }}
                key={index}
              >
                <View style={{ width: '17%', minHeight: 50, alignItems: 'center', justifyContent: 'center' }}>
                  {selectSubCategory == item.title ? <View style={{
                    width: 30, height: 30, borderRadius: 15,
                    backgroundColor: '#030370',
                    justifyContent: 'center', alignItems: 'center'
                  }}>
                    <View style={{
                      width: 15, height: 15, borderRadius: 7.5,
                      backgroundColor: 'white',
                    }}>
                    </View>

                  </View> : <View style={{
                    width: 30, height: 30, borderRadius: 15, borderColor: '#D9D9D9',
                    borderWidth: 1.3
                  }}></View>}
                </View>

                <View style={{ width: '80%', minHeight: 50, justifyContent: 'center' }}>
                  <Text style={{ color: selectSubCategory == item.title ? "#030370" : "#8B8BA9" }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>}
      </View>
      <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>

        {/* {isSelectedCategory && <CustomFormButton
          onPress={() => {
            if (isSelectedCategory == "For old students") {
              if (selectSubCategory) {
                navigation.navigate("CourseRegistration2", { category: isSelectedCategory, Type: selectSubCategory })
              }
              else {
                Alert.alert("Please the type")
              }
            } else {
              navigation.navigate("CourseRegistration2", { category: isSelectedCategory, Type: "" })
            }
          }}
        >
          Next
        </CustomFormButton>} */}



        {isSelectedCategory && <CustomButton1
          boxWidth={'70%'}
          // onPress={() => { console.log("Button PRess") }}
          onPress={() => {
            if (isSelectedCategory == "For old students") {
              if (selectSubCategory) {
                navigation.navigate("CourseRegistration2", { category: isSelectedCategory, Type: selectSubCategory })
              }
              else {
                Alert.alert(undefined, "Please the type")
              }
            } else {
              navigation.navigate("CourseRegistration2", { category: isSelectedCategory, Type: "" })
            }
          }}
          textStyling={{ color: "white" }}
          bgColor={PRIMARY_COLOR}
          style={{}}>Next</CustomButton1>}
      </View>
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
    maxHeight: Metrics.height * 0.1,
    minHeight: 50,
    // backgroundColor: 'rgba(168, 168, 255, 0.30)',
    // padding: 10,
    borderRadius: 13,
    marginVertical: 10,
    marginHorizontal: 15,
    borderColor: '#D9D9D9',
    borderWidth: 1.3
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
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

export default CourseRegistration1;
