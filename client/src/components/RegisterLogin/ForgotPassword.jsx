import { useState } from "react";
import { forgotPassword, verifyOtp } from "../../api/authApi";
import "./css/forgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    
    //Thêm trạng thái loading để tránh spam click gửi trùng lặp request API
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        if (!email.trim()) {
            alert("Vui lòng nhập địa chỉ email");
            return;
        }

        setLoading(true);
        try {
            await forgotPassword({ email: email.trim() });
            alert("Mã OTP đã được gửi đến Email của bạn");
            setStep(2);
        } catch (error) {
            console.error(error);
            // Thêm dấu hỏi chấm (?) tránh crash trắng màn hình khi lỗi mạng không có response
            alert(error.response?.data?.message || "Không thể gửi OTP. Vui lòng kiểm tra lại Email!");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp.trim() || !newPassword) {
            alert("Vui lòng nhập đầy đủ mã OTP và mật khẩu mới");
            return;
        }

        setLoading(true);
        try {
            await verifyOtp({
                email: email.trim(),
                otp: otp.trim(),
                newPassword
            });

            alert("Đổi mật khẩu thành công");
            navigate("/login");
        } catch (error) {
            console.error(error);
            //Thêm phòng vệ an toàn cho thông điệp lỗi catch
            alert(error.response?.data?.message || "Mã OTP không chính xác hoặc đã hết hạn!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-box">
                <h2>Quên mật khẩu</h2>

                {/* BƯỚC 1: NHẬP EMAIL ĐỂ LẤY OTP */}
                {step === 1 && (
                    <>
                        <input
                            type="email"
                            placeholder="Nhập email đăng ký"
                            value={email} // Ràng buộc value chuẩn cấu trúc React
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !loading) {
                                    handleSendOtp();
                                }
                            }}
                            disabled={loading}
                        />
                        <button onClick={handleSendOtp} disabled={loading}>
                            {loading ? "Đang gửi..." : "Gửi OTP"}
                        </button>
                    </>
                )}

                {/* BƯỚC 2: XÁC THỰC OTP VÀ ĐỔI MẬT KHẨU MỚI */}
                {step === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Nhập mã OTP"
                            value={otp} //  Ràng buộc value
                            onChange={(e) => setOtp(e.target.value)}
                            disabled={loading}
                        />
                        <div className="password-new">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu mới"
                                value={newPassword} //Ràng buộc value
                                onChange={(e) => setNewPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !loading) {
                                        handleVerifyOtp();
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
                        <button onClick={handleVerifyOtp} disabled={loading}>
                            {loading ? "Đang xác nhận..." : "Xác nhận đổi mật khẩu"}
                        </button>
                    </>
                )}

                <p className="back-to-login">
                    <Link to="/login">Quay lại Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;