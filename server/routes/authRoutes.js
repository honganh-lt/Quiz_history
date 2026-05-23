const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRoles, checkRole } = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware")

//==============Public=========
router.post("/register", authController.register);
router.post("/login", authController.login);


//==========USER (user + admin login cũng vào được)==========
// router.get("/profile", 
//         verifyToken, 
//         checkRoles(["USER", "ADMIN"]),
//         (req, res) => {
//     res.json({message: "OK", user: req.user});
// })
// //ví dụ API cho client
// router.get("/user-data",
//         verifyToken,
//         checkRoles(["USER", "ADMIN"]),
//         (req, res) => {
//         res.json({ message: "Dữ liệu user" });
//     }
// )
//========== ADMIN ONLY ==========
router.get(
    "/admin",
    verifyToken,
    checkRole("ADMIN"),
    (req, res) => {
        res.json({ message: "Chào admin " });
    }
);
//user
router.post(
    "/forgot-password",
    authController.forgotPassword
);

router.post(
    "/verify-otp",
    authController.verifyOtp
);

router.post(
    "/change-password",
    authMiddleware.verifyToken,
    authController.changePassword
);

//=============TOKEN============
router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout)

//========Admin only=======

module.exports = router;