import { useNavigate, Link } from "react-router-dom";
import "./css/login.css";
import { login } from "../../api/authApi";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    //Thêm trạng thái loading để chống việc người dùng spam click nút Đăng nhập
    const [loading, setLoading] = useState(false);

    const passwordRef = useRef(null);

    const handleLogin = async () => {
        if (!username.trim() || !password) {
            alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
            return;
        }

        setLoading(true);
        try {
            const res = await login(username, password);

            if (res && res.user) {
                // LƯU TOKEN
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("refresh_token", res.refresh_token);

                // LƯU USER
                localStorage.setItem("user", JSON.stringify(res.user));

                // Chuyển trang về Home
                navigate("/");
            } else {
                alert("Sai tài khoản hoặc mật khẩu");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            // Lấy thông điệp lỗi chuẩn xác trả về từ Backend hoặc xử lý fallback thông minh hơn
            const errorMsg = error.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại đường truyền mạng!";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-login">
            <div className="auth-container">
                <h2>Đăng nhập</h2>

                {/* Ô tài khoản */}
                <input 
                    type="text" 
                    placeholder="Tên đăng nhập"
                    value={username} // Ràng buộc value để đồng bộ dữ liệu chuẩn React
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            passwordRef.current.focus();
                        }
                    }}
                    disabled={loading}
                />

                {/* Ô password */}
                <div className="password-wrapper">
                    <input 
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"} 
                        placeholder="Mật khẩu"
                        className="password-input"
                        value={password} //  Ràng buộc value
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !loading) {
                                handleLogin();
                            }
                        }}
                        disabled={loading}
                    />
                    <span className="eye-icon" onClick={() => !loading && setShowPassword(!showPassword)}>
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
                    disabled={loading} // Khóa nút khi đang gửi yêu cầu đăng nhập
                >
                    {loading ? "Đang xử lý..." : "Đăng nhập"}
                </button>

                <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            </div>
        </div>
    );
};

export default Login;