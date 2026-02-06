import { useNavigate, Link } from "react-router-dom";
import "./register.css";

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = () => {
        // giả lập đăng ký thành công
        navigate("/home");
    };

    return (
        <div className="auth-container">
            <h2>Đăng ký</h2>

            <input type="text" placeholder="Tên" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mật khẩu" />

            <button >Đăng nhập</button>

            <p>Đã có tài khoản?<Link to="/signup">Đăng nhập</Link></p>
        </div>
    )
}

export default Signup;