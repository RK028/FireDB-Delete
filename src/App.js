import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import app from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import './index.css'


const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
 

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;
    

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP send successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult.confirm(otp)
    .then(async (res) => {
        setUser(res.user);
        setLoading(false);

        const phoneNumber = ph.slice(2,12);
        const UserRef = app.database().ref('CustomerDetails');
        UserRef.orderByChild('customerPhoneNumber').equalTo(phoneNumber).once('value')
          .then(snapshot => {
            if (snapshot.exists()) {
              setAdminData(snapshot.val());
              
            } else {
              setAdminData(null);
              document.write("<h1 >Data Not Found</h1>")
            }
          });

      })
      .catch((err) => {
        alert("OTP Not Matched")
        console.log(err);
        setLoading(false);
      });
  }
  const update = (customerId)=>{
    const reason = prompt("why are you deleting");
    if(reason){
      const Customerref = app.database().ref('CustomerDetails').child(customerId);
      Customerref.update({
            creationDate : "null",
            customerId: "null",
            customerPhoneNumber: "null",
            dateOfBirth: "null",
            favouriteColor:"null",
            hobbyList: "null",
            emailverified: "null",
            paymentStatus: "null",
            userLatitude: "null",
            categoryList: "null",
            avatarList: "null",
            userLongtitude:"null",
            kidsName:"null",
            kidsHobby:"null",
            profileImage:"null",
            profileName: "null",
            deletedReason: reason,
            signIn: false
      })
      alert("data deleted Successfully")
      if(alert){
        window.location.reload()
      }
    }else{
      alert("Data did not delete ")
    }
  }
  

   

  return (
    <div>
  
    <section className="bg-blue-300 flex items-center justify-center h-screen">
      
     
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
        <div>
      {adminData && 
  <div className="box-border h-88 w-90 p-4 text-left text-while font-medium text-2xl border-4 bg-yello-500 m4">
    <h2>Customer Data:</h2>
    {Object.keys(adminData).map(key => (
      <div key={key}>
        <p>Customer ID: {adminData[key].customerId}</p>
        <p>PhoneNumber: {adminData[key].customerPhoneNumber}</p>
        <p>DOB: {adminData[key].dateOfBirth}</p>
        <p>kidsName: {adminData[key].kidsName}</p>
        <p>Payment: {adminData[key].paymentStatus}</p>
        <p>profileName: {adminData[key].profileName}</p>
        <img src={adminData[key].profileImage} alt="profileImage" width="10%" height="10%" className="h-auto max-w-xs" />
        {/* <div>
          <h3>Hobbies:</h3>
          {adminData[key].hobbyList && 
            adminData[key].hobbyList.map((hobby, index) => (
              hobby && // Check if hobby exists
              <p key={index}>{hobby.hobbyName}</p>
            ))
          }
        </div> */}
        <button 
          onClick={() => update(adminData[key].customerId)}
          className="text-white bg-blue-700 hover:bg-lightblue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
}

        </div>

          
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> Mimibee
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white color-#243c5a text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-blue-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
    </div>
  );
};

export default App;
