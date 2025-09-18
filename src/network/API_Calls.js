import axios from 'axios';

import { GUEST_URL } from '../Enviornment.js'
import { Platform } from 'react-native';

// Platform for store link
const getAPIBaseUrl = () => {
  if (Platform.OS === 'ios') {
    return 'user/appStore';
  } else if (Platform.OS === 'android') {
    return 'user/playStore';
  } else {
    throw new Error('Unsupported platform');
  }
};


//Home Page api 
export const HomePageData = async (token) => {
  return await axios.get(`${GUEST_URL}/user/home`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//NEW 
export const GET_ALL_PRAVACHANS = async (token) => {
  return await axios.get(`${GUEST_URL}/user/pravachans`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

//New
export const GET_ALL_BHAJANAS = async (token) => {
  return await axios.get(`${GUEST_URL}/user/bhajanas`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

//New
export const GET_ALL_UPCOMING_EVENTS = async (token) => {
  return await axios.get(`${GUEST_URL}/user/upcomingevents`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

//New
export const GET_TRACK_BY_CATEGORY = async (token,category) => {
  console.log("category>>>",category)
  return await axios.get(`${GUEST_URL}/user/${category}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

// ALL_QUOTES_API
export const ALL_QUOTES_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/quotes`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



// ALL_QUOTES_API
export const CATEGORY_POSTS_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// User Form Data API Call 
export const FormDataApi = async (loginData, token) => {
  console.log("API LEVEL", loginData)
  setTimeout(() => {

  }, 200);
  const res = await axios.post(`${GUEST_URL}/user/form`, loginData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  console.log("iuyftdrsdfyguihojjhgfhdgh", res)
  return res
};


//Video api 
export const VideoPageData = async (token, id) => {
  return await axios.get(`${GUEST_URL}/user/post/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

//Live Page api 
export const LivePageData = async (token) => {
  return await axios.get(`${GUEST_URL}/user/live`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


// User Login API Call  // DONE ?? VERI
export const UserLoginApi = async (loginFormData) => {
  console.log("dsjb",loginFormData)
  return await axios.post(`${GUEST_URL}/login`, loginFormData);
};


// User Registertion API Call 
export const UserRegisterApi = async (loginData) => {
  return await axios.post(`${GUEST_URL}/register`, loginData);
};


// User Forgot OTP Send API Call 
export const UserForgotOTPApi = async (ReqData) => {
  return await axios.post(`${GUEST_URL}/otp`, ReqData);
};



// User Forgot OTP verifyotp API Call 
export const UserVerifyOtp = async (reqData) => {
  console.log("reqData",reqData)
  return await axios.post(`${GUEST_URL}/verifyotp`, reqData);
};



// User Forgot OTP verifyotp API Call 
export const ForgotApiPassRest = async (reqData) => {
  return await axios.post(`${GUEST_URL}/forgotpassword`, reqData);
};


//Profile api 
export const UserGetProfileDetails = async (token) => {

  return await axios.get(`${GUEST_URL}/user/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


//Updated Profile Pic api 
export const UserUpdatedProfilePic123 = async (formData, token) => {
  // console.log("data vachindhi",formData,token)
  return await axios.post(`${GUEST_URL}/user/uploaddp`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });
};

//GetPlayStore api 
export const GetPlayStoreAPI = async (token) => {
  const apiUrl = getAPIBaseUrl();
  console.log("><>", apiUrl)
  return await axios.get(`${GUEST_URL}/${apiUrl}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//Delete Account api 
export const DeleteAccountAPI = async (token) => {
  return await axios.delete(`${GUEST_URL}/user/deleteuser`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//Updated Profile api 
export const UserUpdatedProfileDetails = async (fName, lName, userAge, token) => {
  const loginData = {
    firstname: fName,
    lastname: lName,
    age: userAge,
    // gender: userGender,
  };
  return await axios.post(`${GUEST_URL}/user/updateprofile`, loginData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};





//Profile api 
export const AboutAPI = async (token) => {

  return await axios.get(`${GUEST_URL}/user/about`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//PrivacyPolicyAPI
export const PrivacyPolicyAPI = async (token) => {

  return await axios.get(`${GUEST_URL}/user/privacypolicy`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//Profile PasswordChange
export const ChangePasswordAPI = async (values, tokenn) => {
  console.log("tokenn",tokenn)
  const reqData = {
    oldPassword: "Rohith@7",
    newPassword: values.password_confirmation,
  };

  return await axios.post(`${GUEST_URL}/user/changepassword`, reqData, {
    headers: {
      'Authorization': `Bearer ${tokenn}`
    }
  });
};




//Video api 
export const GetVideosDataAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/videos`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};


//Form requesties
export const GetFormReqs = async (token) => {
  return await axios.get(`${GUEST_URL}/user/courses`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


//Form GetFormDataSumbited
export const GetFormDataSumbited = async (token) => {

  return await axios.get(`${GUEST_URL}/user/formdata`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};




//Form GetCourseData
export const GetCourseData = async (id, token) => {

  return await axios.get(`${GUEST_URL}/user/singlecourse/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
