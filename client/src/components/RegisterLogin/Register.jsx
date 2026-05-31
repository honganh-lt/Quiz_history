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
    
    //Thêm trạng thái loading để tối ưu hóa UX và chặn spam gửi form
    const [loading, setLoading] = useState(false);

    // tạo ref để trỏ tới các ô input tiếp theo
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSignup = async () => {
        //Loại bỏ khoảng trắng thừa bằng .trim() khi validate dữ liệu nhập vào
        if (!username.trim() || !fullName.trim() || !email.trim() || !password) {
            alert("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
            alert("Email không đúng định dạng tiêu chuẩn (Ví dụ: abc@gmail.com)");
            return;
        }

        setLoading(true);
        try {
            const result = await register(
                username.trim(), 
                fullName.trim(), 
                email.trim(), 
                password
            );

            console.log("API trả về:", result);

            if (result && result.message === "Đăng ký thành công") {
                alert("Đăng ký tài khoản thành công!");
                navigate("/login");
            } else {
                alert("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!");
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            //Trích xuất thông điệp báo lỗi cụ thể từ cơ sở dữ liệu backend
            const errorMsg = error.response?.data?.message || "Đăng ký thất bại. Hệ thống hoặc đường truyền đang bận!";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="auth-container-register">
                <h2>Đăng ký</h2>

                {/* ô nhập username */}
                <label>
                    Tên tài khoản <span className="required">*</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Nhập username" 
                    value={username} // Ràng buộc value chuẩn cấu trúc React
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            fullNameRef.current.focus();
                        }
                    }}
                    disabled={loading}
                />

                {/* ô nhập full_name */}
                <label>
                    Họ và tên <span className="required">*</span>
                </label>
                <input 
                    ref={fullNameRef}
                    type="text" 
                    placeholder="Nhập họ và tên" 
                    value={fullName} //Ràng buộc value
                    onChange={(e) => setFullName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            emailRef.current.focus();
                        }
                    }}
                    disabled={loading}
                />

                {/* Ô email */}
                <label>
                    Email <span className="required">*</span>
                    <p className="email-hint">(Ví dụ: abc123@gmail.com)</p>
                </label>
                <input 
                    ref={emailRef}
                    type="email" 
                    placeholder="Nhập email" 
                    value={email} // Ràng buộc value
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            passwordRef.current.focus();
                        }
                    }}
                    disabled={loading}
                />

                {/* Ô password */}
                <label>
                    Mật khẩu <span className="required">*</span>
                </label>
                <div className="password-wrapper">
                    <input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        value={password} // Ràng buộc value
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !loading) {
                                handleSignup();
                            }
                        }}
                        disabled={loading}
                    />
                    <span
                        className="eye-icon"
                        onClick={() => !loading && setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />} 
                    </span>
                </div>

                <button onClick={handleSignup} disabled={loading}>
                    {loading ? "Đang xử lý..." : "Đăng ký"}
                </button>

                <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
            </div>
        </div>
    );
};

export default Signup;