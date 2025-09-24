import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  // ImageBackground,
  Keyboard,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';


import CustomStatusBar from '../../../components/UI/CustomStatusBar/CustomStatusBar';
import Metrics from '../../../utills/ResposivesUtils/Metrics';
import { useSelector } from 'react-redux';
import { FormDataApi, GetFormDataSumbited, GetFormReqs } from '../../../network/API_Calls';
import { ImageBackground } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';

import { FormData } from '../../../fomik/schema/FormData';

import CustomDateInput from '../../../components/UI/Inputs/CustomDateInput';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../../../components/UI/Inputs/CustomTextInput';
import CustomDropdown from '../../../components/UI/Inputs/CustomDropdown';



import { genderData, stateData, martialStatusData, languageData, courseDoneDate, inPastTwoData, inPresentTwoData, FitnessCertificateData, regularMedicineData, referenceFromData, courseDetailsData, practiseRegularlyData } from './DropDownsData'


const CourseRegistration3 = ({ route }) => {
  const { params } = route;
  const category = params?.category || 'nan';
  const Type = params?.Type || 'nan';
  const Courses = params?.Courses || 'nan'
  const selectedCourseData = params?.selectedCourseData || 'nan'
  console.log("category Type  CourseRegistration3>", category, Type, Courses, "selectedCourseData", selectedCourseData)

  const navigation = useNavigation()
  let token = useSelector((state) => state.login.token);
  const [userReviewsData, setUserReviewsData] = useState()

  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)

  useEffect(() => {
    // Updated Header here
    navigation.setOptions({ title: 'Register' });
  }, [navigation]);

  const { handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
    touched,
    errors,
    isValid,
    setValues,
    resetForm,
    submitCount
  } = useFormik({
    initialValues: {
      category: category, Courses: Courses,
      type: Type,

      firstName: "", lastName: "", gender: "", age: "", education: "", martialStatus: "", guardianName: "", language: "", mobileNumber: "", eMail: "", address: "",
      medicineName: "", medicineDose: "", regularMedicine: "", brief: "", referenceFrom: "",
      oldStuName: "", firstCoursePlace: "", dateFirstCourse: "", dateLastCourse: "", firstAsstTeacher: "", lastCoursePlace: "", lastAsstTeacher: "", courseDetails: "", triedAnyPractise: "", practiseRegularly: "", dailyHours: "", reason: "", changeInYourSelf: "",
      personName: "", personRelation: "", courseDone: "", relation: "", designation: "", companyName: "", companyAddress: "", inPastOne: "", inPresentOne: "", FitnessCertificate: "", inPastTwo: "", inPresentTwo: ""
    },

    onSubmit: values => {
      {
        submitHandler(values)
      }
    },

    validationSchema: FormData,

    validate: values => {
      const errors = {};
      return errors;
    },

  });

  const borderColorInput = "#ccc"
  const borderColorErrorInput = "red"

  const scrollViewRef = useRef(null);
  const inputRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    gender: useRef(null),
    age: useRef(null),
    education: useRef(null),
    state: useRef(null),
    otherState: useRef(null),

    address: useRef(null),
    guardianName: useRef(null),
    martialStatus: useRef(null),
    language: useRef(null),
    mobileNumber: useRef(null),
    eMail: useRef(null),

    //Done

    personName: useRef(null),
    personRelation: useRef(null),
    courseDone: useRef(null),
    relation: useRef(null),

    designation: useRef(null),

    companyName: useRef(null),
    companyAddress: useRef(null),

    inPastOne: useRef(null),
    inPresentOne: useRef(null),

    inPastTwo: useRef(null),
    inPresentTwo: useRef(null),

    //Done 2

    FitnessCertificate: useRef(null),
    medicineName: useRef(null),
    medicineDose: useRef(null),
    regularMedicine: useRef(null),
    referenceFrom: useRef(null),
    brief: useRef(null),
    oldStuName: useRef(null),
    firstCoursePlace: useRef(null),
    firstAsstTeacher: useRef(null),

    dateFirstCourse: useRef(null),//
    dateLastCourse: useRef(null),//

    lastCoursePlace: useRef(null),
    lastAsstTeacher: useRef(null),
    courseDetails: useRef(null),
    triedAnyPractise: useRef(null),
    practiseRegularly: useRef(null),

    dailyHours: useRef(null),
    reason: useRef(null),




    changeInYourSelf: useRef(null),
  };

  // Scroll to first field with a Yup error after submit
  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      // scrollToFirstError(errors);
    }
  }, [isSubmitting]);
  // }, [submitCount, errors]);

  const scrollToFirstError = (errors) => {
    const errorField = Object.keys(errors)[0];
    const ref = inputRefs[errorField];

    if (ref && ref.current) {
      if (errorField == "stay_option") {
        ref.current?.openDropdown();
      } else {
        // ref.current.focus(); // Or scroll to position if needed


        // Measure position of the input relative to the ScrollView
        ref.current.measureLayout(
          scrollViewRef.current,
          (x, y) => {
            scrollViewRef.current.scrollTo({
              y: y - 50, // Scroll to 10px above the input
              animated: true,
            });
            ref.current.focus();
          },
          (error) => {
            console.warn("Measure failed", error);
          }
        );
      }
    }
  };






  // Previews Data of user 
  const GetFormData = async () => {
    const res = await GetFormDataSumbited(token)
    try {
      if (res) {
        setUserReviewsData(res.data.userExists)
      }
      else {
      }
    }
    catch (error) {
      setSpinnerbool(false)
    }
    finally {
      setSpinnerbool(false)
    }
  }




  // useEffect(() => {
  //   GetFormData()
  // }, [])
  // const onRefresh = useCallback(() => {
  //   GetFormData()
  // }, []);





  const [TodaysDate, setTodaysDate] = useState("")
  useEffect(() => {
    const date = new Date();

    const formattedDate = date.toISOString().split('T')[0];

    console.log(formattedDate); // Output: 2025-02-01
    setTodaysDate(formattedDate)

  }, [])

  const dateInputRef = useRef(null);


  const submitHandler = async (user) => {
    console.log("Hello out formik")
    seterrorFormAPI()
    try {

      const { category, type, state, otherState, firstName, lastName, gender, age, education, martialStatus, guardianName, language, mobileNumber, eMail, address, medicineName, medicineDose, regularMedicine, brief, referenceFrom,
        oldStuName, firstCoursePlace, dateFirstCourse, dateLastCourse, firstAsstTeacher, lastCoursePlace, lastAsstTeacher, courseDetails, triedAnyPractise, practiseRegularly, dailyHours, reason, changeInYourSelf,
        personName, personRelation, courseDone, FitnessCertificate, relation, designation, companyName, companyAddress, inPastOne, inPresentOne, inPastTwo, inPresentTwo } = user;

      const oldStudent = {
        oldStuName,
        dateFirstCourse,
        firstCoursePlace,
        firstAsstTeacher,
        dateLastCourse,
        lastCoursePlace,
        lastAsstTeacher,
        courseDetails,
        triedAnyPractise,
        practiseRegularly,
        dailyHours,
        reason,
        changeInYourSelf,
      }

      const knownPerson = {
        personName,
        personRelation
      }
      const familyPerson = {
        courseDone,
        relation: `${courseDone === 'yes' ? relation : ""}`
      }
      const professionalDetails = {
        designation,
        companyName,
        companyAddress
      }
      const physicalAilment = {
        inPastOne,
        inPresentOne
      }
      const psyschologicalAilment = {
        inPastTwo,
        inPresentTwo
      }

      const docFitnessCertificate = {
        medicineName: `${FitnessCertificate === 'Yes' ? medicineName : "N/A"}`,
        medicineDose: `${FitnessCertificate === 'Yes' ? medicineDose : "N/A"}`,
        // regularMedicine: regularMedicine, //Not reguired
      }

      const courseId = `${selectedCourseData._id}`
      const courseName = `${selectedCourseData.courseName}`
      const courseDuration = `${selectedCourseData.courseDuration}`

      const coursefrom = `${selectedCourseData.from}`
      const courseto = `${selectedCourseData.to}`

      var DataPage = {
        courseId: courseId,
        category: category,
        type: type || "",
        from: coursefrom,
        to: courseto,
        courseName: courseName,
        courseDuration: courseDuration,
        language: language,
        motherTongue: language,
        state: `${otherState ? otherState : state}`,
        date: TodaysDate,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age,
        education: education,
        address: address,
        guardianName: guardianName,
        martialStatus: martialStatus,
        mobileNumber: mobileNumber,
        eMail: eMail,

        knownPerson,

        familyPerson,

        professionalDetails,

        physicalAilment,

        psyschologicalAilment,

        docFitnessCertificate,

        regularMedicine: regularMedicine,
        referenceFrom, referenceFrom,

        brief: brief,

        oldStudent

      }

      const res = await FormDataApi(DataPage, token)
      if (res) {
        const Message = res.data.message
        navigation.navigate("CourseRegistration4", { selectedCourseData: selectedCourseData || "", category: category || "" })
      }

    } catch (error) {
      console.log("fs<><><<><><<>", error.response.data.message)
      if (error.response) {
        Alert.alert("", `${error.response.data.message}`)
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 404) {
          seterrorFormAPI({ eMailForm: `${error.response.data.message}` })
        }

        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else {
          console.log("An error occurred response.", error.response.status)
        }
      }
      else if (error.request) {
        console.log("No Response Received From the Server.")
      }
      else {
        console.log("Error in Setting up the Request.")
      }


      if (error) {
        console.log(error)
      }
    }
    finally {
      setTimeout(() => {
        setSpinnerbool(false)
      }, 50);
    }
  }

  // const ErrorChecker = () => {
  //   if (Object.values(errors).length === 0) {
  //     handleSubmit();
  //   } else {
  //     console.log(Object.values(errors).join(', '))
  //     alert("Please fill in the mandatory fields");
  //   }
  // };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />
      <ScrollView
        //  style={{ height: Metrics.height }}
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20,
        }}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            contentContainerStyle={{ flex: 1, }}
          >

            <Text style={[styles.bold, { color: 'rgba(3, 3, 112, 1)', paddingHorizontal: 15, marginTop: 10 }]}>Selected Course Details</Text>
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
                    <Text style={{color:'black'}}>{selectedCourseData.from}</Text>
                  </View>
                  <View>
                    <Text style={styles.bold}>Course duration</Text>
                    <Text style={{color:'black'}}>{selectedCourseData.courseDuration}</Text>
                  </View>
                  <View>
                    <Text style={styles.bold}>To</Text>
                    <Text style={{color:'black'}}>{selectedCourseData.to}</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>


            <Text style={[styles.bold, { color: 'rgba(3, 3, 112, 1)', paddingHorizontal: 15, marginTop: 10 }]}>
              Enter your details to complete the registration.
            </Text>

            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>




              <CustomTextInput
                boxWidth={'85%'}
                label={'First name'}
                bgColor={'white'}
                inputRef={inputRefs.firstName}
                asterisksymbol={true}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                placeholder={'Enter your first name'}
                placeholderTextColor={'#4C5664'}
                name='firstName'
                value={values.firstName}
                onChangeText={(e) => {
                  handleChange("firstName")(e);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("firstName")}
                validate={handleBlur("firstName")}
                outlined
                borderColor={`${(errors.firstName && touched.firstName) || (errorFormAPI && errorFormAPI.firstNameForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.firstName && touched.firstName) ? `${errors.firstName}` : (errorFormAPI && errorFormAPI.firstNameForm) ? `${errorFormAPI.firstNameForm}` : ``}`}
              />


              <CustomTextInput
                boxWidth={'85%'}
                label={'Last name'}
                bgColor={'white'}
                asterisksymbol={true}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                inputRef={inputRefs.lastName}
                placeholder={'Enter your last name'}
                placeholderTextColor={'#4C5664'}
                name='lastName'
                value={values.lastName}
                onChangeText={(e) => {
                  handleChange("lastName")(e);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("lastName")}
                validate={handleBlur("lastName")}
                outlined
                borderColor={`${(errors.lastName && touched.lastName) || (errorFormAPI && errorFormAPI.lastNameForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.lastName && touched.lastName) ? `${errors.lastName}` : (errorFormAPI && errorFormAPI.lastNameForm) ? `${errorFormAPI.lastNameForm}` : ``}`}
              />

              <CustomDropdown
                boxWidth={'85%'}
                label={"Gender"}
                asterisksymbol={true}
                placeholder={'Select the gender'}
                name='gender'
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                bgColor={'transparent'}
                value={values.gender}
                inputRef={inputRefs.gender}
                DropDownData={genderData}
                onChange={(e, b, c) => {
                  handleChange("gender")(e.name)
                  seterrorFormAPI();
                }}
                containerStyle={{ elevation: 10, marginTop: 30 }}
                onBlur={handleBlur("gender")}
                validate={handleBlur("gender")}
                outlined
                dropdownHeight={genderData.length <= 4 ? (genderData.length * 50) : 210}
                borderColor={`${(errors.gender && touched.gender) || (errorFormAPI && errorFormAPI.genderForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.gender && touched.gender) ? `${errors.gender}` : (errorFormAPI && errorFormAPI.genderForm) ? `${errorFormAPI.genderForm}` : ``}`}
                DropDownArrowColor="#4C5664"
              />


              <CustomTextInput
                boxWidth={'85%'}
                label={'Age'}
                bgColor={'white'}
                asterisksymbol={true}
                inputRef={inputRefs.age}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                maxLength={2}
                placeholder={'Enter your age'}
                placeholderTextColor={'#4C5664'}
                name='age'
                value={values.age}
                onChangeText={(e) => {
                  // handleChange("age")(e);
                  const numericValue = e.replace(/[^0-9]/g, "")
                  handleChange("age")(numericValue)
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("age")}
                validate={handleBlur("age")}
                keyboardType="numeric"
                outlined
                borderColor={`${(errors.age && touched.age) || (errorFormAPI && errorFormAPI.ageForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.age && touched.age) ? `${errors.age}` : (errorFormAPI && errorFormAPI.ageForm) ? `${errorFormAPI.ageForm}` : ``}`}

              />

              <CustomTextInput
                boxWidth={'85%'}
                label={'Education'}
                bgColor={'white'}
                inputRef={inputRefs.education}
                asterisksymbol={true}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                placeholder={'Enter your education'}
                placeholderTextColor={'#4C5664'}
                name='education'
                value={values.education}
                onChangeText={(e) => {
                  handleChange("education")(e);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("education")}
                validate={handleBlur("education")}
                outlined
                borderColor={`${(errors.education && touched.education) || (errorFormAPI && errorFormAPI.educationForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.education && touched.education) ? `${errors.education}` : (errorFormAPI && errorFormAPI.educationForm) ? `${errorFormAPI.educationForm}` : ``}`}
              />

              <CustomDropdown
                boxWidth={'85%'}
                label={'City'}
                placeholder={'Select the city'}
                asterisksymbol={true}
                name='state'
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                bgColor={'transparent'}
                value={values.state}
                DropDownData={stateData}
                inputRef={inputRefs.state}
                onChange={(e, b, c) => {
                  console.log("state", e.name)
                  handleChange("state")(e.name)
                  seterrorFormAPI();
                }}
                containerStyle={{ elevation: 10, marginTop: 30 }}
                onBlur={handleBlur("state")}
                validate={handleBlur("state")}
                outlined
                dropdownHeight={stateData.length <= 4 ? (stateData.length * 50) : 210}
                borderColor={`${(errors.state) || (errorFormAPI && errorFormAPI.stateForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.state) ? `${errors.state}` : (errorFormAPI && errorFormAPI.stateForm) ? `${errorFormAPI.stateForm}` : ``}`}
                DropDownArrowColor="#4C5664"
              />




              {values.state === 'Other' && (<CustomTextInput
                boxWidth={'85%'}
                label={'Other city'}
                bgColor={'white'}
                asterisksymbol={true}
                inputRef={inputRefs.otherState}
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                placeholder={'Enter your city'}
                placeholderTextColor={'#4C5664'}
                name='otherState'
                value={values.otherState}
                onChangeText={(e) => {
                  handleChange("otherState")(e);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("otherState")}
                validate={handleBlur("otherState")}
                outlined
                borderColor={`${(errors.otherState && touched.otherState) || (errorFormAPI && errorFormAPI.otherStateForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.otherState && touched.otherState) ? `${errors.otherState}` : (errorFormAPI && errorFormAPI.otherStateForm) ? `${errorFormAPI.otherStateForm}` : ``}`}
              />)}




              <CustomTextInput
                boxWidth={'85%'}
                label={'Address'}
                bgColor={'white'}
                asterisksymbol={true}
                inputRef={inputRefs.address}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                placeholder={'Enter your address'}
                placeholderTextColor={'#4C5664'}
                name='address'
                value={values.address}
                onChangeText={(e) => {
                  handleChange("address")(e);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("address")}
                validate={handleBlur("address")}
                outlined
                borderColor={`${(errors.address && touched.address) || (errorFormAPI && errorFormAPI.addressForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.address && touched.address) ? `${errors.address}` : (errorFormAPI && errorFormAPI.addressForm) ? `${errorFormAPI.addressForm}` : ``}`}
              />




              <CustomTextInput
                boxWidth={'85%'}
                label={'Father or spouse name'}
                bgColor={'white'}
                asterisksymbol={true}
                inputRef={inputRefs.guardianName}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                placeholder={'Enter your father or spouse name'}
                placeholderTextColor={'#4C5664'}
                name='guardianName'
                value={values.guardianName}
                onChangeText={(e) => {
                  handleChange("guardianName")(e);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("guardianName")}
                validate={handleBlur("guardianName")}
                outlined
                borderColor={`${(errors.guardianName && touched.guardianName) || (errorFormAPI && errorFormAPI.guardianNameForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.guardianName && touched.guardianName) ? `${errors.guardianName}` : (errorFormAPI && errorFormAPI.guardianNameForm) ? `${errorFormAPI.guardianNameForm}` : ``}`}
              />


              <CustomDropdown
                boxWidth={'85%'}
                label={'Marital status'}
                placeholder={'Select the Martial status'}
                name='martialStatus'
                asterisksymbol
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                bgColor={'transparent'}
                inputRef={inputRefs.martialStatus}
                value={values.martialStatus}
                DropDownData={martialStatusData}
                onChange={(e, b, c) => {
                  handleChange("martialStatus")(e.name)
                  seterrorFormAPI();
                }}
                containerStyle={{ elevation: 10, marginTop: 30 }}
                onBlur={handleBlur("martialStatus")}
                validate={handleBlur("martialStatus")}
                outlined
                dropdownHeight={martialStatusData.length <= 4 ? (martialStatusData.length * 50) : 210}
                borderColor={`${(errors.martialStatus && touched.martialStatus) || (errorFormAPI && errorFormAPI.martialStatusForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.martialStatus && touched.martialStatus) ? `${errors.martialStatus}` : (errorFormAPI && errorFormAPI.martialStatusForm) ? `${errorFormAPI.martialStatusForm}` : ``}`}
                DropDownArrowColor="#4C5664"
              />

              <CustomDropdown
                boxWidth={'85%'}
                label={'Language'}
                asterisksymbol
                inputRef={inputRefs.language}
                placeholder={'Select the language'}
                name='language'
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                bgColor={'transparent'}
                value={values.language}
                DropDownData={languageData}
                onChange={(e, b, c) => {
                  handleChange("language")(e.name)
                  seterrorFormAPI();
                }}
                containerStyle={{ elevation: 10, marginTop: 30 }}
                onBlur={handleBlur("language")}
                validate={handleBlur("language")}
                outlined
                dropdownHeight={languageData.length <= 4 ? (languageData.length * 50) : 210}
                borderColor={`${(errors.language && touched.language) || (errorFormAPI && errorFormAPI.languageForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.language && touched.language) ? `${errors.language}` : (errorFormAPI && errorFormAPI.languageForm) ? `${errorFormAPI.languageForm}` : ``}`}
                DropDownArrowColor="#4C5664"
              />


              <CustomTextInput
                boxWidth={'85%'}
                label={'Mobile number'}
                bgColor={'white'}
                asterisksymbol={true}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                inputRef={inputRefs.mobileNumber}
                placeholder={'Enter your mobile number'}
                placeholderTextColor={'#4C5664'}
                name='mobileNumber'
                value={values.mobileNumber}
                onChangeText={(e) => {
                  // Ensure only digits are entered
                  const input = e.replace(/\D/g, '');
                  // Restrict to 10 digits
                  const mobileNumber = input.slice(0, 10);
                  handleChange("mobileNumber")(mobileNumber);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("mobileNumber")}
                validate={handleBlur("mobileNumber")}
                outlined
                maxLength={10}
                borderColor={`${(errors.mobileNumber && touched.mobileNumber) || (errorFormAPI && errorFormAPI.mobileNumberForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.mobileNumber && touched.mobileNumber) ? `${errors.mobileNumber}` : (errorFormAPI && errorFormAPI.mobileNumberForm) ? `${errorFormAPI.mobileNumberForm}` : ``}`}
                keyboardType="number-pad"
              />

              <CustomTextInput
                boxWidth={'85%'}
                label={'Email'}
                bgColor={'white'}
                asterisksymbol={true}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                inputRef={inputRefs.language}
                placeholder={'Enter your email'}
                placeholderTextColor={'#4C5664'}
                name='eMail'
                value={values.eMail}
                onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("eMail")(eToLowerCaseText); seterrorFormAPI(); }}
                onBlur={handleBlur("eMail")}
                validate={handleBlur("eMail")}
                outlined
                borderColor={`${(errors.eMail && touched.eMail) || (errorFormAPI && errorFormAPI.eMailForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.eMail && touched.eMail) ? `${errors.eMail}` : (errorFormAPI && errorFormAPI.eMailForm) ? `${errorFormAPI.eMailForm}` : ``}`}
              />

              {/* Mild Stone One */}

              <CustomTextInput
                boxWidth={'85%'}
                label={'Is any known person attending the course'}
                placeholder={'Is any known person attending the course'}
                name='Is any known person attending the course'
                bgColor={'white'}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                placeholderTextColor={'#4C5664'}
                value={values.personName}
                inputRef={inputRefs.personName}
                onChangeText={(e) => {
                  handleChange("personName")(e);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("personName")}
                validate={handleBlur("personName")}
                outlined
                borderColor={`${(errors.personName && touched.personName) || (errorFormAPI && errorFormAPI.personNameForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.personName && touched.personName) ? `${errors.personName}` : (errorFormAPI && errorFormAPI.personNameForm) ? `${errorFormAPI.personNameForm}` : ``}`}
              />



              <CustomTextInput
                boxWidth={'85%'}
                label={'Known person relation'}
                bgColor={'white'}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                placeholderTextColor={'#4C5664'}
                placeholder={'Known person relation'}
                name='personRelation'
                value={values.personRelation}
                inputRef={inputRefs.personRelation}
                onChangeText={(e) => {
                  handleChange("personRelation")(e);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("personRelation")}
                validate={handleBlur("personRelation")}
                outlined
                borderColor={`${(errors.personRelation && touched.personRelation) || (errorFormAPI && errorFormAPI.personRelationForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.personRelation && touched.personRelation) ? `${errors.personRelation}` : (errorFormAPI && errorFormAPI.personRelationForm) ? `${errorFormAPI.personRelationForm}` : ``}`}
              />

              <CustomDropdown
                boxWidth={'85%'}
                placeholder={'Select'}
                label={'Has anyone in the family done a course?'}
                name='Family Person course Done'
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                bgColor={'transparent'}
                value={values.courseDone}
                DropDownData={courseDoneDate}
                inputRef={inputRefs.courseDone}
                onChange={(e, b, c) => {
                  handleChange("courseDone")(e.name)
                  seterrorFormAPI();
                }}
                containerStyle={{ elevation: 10, marginTop: 30 }}
                onBlur={handleBlur("courseDone")}
                validate={handleBlur("courseDone")}
                outlined
                dropdownHeight={courseDoneDate.length <= 4 ? (courseDoneDate.length * 50) : 210}
                borderColor={`${(errors.courseDone && touched.courseDone) || (errorFormAPI && errorFormAPI.courseDoneForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.courseDone && touched.courseDone) ? `${errors.courseDone}` : (errorFormAPI && errorFormAPI.courseDoneForm) ? `${errorFormAPI.courseDoneForm}` : ``}`}
                DropDownArrowColor="#4C5664"
              />


              {values.courseDone == "Yes" && (<CustomTextInput
                boxWidth={'85%'}
                label={"Family person's relation"}
                bgColor={'white'}
                asterisksymbol={true}
                labelStyle={{ color: '#4C5664' }}
                InputStyle={{ color: '#4C5664' }}
                placeholder={"Family person's relation"}
                placeholderTextColor={'#4C5664'}
                name='relation'
                value={values.relation}
                inputRef={inputRefs.relation}
                onChangeText={(e) => {
                  handleChange("relation")(e);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("relation")}
                validate={handleBlur("relation")}
                outlined
                borderColor={`${(errors.relation && touched.relation) || (errorFormAPI && errorFormAPI.relationForm) ? borderColorErrorInput : borderColorInput}`}
                errorMessage={`${(errors.relation && touched.relation) ? `${errors.relation}` : (errorFormAPI && errorFormAPI.relationForm) ? `${errorFormAPI.relationForm}` : ``}`}
              />)}


              <Text style={{ fontWeight: 800, fontSize: 15 }}>------- Professional Details -------</Text>

              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <CustomTextInput
                  boxWidth={'85%'}
                  label={'Designation'}
                  bgColor={'white'}
                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  placeholder={'Designation'}
                  placeholderTextColor={'#4C5664'}
                  name='designation'
                  value={values.designation}
                  inputRef={inputRefs.designation}
                  onChangeText={(e) => {
                    handleChange("designation")(e);
                    seterrorFormAPI();
                  }}
                  onBlur={handleBlur("designation")}
                  validate={handleBlur("designation")}
                  outlined
                  borderColor={`${(errors.designation && touched.designation) || (errorFormAPI && errorFormAPI.designationForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.designation && touched.designation) ? `${errors.designation}` : (errorFormAPI && errorFormAPI.designationForm) ? `${errorFormAPI.designationForm}` : ``}`}
                />

                <CustomTextInput
                  boxWidth={'85%'}
                  placeholder={'Company name'}
                  label={'Company name'}
                  bgColor={'white'}
                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  placeholderTextColor={'#4C5664'}
                  name='companyName'
                  value={values.companyName}
                  inputRef={inputRefs.companyName}
                  onChangeText={(e) => {
                    handleChange("companyName")(e);
                    seterrorFormAPI();
                  }}
                  onBlur={handleBlur("companyName")}
                  validate={handleBlur("companyName")}
                  outlined
                  borderColor={`${(errors.companyName && touched.companyName) || (errorFormAPI && errorFormAPI.companyNameForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.companyName && touched.companyName) ? `${errors.companyName}` : (errorFormAPI && errorFormAPI.companyNameForm) ? `${errorFormAPI.companyNameForm}` : ``}`}
                />

                <CustomTextInput
                  boxWidth={'85%'}
                  label={'Company address'}
                  bgColor={'white'}
                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  placeholder={'Company address'}
                  placeholderTextColor={'#4C5664'}
                  inputRef={inputRefs.companyAddress}
                  name='companyAddress'
                  value={values.companyAddress}
                  onChangeText={(e) => {
                    handleChange("companyAddress")(e);
                    seterrorFormAPI();
                  }}
                  onBlur={handleBlur("companyAddress")}
                  validate={handleBlur("companyAddress")}
                  outlined
                  borderColor={`${(errors.companyAddress && touched.companyAddress) || (errorFormAPI && errorFormAPI.companyAddressForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.companyAddress && touched.companyAddress) ? `${errors.companyAddress}` : (errorFormAPI && errorFormAPI.companyAddressForm) ? `${errorFormAPI.companyAddressForm}` : ``}`}
                />
              </View>

              <Text style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>------- Any Physical Ailment? -------</Text>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <CustomTextInput
                  boxWidth={'85%'}
                  label={'In past'}
                  bgColor={'white'}
                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  placeholder={'In past'}
                  placeholderTextColor={'#4C5664'}
                  inputRef={inputRefs.inPastOne}
                  name='inPastOne'
                  value={values.inPastOne}
                  onChangeText={(e) => {
                    handleChange("inPastOne")(e);
                    seterrorFormAPI();
                  }}
                  onBlur={handleBlur("inPastOne")}
                  validate={handleBlur("inPastOne")}
                  outlined
                  borderColor={`${(errors.inPastOne && touched.inPastOne) || (errorFormAPI && errorFormAPI.inPastOneForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.inPastOne && touched.inPastOne) ? `${errors.inPastOne}` : (errorFormAPI && errorFormAPI.inPastOneForm) ? `${errorFormAPI.inPastOneForm}` : ``}`}
                />

                <CustomTextInput
                  boxWidth={'85%'}
                  label={'In present'}
                  bgColor={'white'}
                  asterisksymbol={true}
                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  placeholder={'In present'}
                  placeholderTextColor={'#4C5664'}
                  name='inPresentOne'
                  inputRef={inputRefs.inPresentOne}
                  value={values.inPresentOne}
                  onChangeText={(e) => {
                    handleChange("inPresentOne")(e);
                    seterrorFormAPI();
                  }}
                  onBlur={handleBlur("inPresentOne")}
                  validate={handleBlur("inPresentOne")}
                  outlined
                  borderColor={`${(errors.inPresentOne && touched.inPresentOne) || (errorFormAPI && errorFormAPI.inPresentOneForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.inPresentOne && touched.inPresentOne) ? `${errors.inPresentOne}` : (errorFormAPI && errorFormAPI.inPresentOneForm) ? `${errorFormAPI.inPresentOneForm}` : ``}`}
                />
              </View>


              <Text style={{ fontWeight: 800, fontSize: 15, marginTop: 5, marginBottom: 5 }}>- Any Psyschological Ailment/Addiction? -</Text>

              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <CustomDropdown
                  boxWidth={'85%'}
                  label={'In past '}
                  placeholder={'Select'}
                  name='inPastTwo'
                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  bgColor={'transparent'}
                  value={values.inPastTwo}
                  DropDownData={inPastTwoData}
                  onChange={(e, b, c) => {
                    handleChange("inPastTwo")(e.name)
                    seterrorFormAPI();
                  }}
                  containerStyle={{ elevation: 10, marginTop: 30 }}
                  onBlur={handleBlur("inPastTwo")}
                  validate={handleBlur("inPastTwo")}
                  outlined
                  dropdownHeight={inPastTwoData.length <= 4 ? (inPastTwoData.length * 50) : 210}
                  borderColor={`${(errors.inPastTwo && touched.inPastTwo) || (errorFormAPI && errorFormAPI.inPastTwoForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.inPastTwo && touched.inPastTwo) ? `${errors.inPastTwo}` : (errorFormAPI && errorFormAPI.inPastTwoForm) ? `${errorFormAPI.inPastTwoForm}` : ``}`}
                  DropDownArrowColor="#4C5664"
                />


                <CustomDropdown
                  boxWidth={'85%'}
                  label={'In present '}
                  placeholder={'Select'}
                  name='inPresentTwo'
                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  bgColor={'transparent'}
                  value={values.inPresentTwo}
                  inputRef={inputRefs.inPresentTwo}
                  DropDownData={inPresentTwoData}
                  onChange={(e, b, c) => {
                    handleChange("inPresentTwo")(e.name)
                    seterrorFormAPI();
                  }}
                  containerStyle={{ elevation: 10, marginTop: 30 }}
                  onBlur={handleBlur("inPresentTwo")}
                  validate={handleBlur("inPresentTwo")}
                  outlined
                  dropdownHeight={inPresentTwoData.length <= 4 ? (inPresentTwoData.length * 50) : 210}
                  borderColor={`${(errors.inPresentTwo && touched.inPresentTwo) || (errorFormAPI && errorFormAPI.inPresentTwoForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.inPresentTwo && touched.inPresentTwo) ? `${errors.inPresentTwo}` : (errorFormAPI && errorFormAPI.inPresentTwoForm) ? `${errorFormAPI.inPresentTwoForm}` : ``}`}
                  DropDownArrowColor="#4C5664"
                />
                {/* Mile Stone 2 */}


                {values.inPresentTwo === "Yes" || values.inPastTwo === "Yes" ? (<CustomDropdown
                  boxWidth={'85%'}
                  label={'If yes, kindly bring a fitness certificate from your doctor'}
                  placeholder={'Select'}
                  name='FitnessCertificate'

                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  bgColor={'transparent'}
                  value={values.FitnessCertificate}
                  inputRef={inputRefs.FitnessCertificate}
                  DropDownData={FitnessCertificateData}
                  onChange={(e, b, c) => {
                    handleChange("FitnessCertificate")(e.name)
                    seterrorFormAPI();
                  }}
                  containerStyle={{ elevation: 10, marginTop: 30 }}
                  onBlur={handleBlur("FitnessCertificate")}
                  validate={handleBlur("FitnessCertificate")}
                  outlined
                  dropdownHeight={FitnessCertificateData.length <= 4 ? (FitnessCertificateData.length * 50) : 210}
                  borderColor={`${(errors.FitnessCertificate && touched.FitnessCertificate) || (errorFormAPI && errorFormAPI.FitnessCertificateForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.FitnessCertificate && touched.FitnessCertificate) ? `${errors.FitnessCertificate}` : (errorFormAPI && errorFormAPI.FitnessCertificateForm) ? `${errorFormAPI.FitnessCertificateForm}` : ``}`}
                  DropDownArrowColor="#4C5664"
                />) : ""}

                {values.FitnessCertificate === "Yes" && (
                  <CustomTextInput
                    boxWidth={'85%'}
                    label={'Name of medicine'}
                    bgColor={'white'}
                    asterisksymbol={true}
                    labelStyle={{ color: '#4C5664' }}
                    InputStyle={{ color: '#4C5664' }}
                    placeholder={'Name of medicine'}
                    placeholderTextColor={'#4C5664'}
                    name='medicineName'
                    value={values.medicineName}
                    onChangeText={(e) => {
                      handleChange("medicineName")(e);
                      seterrorFormAPI();
                    }}
                    inputRef={inputRefs.medicineName}
                    // leftText={'Accomodate 10 members'}
                    onBlur={handleBlur("medicineName")}
                    validate={handleBlur("medicineName")}
                    outlined
                    borderColor={`${(errors.medicineName && touched.medicineName) || (errorFormAPI && errorFormAPI.medicineNameForm) ? borderColorErrorInput : borderColorInput}`}
                    errorMessage={`${(errors.medicineName && touched.medicineName) ? `${errors.medicineName}` : (errorFormAPI && errorFormAPI.medicineNameForm) ? `${errorFormAPI.medicineNameForm}` : ``}`}
                  />)}

                {values.FitnessCertificate === "Yes" ? (
                  <CustomTextInput
                    boxWidth={'85%'}
                    label={'Dose of medicine'}
                    placeholder={'Dose of medicine'}
                    bgColor={'white'}
                    asterisksymbol={true}
                    labelStyle={{ color: '#4C5664' }}
                    InputStyle={{ color: '#4C5664' }}
                    placeholderTextColor={'#4C5664'}
                    name='docFitnessCertificate medicine Dose'
                    value={values.medicineDose}
                    inputRef={inputRefs.medicineDose}
                    onChangeText={(e) => {
                      handleChange("medicineDose")(e);
                      seterrorFormAPI();
                    }}
                    onBlur={handleBlur("medicineDose")}
                    validate={handleBlur("medicineDose")}
                    outlined
                    borderColor={`${(errors.medicineDose && touched.medicineDose) || (errorFormAPI && errorFormAPI.medicineDoseForm) ? borderColorErrorInput : borderColorInput}`}
                    errorMessage={`${(errors.medicineDose && touched.medicineDose) ? `${errors.medicineDose}` : (errorFormAPI && errorFormAPI.medicineDoseForm) ? `${errorFormAPI.medicineDoseForm}` : ``}`}
                  />
                ) : ""}


                <CustomDropdown
                  boxWidth={'85%'}
                  label={'If taking any medicine regularly have you brought it with you?'}
                  placeholder={'Select'}
                  name='regularMedicine'
                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  bgColor={'transparent'}
                  value={values.regularMedicine}
                  inputRef={inputRefs.regularMedicine}
                  DropDownData={regularMedicineData}
                  onChange={(e, b, c) => {
                    handleChange("regularMedicine")(e.name)
                    seterrorFormAPI();
                  }}
                  // containerStyle={{  marginTop: 30 }}
                  onBlur={handleBlur("regularMedicine")}
                  validate={handleBlur("regularMedicine")}
                  outlined
                  containerStyle={{ elevation: 10, marginTop: 30 }}
                  dropdownHeight={regularMedicineData.length <= 4 ? (regularMedicineData.length * 50) : 210}
                  borderColor={`${(errors.regularMedicine && touched.regularMedicine) || (errorFormAPI && errorFormAPI.regularMedicineForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.regularMedicine && touched.regularMedicine) ? `${errors.regularMedicine}` : (errorFormAPI && errorFormAPI.regularMedicineForm) ? `${errorFormAPI.regularMedicineForm}` : ``}`}
                  DropDownArrowColor="#4C5664"
                />


                <CustomDropdown
                  boxWidth={'85%'}
                  label={'How did you learn about this course'}
                  placeholder={'Select'}
                  name='referenceFrom'
                  asterisksymbol
                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  bgColor={'transparent'}
                  value={values.referenceFrom}
                  inputRef={inputRefs.referenceFrom}
                  DropDownData={referenceFromData}
                  onChange={(e, b, c) => {
                    handleChange("referenceFrom")(e.name)
                    seterrorFormAPI();
                  }}
                  // containerStyle={{  marginTop: 30 }}
                  onBlur={handleBlur("referenceFrom")}
                  validate={handleBlur("referenceFrom")}
                  outlined
                  containerStyle={{ elevation: 10, marginTop: 30 }}
                  dropdownHeight={referenceFromData.length <= 4 ? (referenceFromData.length * 50) : 210}
                  borderColor={`${(errors.referenceFrom && touched.referenceFrom) || (errorFormAPI && errorFormAPI.referenceFromForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.referenceFrom && touched.referenceFrom) ? `${errors.referenceFrom}` : (errorFormAPI && errorFormAPI.referenceFromForm) ? `${errorFormAPI.referenceFromForm}` : ``}`}
                  DropDownArrowColor="#4C5664"
                />

                <CustomTextInput
                  boxWidth={'85%'}
                  label={'Brief personal background aim of joining the course'}
                  bgColor={'white'}
                  asterisksymbol={true}
                  labelStyle={{ color: '#4C5664' }}
                  InputStyle={{ color: '#4C5664' }}
                  placeholder={'Enter more information data'}
                  placeholderTextColor={'#4C5664'}
                  name='brief'
                  inputRef={inputRefs.brief}
                  value={values.brief}
                  onChangeText={(e) => {
                    handleChange("brief")(e);
                    seterrorFormAPI();
                  }}
                  // leftText={'Accomodate 10 members'}
                  onBlur={handleBlur("brief")}
                  validate={handleBlur("brief")}

                  outlined

                  borderColor={`${(errors.brief && touched.brief) || (errorFormAPI && errorFormAPI.briefForm) ? borderColorErrorInput : borderColorInput}`}
                  errorMessage={`${(errors.brief && touched.brief) ? `${errors.brief}` : (errorFormAPI && errorFormAPI.briefForm) ? `${errorFormAPI.briefForm}` : ``}`}
                />


                <Text style={{ fontWeight: 800, fontSize: 15, marginTop: 5, marginBottom: 5 }}>--- To be filled in only by old student ---</Text>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                  <CustomTextInput
                    boxWidth={'85%'}
                    placeholder={'Name of old student'}
                    label={'Name of old student'}
                    bgColor={'white'}
                    labelStyle={{ color: '#4C5664' }}
                    InputStyle={{ color: '#4C5664' }}
                    placeholderTextColor={'#4C5664'}
                    name='oldStuName'
                    value={values.oldStuName}
                    inputRef={inputRefs.oldStuName}
                    onChangeText={(e) => {
                      handleChange("oldStuName")(e);
                      seterrorFormAPI();
                    }}
                    // leftText={'Accomodate 10 members'}
                    onBlur={handleBlur("oldStuName")}
                    validate={handleBlur("oldStuName")}

                    outlined

                    borderColor={`${(errors.oldStuName && touched.oldStuName) || (errorFormAPI && errorFormAPI.oldStuNameForm) ? borderColorErrorInput : borderColorInput}`}
                    errorMessage={`${(errors.oldStuName && touched.oldStuName) ? `${errors.oldStuName}` : (errorFormAPI && errorFormAPI.oldStuNameForm) ? `${errorFormAPI.oldStuNameForm}` : ``}`}
                  />
                  <CustomTextInput
                    boxWidth={'85%'}
                    placeholder={'First course place'}
                    label={'First course place'}

                    bgColor={'white'}
                    labelStyle={{ color: '#4C5664' }}
                    InputStyle={{ color: '#4C5664' }}
                    placeholderTextColor={'#4C5664'}
                    name='firstCoursePlace'
                    value={values.firstCoursePlace}
                    inputRef={inputRefs.firstCoursePlace}
                    onChangeText={(e) => {
                      handleChange("firstCoursePlace")(e);
                      seterrorFormAPI();
                    }}
                    // leftText={'Accomodate 10 members'}
                    onBlur={handleBlur("firstCoursePlace")}
                    validate={handleBlur("firstCoursePlace")}

                    outlined

                    borderColor={`${(errors.firstCoursePlace && touched.firstCoursePlace) || (errorFormAPI && errorFormAPI.firstCoursePlaceForm) ? borderColorErrorInput : borderColorInput}`}
                    errorMessage={`${(errors.firstCoursePlace && touched.firstCoursePlace) ? `${errors.firstCoursePlace}` : (errorFormAPI && errorFormAPI.firstCoursePlaceForm) ? `${errorFormAPI.firstCoursePlaceForm}` : ``}`}
                  />

                  <CustomTextInput
                    boxWidth={'85%'}
                    placeholder={'First assist teacher'}
                    label={'First assist teacher'}
                    bgColor={'white'}
                    labelStyle={{ color: '#4C5664' }}
                    InputStyle={{ color: '#4C5664' }}
                    placeholderTextColor={'#4C5664'}
                    name='firstAsstTeacher'
                    value={values.firstAsstTeacher}
                    inputRef={inputRefs.firstAsstTeacher}
                    onChangeText={(e) => {
                      handleChange("firstAsstTeacher")(e);
                      seterrorFormAPI();
                    }}
                    onBlur={handleBlur("firstAsstTeacher")}
                    validate={handleBlur("firstAsstTeacher")}

                    outlined

                    borderColor={`${(errors.firstAsstTeacher && touched.firstAsstTeacher) || (errorFormAPI && errorFormAPI.firstAsstTeacherForm) ? borderColorErrorInput : borderColorInput}`}
                    errorMessage={`${(errors.firstAsstTeacher && touched.firstAsstTeacher) ? `${errors.firstAsstTeacher}` : (errorFormAPI && errorFormAPI.firstAsstTeacherForm) ? `${errorFormAPI.firstAsstTeacherForm}` : ``}`}
                  />


                  <View style={{ width: '85%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

                    <CustomDateInput
                      ref={inputRefs.dateFirstCourse}
                      boxWidth={'47%'}
                      label={'First course date'}
                      placeholder={'Select'}
                      name='First course date'
                      date='date'
                      value={values.dateFirstCourse}
                      labelStyle={{ color: '#4C5664' }}
                      InputStyle={{ color: '#4C5664' }}
                      rightIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                      onChangeDate={(e, b, c) => {
                        handleChange("dateFirstCourse")(e);
                        handleChange("dateLastCourse")("");
                        seterrorFormAPI();
                      }}
                      onBlur={handleBlur("dateFirstCourse")}
                      validate={handleBlur("dateFirstCourse")}
                      outlined
                      backgroundColor={'white'}

                      borderColor={`${(errors.dateFirstCourse && touched.dateFirstCourse) || (errorFormAPI && errorFormAPI.dateFirstCourseForm) ? borderColorErrorInput : borderColorInput}`}
                      errorMessage={`${(errors.dateFirstCourse && touched.dateFirstCourse) ? `${errors.dateFirstCourse}` : (errorFormAPI && errorFormAPI.dateFirstCourseForm) ? `${errorFormAPI.dateFirstCourseForm}` : ``}`}
                      TextDisplay={'DD-MM-YYYY'}
                      minimumDate={new Date(1900, 10, 20)}
                      maximumDate={new Date()}
                    />

                    <CustomDateInput
                      boxWidth={'47%'}
                      placeholder={'Select'}
                      label={'Last course date'}
                      name='Last course date'
                      date='date'
                      value={values.dateLastCourse}
                      labelStyle={{ color: '#4C5664' }}
                      InputStyle={{ color: '#4C5664' }}
                      rightIcon={<MaterialIcons name="date-range" size={20} color="black" />}


                      onChangeDate={(e, b, c) => {
                        console.log("values?.dateFirstCourse", values?.dateFirstCourse);

                        const dateFirstCourse = new Date(values?.dateFirstCourse);
                        const dateLastCourse = new Date(e); // <-- Parse user input

                        console.log("dateLastCourse > dateFirstCourse", dateLastCourse, dateFirstCourse);
                        console.log("dateLastCourse > dateFirstCourse?", dateLastCourse > dateFirstCourse);

                        if (dateLastCourse <= dateFirstCourse) {
                          Alert.alert(
                            undefined,
                            `The last course date cannot be earlier than the first course date (${values?.dateFirstCourse}).`
                          );
                          // seterrorFormAPI({ dateLastCourseForm: "Date Error" });
                        } else {
                          console.log("Dates are valid.");
                          handleChange("dateLastCourse")(e);
                          seterrorFormAPI(); // clear error
                        }
                      }}

                      onBlur={handleBlur("dateLastCourse")}
                      validate={handleBlur("dateLastCourse")}
                      outlined
                      backgroundColor={'white'}
                       
                      minimumDate={new Date(1900, 10, 20)}
                      maximumDate={new Date()}
                      borderColor={`${(errors.dateLastCourse && touched.dateLastCourse) || (errorFormAPI && errorFormAPI.dateLastCourseForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.dateLastCourse && touched.dateLastCourse) ? `${errors.dateLastCourse}` : (errorFormAPI && errorFormAPI.dateLastCourseForm) ? `${errorFormAPI.dateLastCourseForm}` : ``}`}
                      TextDisplay={'DD-MM-YYYY'}
                    />
                  </View>


                  <CustomTextInput
                    boxWidth={'85%'}
                    placeholder={'Last course place'}
                    label={'Last course place'}
                    bgColor={'white'}
                    labelStyle={{ color: '#4C5664' }}
                    InputStyle={{ color: '#4C5664' }}
                    placeholderTextColor={'#4C5664'}
                    name='lastCoursePlace'
                    value={values.lastCoursePlace}
                    inputRef={inputRefs.lastCoursePlace}
                    onChangeText={(e) => {
                      handleChange("lastCoursePlace")(e);
                      seterrorFormAPI();
                    }}
                    onBlur={handleBlur("lastCoursePlace")}
                    validate={handleBlur("lastCoursePlace")}
                    outlined
                    borderColor={`${(errors.lastCoursePlace && touched.lastCoursePlace) || (errorFormAPI && errorFormAPI.lastCoursePlaceForm) ? borderColorErrorInput : borderColorInput}`}
                    errorMessage={`${(errors.lastCoursePlace && touched.lastCoursePlace) ? `${errors.lastCoursePlace}` : (errorFormAPI && errorFormAPI.lastCoursePlaceForm) ? `${errorFormAPI.lastCoursePlaceForm}` : ``}`}
                  />


                  <CustomTextInput
                    boxWidth={'85%'}
                    placeholder={'Last assist teacher'}
                    label={'Last assist teacher'}
                    bgColor={'white'}
                    labelStyle={{ color: '#4C5664' }}
                    InputStyle={{ color: '#4C5664' }}
                    placeholderTextColor={'#4C5664'}
                    name='lastAsstTeacher'
                    value={values.lastAsstTeacher}
                    inputRef={inputRefs.lastAsstTeacher}
                    onChangeText={(e) => {
                      handleChange("lastAsstTeacher")(e);
                      seterrorFormAPI();
                    }}
                    onBlur={handleBlur("lastAsstTeacher")}
                    validate={handleBlur("lastAsstTeacher")}
                    outlined
                    borderColor={`${(errors.lastAsstTeacher && touched.lastAsstTeacher) || (errorFormAPI && errorFormAPI.lastAsstTeacherForm) ? borderColorErrorInput : borderColorInput}`}
                    errorMessage={`${(errors.lastAsstTeacher && touched.lastAsstTeacher) ? `${errors.lastAsstTeacher}` : (errorFormAPI && errorFormAPI.lastAsstTeacherForm) ? `${errorFormAPI.lastAsstTeacherForm}` : ``}`}
                  />


                  <CustomDropdown
                    boxWidth={'85%'}
                    label={'Course details'}
                    placeholder={'Select'}
                    name='courseDetails'
                    labelStyle={{ color: '#4C5664' }}
                    InputStyle={{ color: '#4C5664' }}
                    bgColor={'transparent'}
                    value={values.courseDetails}
                    DropDownData={courseDetailsData}
                    inputRef={inputRefs.courseDetails}
                    onChange={(e, b, c) => {
                      handleChange("courseDetails")(e.name)
                      seterrorFormAPI();
                    }}
                    containerStyle={{ elevation: 10, marginTop: 30 }}
                    onBlur={handleBlur("courseDetails")}
                    validate={handleBlur("courseDetails")}
                    outlined
                                      dropdownHeight={courseDetailsData.length <= 4 ? (courseDetailsData.length * 50) : 210}
                    borderColor={`${(errors.courseDetails && touched.courseDetails) || (errorFormAPI && errorFormAPI.courseDetailsForm) ? borderColorErrorInput : borderColorInput}`}
                    errorMessage={`${(errors.courseDetails && touched.courseDetails) ? `${errors.courseDetails}` : (errorFormAPI && errorFormAPI.courseDetailsForm) ? `${errorFormAPI.courseDetailsForm}` : ``}`}
                    DropDownArrowColor="#4C5664"
                  />


                  <CustomTextInput
                    boxWidth={'85%'}
                    label={'Have you tried any practice since the last course?'}
                    bgColor={'white'}
                    labelStyle={{ color: '#4C5664' }}
                    InputStyle={{ color: '#4C5664' }}
                    placeholder={'Describe your practice...'}
                    placeholderTextColor={'#4C5664'}
                    name='triedAnyPractise'
                    value={values.triedAnyPractise}
                    inputRef={inputRefs.triedAnyPractise}
                    onChangeText={(e) => {
                      handleChange("triedAnyPractise")(e);
                      seterrorFormAPI();
                    }}
                    // leftText={'Accomodate 10 members'}
                    onBlur={handleBlur("triedAnyPractise")}
                    validate={handleBlur("triedAnyPractise")}

                    outlined

                    borderColor={`${(errors.triedAnyPractise && touched.triedAnyPractise) || (errorFormAPI && errorFormAPI.triedAnyPractiseForm) ? borderColorErrorInput : borderColorInput}`}
                    errorMessage={`${(errors.triedAnyPractise && touched.triedAnyPractise) ? `${errors.triedAnyPractise}` : (errorFormAPI && errorFormAPI.triedAnyPractiseForm) ? `${errorFormAPI.triedAnyPractiseForm}` : ``}`}
                  />


                  <CustomDropdown
                    boxWidth={'85%'}
                    label={'Do you practice this technique regularly?'}
                    placeholder={'Select'}
                    name='practiseRegularly'
                    labelStyle={{ color: '#4C5664' }}
                    InputStyle={{ color: '#4C5664' }}
                    bgColor={'transparent'}
                    value={values.practiseRegularly}
                    inputRef={inputRefs.practiseRegularly}
                    DropDownData={practiseRegularlyData}
                    onChange={(e, b, c) => {
                      handleChange("practiseRegularly")(e.name)
                      seterrorFormAPI();
                    }}
                    containerStyle={{ elevation: 10, marginTop: 10 }}
                    onBlur={handleBlur("practiseRegularly")}
                    validate={handleBlur("practiseRegularly")}
                    outlined
                    dropdownHeight={practiseRegularlyData.length <= 4 ? (practiseRegularlyData.length * 50) : 210}
                    borderColor={`${(errors.practiseRegularly && touched.practiseRegularly) || (errorFormAPI && errorFormAPI.practiseRegularlyForm) ? borderColorErrorInput : borderColorInput}`}
                    errorMessage={`${(errors.practiseRegularly && touched.practiseRegularly) ? `${errors.practiseRegularly}` : (errorFormAPI && errorFormAPI.practiseRegularlyForm) ? `${errorFormAPI.practiseRegularlyForm}` : ``}`}
                    DropDownArrowColor="#4C5664"
                  />

                  {/* {values.practiseRegularly === "yes" || values.practiseRegularly === "Courses" ? ( */}


                  <>
                    <CustomTextInput
                      boxWidth={'85%'}
                      placeholder={'How many hours daily? '}
                      label={'How many hours daily?'}
                      bgColor={'white'}
                      labelStyle={{ color: '#4C5664' }}
                      InputStyle={{ color: '#4C5664' }}
                      placeholderTextColor={'#4C5664'}
                      name='dailyHours'
                      value={values.dailyHours}
                      inputRef={inputRefs.dailyHours}
                      onChangeText={(e) => {
                        handleChange("dailyHours")(e);
                        seterrorFormAPI();
                      }}
                      onBlur={handleBlur("dailyHours")}
                      validate={handleBlur("dailyHours")}
                      outlined
                      borderColor={`${(errors.dailyHours && touched.dailyHours) || (errorFormAPI && errorFormAPI.dailyHoursForm) ? borderColorErrorInput : borderColorInput}`}
                      errorMessage={`${(errors.dailyHours && touched.dailyHours) ? `${errors.dailyHours}` : (errorFormAPI && errorFormAPI.dailyHoursForm) ? `${errorFormAPI.dailyHoursForm}` : ``}`}
                    />

                    <CustomTextInput
                      boxWidth={'85%'}
                      bgColor={'white'}
                      labelStyle={{ color: '#4C5664' }}
                      InputStyle={{ color: '#4C5664' }}
                      placeholder={'If no, What is the reason?'}
                      label={'If no, What is the reason?'}
                      placeholderTextColor={'#4C5664'}
                      name='reason'
                      value={values.reason}
                      onChangeText={(e) => {
                        handleChange("reason")(e);
                        seterrorFormAPI();
                      }}
                      inputRef={inputRefs.reason}
                      onBlur={handleBlur("reason")}
                      validate={handleBlur("reason")}
                      outlined
                      borderColor={`${(errors.reason && touched.reason) || (errorFormAPI && errorFormAPI.reasonForm) ? borderColorErrorInput : borderColorInput}`}
                      errorMessage={`${(errors.reason && touched.reason) ? `${errors.reason}` : (errorFormAPI && errorFormAPI.reasonForm) ? `${errorFormAPI.reasonForm}` : ``}`}
                    />

                    <CustomTextInput
                      boxWidth={'85%'}
                      placeholder={'What changes have you noticed in yourself by the practice of meditation?'}
                      label={'What changes have you noticed in yourself by the practice of meditation?'}
                      bgColor={'white'}
                      labelStyle={{ color: '#4C5664' }}
                      InputStyle={{ color: '#4C5664' }}
                      placeholderTextColor={'#4C5664'}
                      name='changeInYourSelf'
                      value={values.changeInYourSelf}
                      inputRef={inputRefs.changeInYourSelf}
                      onChangeText={(e) => {
                        handleChange("changeInYourSelf")(e);
                        seterrorFormAPI();
                      }}
                      // leftText={'Accomodate 10 members'}
                      onBlur={handleBlur("changeInYourSelf")}
                      validate={handleBlur("changeInYourSelf")}

                      outlined

                      borderColor={`${(errors.changeInYourSelf && touched.changeInYourSelf) || (errorFormAPI && errorFormAPI.changeInYourSelfForm) ? borderColorErrorInput : borderColorInput}`}
                      errorMessage={`${(errors.changeInYourSelf && touched.changeInYourSelf) ? `${errors.changeInYourSelf}` : (errorFormAPI && errorFormAPI.changeInYourSelfForm) ? `${errorFormAPI.changeInYourSelfForm}` : ``}`}
                    />

                  </>

                </View>


                {errors && (
                  <Text style={{ color: 'red' }}>
                    {Object.values(errors).join('\n')}
                  </Text>
                )}
                <TouchableOpacity style={{
                  backgroundColor: '#030370', width: '75%',
                  marginTop: 15,
                  borderRadius: 15,
                  height: Metrics.rfv(50),
                  justifyContent: 'center', alignItems: 'center'
                }}
                  onPress={() => {
                    // inputRefs.dateFirstCourse.current?.openPicker();
                    handleSubmit()
                    // ErrorChecker()
                  }}
                >
                  <Text style={{ color: 'white', padding: 10 }}>Register for course</Text>
                </TouchableOpacity>



                <View style={{ height: 70 }}>

                </View>


              </View>

            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </ScrollView>



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
    color:'black'
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

export default CourseRegistration3;
