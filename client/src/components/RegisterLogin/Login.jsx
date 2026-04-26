import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { login } from "../../api/authApi";
import { useRef, useState } from "react";

const Login = () => {
    
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Tạo ref
    const passwordRef = useRef(null);


    //Làm lại vì có access + refresh-token
    const handleLogin = async () => {

    if(!username || !password){
        alert("Vui lòng nhập thông tin");
        return;
    }

    try {
        const res = await login(username, password);
        console.log(res);

        if (res.user) {
            // 🔥 LƯU TOKEN
            localStorage.setItem("access_token", res.access_token);
            localStorage.setItem("refresh_token", res.refresh_token);

            // 🔥 LƯU USER
            localStorage.setItem("user", JSON.stringify(res.user));

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

                <input 
                type="text" 
                placeholder="Tên"
                onChange={(e)=> setUsername(e.target.value)}
                //Enter -> xg password
                onKeyDown={(e) =>{
                    if(e.key === "Enter"){
                        passwordRef.current.focus();
                    }
                }}
                />

                {/* Ô password */}
                <input 
                ref={passwordRef} // gắn ref
                type="password" 
                placeholder="Mật khẩu"
                onChange={(e)=>setPassword(e.target.value)}

                //Enter -> Login
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        handleLogin();
                    }
                }}
                 />

                
                <button className="btn-practice"
                    // onClick={() => navigate("/home")}
                    onClick={handleLogin}
                >Đăng nhập</button>
                {/* <button >Đăng nhập</button> */}

                <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            </div>
        </div>
    )
}

export default Login;