//dễ mở rộng bỏ

// check 1 role ? có cần ko admin
exports.checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        // 1. Phải đi qua verifyToken trước để có req.user
        if (!req.user) {
            return res.status(401).json({ message: "Chưa xác thực" });
        }

        // DEBUG cho bạn dễ nhìn khi test bằng Postman
        console.log("ROLE CỦA USER:", req.user.role);
        console.log("CÁC ROLE ĐƯỢC PHÉP VÀO:", allowedRoles);

        // 2. Kiểm tra xem role của user có nằm trong danh sách được cho phép không
        const hasPermission = allowedRoles.includes(req.user.role);

        if (!hasPermission) {
            return res.status(403).json({ message: "Không có quyền truy cập" });
        }

        // Hợp lệ thì cho đi tiếp vào Controller
        next();
    };
};

// check nhiều role
// exports.checkRoles = (roles) => {
//     return (req, res, next) => {
//         if (!req.user) {
//             return res.status(401).json({ message: "Chưa xác thực" });
//         }

//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: "Không có quyền" });
//         }

//         next();
//     };
// };


// //check 1 role === phân quyền === admin only
// exports.isAdmin = (req, res, next) => {
//         if(!req.user) {
//             return res.status(401).json({message: "Chưa xác thực"})
//         }

//         if(req.user.role !== "admin") {
//             return res.status(403).json({message: "Không có quyền Admin"})
//         }

//         next();
//     };

// //check nhiều role === User hoặc admin đều được
// exports.isUserOrAdmin = (req, res, next) => {
//         if(!req.user) {
//             return res.status(401).json({message: "Chưa xác thực"})
//         }

//         if(!roles.includes(req.user.role)) {
//             return res.status(403).json({message: "Không có quyền"})
//         }

//         next();
//     }   