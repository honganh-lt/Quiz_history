import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const LoginSignup = () => {
    const [action, setAction] = useState("Đăng nhập");
    const navigate = useNavigate();

    const handleSubmit = () => {
        // giả lập đăng nhập / đăng ký thành công // sau này thay bằng gọi API
        navigate("/");
    };

    return (
        <div className="container-loginSignup">
            <div className="header-loginSignup">
                <div className="text">{action}</div>
            </div>

            <div className="inputs">
                <div className="input">
                    <input placeholder="Name" type="text" />
                </div>

                {action === "Đăng ký" && (
                    <div className="input">
                        <input placeholder="Email" type="email" />
                    </div>
                )}

                <div className="input">
                    <input placeholder="Password" type="password" />
                </div>
            </div>

            {action === "Đăng nhập" && (
                <div className="forgot-password">Quên mật khẩu?</div>
            )}

            <div className="submit-container">
                <div
                    className={action === "Đăng nhập" ? "submit gray" : "submit"}
                    onClick={() => {
                        setAction("Đăng ký");
                    }}
                >
                    Đăng ký
                </div>

                <div
                    className={action === "Đăng ký" ? "submit gray" : "submit"}
                    onClick={() => {
                        setAction("Đăng nhập");
                        handleLoginSignup();
                    }}
                >
                    Đăng nhập
                </div>
                {/* <button className="submit" onClick={handleSubmit}>
                    {action}
                </button> */}
            </div>
        </div>

    );
}
// chuyển form sang đăng nhập + sang "/" sau này gắn API rồi mới navigate
export default LoginSignup;
