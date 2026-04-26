import { useNavigate, Link } from "react-router-dom";
import "./register.css";
import { register } from "../../api/authApi";
import { useRef, useState } from "react";

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

    //  tạo ref để trỏ tới input
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSignup = async () => {
        // Kiểm tra nếu ô trống
        if(!username || !email || !password){
            alert("Vui lòng nhập đủ thông tin");
            return;
        }

        // Regex kiểm tra email phải kết thúc bằng @gmail.com
        //^: bắt đầu; [a-zA-Z0-9._%+-]+: phần trước email(abc,abc123); @gmail; \.com: đuôi .com; $: kết thúc chuỗi 
    // const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; dùng cái này bị cứng
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        alert("Email phải đúng định dạng");
        return;
    }

        try {
            const result = await register(username, email, password);

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
        <div className="auth-container">
            <h2>Đăng ký</h2>

            {/* ô nhập username */}
            <label className="a">
                Tên <span className="required">*</span>
            </label>
            <input 
            type="text" 
            placeholder="" 
            onChange={(e) => setUsername(e.target.value)}

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
            placeholder="" 
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
            <input 
            ref={passwordRef} //gắn ref
            type="password" 
            placeholder="" 
            onChange={(e)=>setPassword(e.target.value)}

            // Enter -> chạy đăng ký
            onKeyDown={(e)=> {
                if(e.key === "Enter"){
                    handleSignup();
                }
            }}
            />

            <button onClick={handleSignup}>Đăng ký</button>

            <p>Đã có tài khoản?<Link to="/login">Đăng nhập</Link></p>
        </div>
        </div>
    )
}

export default Signup;