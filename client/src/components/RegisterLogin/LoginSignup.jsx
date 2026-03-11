// import React, {  useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginSignup.css";
// import { login, register } from "../../api/authApi";

// const LoginSignup = () => {
//     const [action, setAction] = useState("Đăng nhập");

// const [username, setUsername] = useState("");
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

//     const navigate = useNavigate();

//     const handleSubmit = async () => {

//         try {
//             if(action === "Đăng nhập") {
//                 const result = await login(username, password);

//                 if(result.message ===" Dang nhap thanh cong"){
//                     localStorage.setItem("user", JSON.stringify(result.user));

//         navigate("/");
//                 } else{
//                     alert(result.message);
//                 }
//             }else{
//                  const result = await register(username, email, password);

//                 if (result.message === "Đăng ký thành công") {

//                     alert("Đăng ký thành công");
//                     setAction("Đăng nhập");
//             }else{
//                 alert(result.message);
//             }
//         }
            
//         }
//         catch(error) {
//             console.error(error);
//         }
//     };

//     return (
//       <div className="container-loginSignup">

//             <div className="header-loginSignup">
//                 <div className="text">{action}</div>
//             </div>

//             <div className="inputs">

//                 <div className="input">
//                     <input
//                         placeholder="Name"
//                         type="text"
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>

//                 {action === "Đăng ký" && (
//                     <div className="input">
//                         <input
//                             placeholder="Email"
//                             type="email"
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                 )}

//                 <div className="input">
//                     <input
//                         placeholder="Password"
//                         type="password"
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>

//             </div>

//             {action === "Đăng nhập" && (
//                 <div className="forgot-password">Quên mật khẩu?</div>
//             )}

//             <div className="submit-container">

//                 <div
//                     className={action === "Đăng nhập" ? "submit gray" : "submit"}
//                     onClick={() => setAction("Đăng ký")}
//                 >
//                     Đăng ký
//                 </div>

//                 <div
//                     className={action === "Đăng ký" ? "submit gray" : "submit"}
//                     onClick={() => setAction("Đăng nhập")}
//                 >
//                     Đăng nhập
//                 </div>

//             </div>

//             <button className="submit" onClick={handleSubmit}>
//                 {action}
//             </button>

//         </div>

//     );
// }
// // chuyển form sang đăng nhập + sang "/" sau này gắn API rồi mới navigate
// export default LoginSignup;

