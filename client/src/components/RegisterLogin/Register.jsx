import { useNavigate, Link } from "react-router-dom";
import "./css/register.css";
import { register } from "../../api/authApi";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    //  tạo ref để trỏ tới input
    const fullNameRef = useRef(null)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSignup = async () => {
        // Kiểm tra nếu ô trống
        if(!username|| !fullName || !email || !password){
            alert("Vui lòng nhập đủ thông tin");
            return;
        }

        // Regex kiểm tra email phải kết thúc bằng @gmail.com Unique
        //^: bắt đầu; [a-zA-Z0-9._%+-]+: phần trước email(abc,abc123); @gmail; \.com: đuôi .com; $: kết thúc chuỗi 
    // const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; dùng cái này bị cứng
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        alert("Email phải đúng định dạng");
        return;
    }

        try {
            const result = await register(username, fullName, email, password);

             console.log("API trả về:", result);

            if(result.message === "Đăng ký thành công"){
                alert("Đăng ký thành công");
                navigate("/login");
            }
            else{
                alert("Đăng ký thất bại");
            }
        }catch(error){
            console.error(error);
            alert(error.message || "Đăng ký thất bại");
        }
    };

    // const handleSignup = () => {
    //     // giả lập đăng ký thành công
    //     navigate("/home");
    // };

    return (
        <div className="register-page">
            <div className="auth-container-register">
                <h2>Đăng ký</h2>

                {/* ô nhập username */}
                <label className="a">
                    Tên người dùng <span className="required">*</span>
                </label>
                <input 
                type="text" 
                placeholder="Nhập username" 
                onChange={(e) => setUsername(e.target.value)}

                // nếu nhấn Enter -> nhảy xuống ô email
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        fullNameRef.current.focus();
                    }
                }}
                />
                {/* ô nhập full_name */}
                <label className="a">
                    Họ và tên <span className="required">*</span>
                </label>
                <input 
                ref={fullNameRef} //gắn ref để focus
                type="text" 
                placeholder="Nhập họ và tên" 
                onChange={(e) => setFullName(e.target.value)}

                // nếu nhấn Enter -> nhảy xuống ô email
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        emailRef.current.focus();
                    }
                }}
                />

                {/* Ô email */}
                <label>
                    Email <span className="required">*</span>
                    <br />
                    <p>(abc123@gmail.com)</p>
                </label>
                <input 
                ref={emailRef} //gắn ref để focus
                type="email" 
                placeholder="Nhập email" 
                onChange={(e) => setEmail(e.target.value)}

                // nếu nhấn Enter -> nhảy xg ô password
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        passwordRef.current.focus();
                    }
                }}
                />

                {/* Ô password */}
                <label>
                    Mật khẩu <span className="required">*</span>
                </label>
                <div className="password-wrapper">
                    <input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"} //quyết định hiện gì
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSignup();
                            }
                        }}
                    />

                    <span
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />} 
                        {/* bị ngược */}
                    </span>
                </div>

                <button onClick={handleSignup}>Đăng ký</button>

                <p>Đã có tài khoản?<Link to="/login">Đăng nhập</Link></p>
            </div>
        </div>
    )
}

export default Signup;