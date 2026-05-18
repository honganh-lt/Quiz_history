import { useState } from "react";

import {
    forgotPassword,
    verifyOtp
} from "../../api/userApi";
import "./css/forgotPassword.css"
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate()

    const [email, setEmail] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

        const [step, setStep] = useState(1);
    const handleSendOtp = async () => {

    try {

        await forgotPassword({ email });

        alert("Đã gửi OTP");

        setStep(2);

    } catch (error) {

        alert(
            error.response.data.message
        );
    }
};

    const handleVerifyOtp = async () => {

    try {

        await verifyOtp({
            email,
            otp,
            newPassword
        });

        alert("Đổi mật khẩu thành công");

        navigate("/login");

    } catch (error) {

        alert(
            error.response.data.message
        );
    }
};

    return (

    <div className="forgot-container">

        <div className="forgot-box">

            <h2>Quên mật khẩu</h2>

            {
                step === 1 && (

                    <>

                        <input
                            type="email"
                            placeholder="Nhập email"
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <button
                            onClick={handleSendOtp}
                        >
                            Gửi OTP
                        </button>

                    </>

                )
            }

            {
                step === 2 && (

                    <>

                        <input
                            type="text"
                            placeholder="Nhập OTP"
                            onChange={(e) =>
                                setOtp(e.target.value)
                            }
                        />

                        <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            onClick={handleVerifyOtp}
                        >
                            Xác nhận
                        </button>

                    </>

                )
            }

        </div>

    </div>
);
}

export default ForgotPassword;