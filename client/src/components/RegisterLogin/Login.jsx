import { useNavigate, Link } from "react-router-dom";
import "./css/login.css";
import { login } from "../../api/authApi";
import { useRef, useState } from "react";
// Thêm import các icon từ react-icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    // Thêm state xử lý ẩn/hiện mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    // Tạo ref
    const passwordRef = useRef(null);

    // Làm lại vì có access + refresh-token
    const handleLogin = async () => {
        if (!username || !password) {
            alert("Vui lòng nhập thông tin");
            return;
        }

        try {
            const res = await login(username, password);
            console.log(res);

            if (res.user) {
                // LƯU TOKEN
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("refresh_token", res.refresh_token);

                // LƯU USER
                localStorage.setItem("user", JSON.stringify(res.user));

                // Chuyển trang
                navigate("/");
            } else {
                alert("Sai tài khoản hoặc mật khẩu");
            }
        } catch (error) {
            console.error(error);
            alert(error.message || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="login-container">
            <div className="auth-container">
                <h2>Đăng nhập</h2>

                {/* Ô tài khoản */}
                <input 
                    type="text" 
                    placeholder="Tên đăng nhập"
                    onChange={(e) => setUsername(e.target.value)}
                    // Enter -> xuống password
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            passwordRef.current.focus();
                        }
                    }}
                />

                {/* Ô password (Đã bọc wrapper và thêm icon mắt giống Đăng ký) */}
                {/* Ô password */}
                <div className="password-wrapper">
                    <input 
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"} 
                        placeholder="Mật khẩu"
                        className="password-input"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                    />
                    <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <p>
                    <Link to="/forgot-password">
                        Quên mật khẩu?
                    </Link>
                </p>

                <button 
                    className="btn-practice"
                    onClick={handleLogin}
                >
                    Đăng nhập
                </button>

                <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            </div>
        </div>
    );
};

export default Login;