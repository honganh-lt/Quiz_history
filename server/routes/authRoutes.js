const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware"); // Chỉ cần dùng 1 hàm checkRole duy nhất

// ==================== 1. PUBLIC ROUTES ====================
// Ai cũng có thể truy cập (Không cần token, không cần role)
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-otp", authController.verifyOtp);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);


// ==================== 2. USER & ADMIN ROUTES ====================
// Yêu cầu: Phải đăng nhập VÀ tài khoản phải là USER hoặc ADMIN
router.get(
    "/profile", 
    verifyToken, 
    checkRole("USER", "ADMIN"), // Truyền bao nhiêu role vào cũng được
    (req, res) => {
        res.json({ message: "OK", user: req.user });
    }
);

router.get(
    "/user-data",
    verifyToken,
    checkRole("USER", "ADMIN"),
    (req, res) => {
        res.json({ message: "Dữ liệu user" });
    }
);

// Đổi mật khẩu thì chỉ cần đăng nhập là được (Bất kể role nào)
router.post(
    "/change-password",
    verifyToken,
    authController.changePassword
);


// ==================== 3. ADMIN ONLY ROUTES ====================
// Yêu cầu tối cao: Phải là ADMIN mới được sờ vào
router.get(
    "/admin",
    verifyToken,
    checkRole("ADMIN"), // Chỉ cho duy nhất ADMIN qua cửa
    (req, res) => {
        res.json({ message: "Chào admin" });
    }
);

module.exports = router;