import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();

    // const handleSignup = () => {
    //     // giả lập đăng ký thành công
    //     navigate("/home");
    // };

    return (
        <div className="login-container">
            <div className="auth-container">
                <h2>Đăng nhập</h2>

                <input type="text" placeholder="Tên" />
                <input type="password" placeholder="Mật khẩu" />

                {/* Tạm thời */}
                <button className="btn-practice"
                    onClick={() => navigate("/home")}
                >Đăng nhập</button>
                {/* <button >Đăng nhập</button> */}

                <p>Chưa có tài khoản? <Link to="/signup">Đăng ký</Link></p>
            </div>
        </div>
    )
}

export default Login;