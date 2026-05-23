const db = require("../config/db");
// const crypto = require("crypto");
// const sendMail = require("../config/sendMail");
// const bcrypt = require("bcrypt");

// const { route } = require("./authRoutes");

//lấy danh sách users admin
exports.getUser = (req,res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({error: "Database error"})
        }
        res.json(result);
    })
};

//POST admin
exports.postUser = async (req, res) => {

    console.log("BODY:", req.body);

    const {
        username,
        full_name,
        email,
        password,
        role
    } = req.body;

    try {

        // CHECK TRÙNG USERNAME / EMAIL
        const checkSql = `
            SELECT * FROM users
            WHERE username = ?
            OR email = ?
        `;

        db.query(
            checkSql,
            [username, email],
            async (checkErr, checkResult) => {

                if (checkErr) {
                    return res.status(500).json({
                        message: "Lỗi server"
                    });
                }

                // nếu đã tồn tại
                if (checkResult.length > 0) {

                    // check username
                    const usernameExists =
                        checkResult.find(
                            user =>
                                user.username === username
                        );

                    if (usernameExists) {
                        return res.status(400).json({
                            message: "Username đã tồn tại"
                        });
                    }

                    // check email
                    const emailExists =
                        checkResult.find(
                            user =>
                                user.email === email
                        );

                    if (emailExists) {
                        return res.status(400).json({
                            message: "Email đã tồn tại"
                        });
                    }
                }

                // HASH PASSWORD
                const hashedPassword =
                    await bcrypt.hash(password, 10);

                // INSERT
                const sql = `
                    INSERT INTO users
                    (
                        username,
                        full_name,
                        email,
                        password,
                        role
                    )
                    VALUES (?, ?, ?, ?, ?)
                `;

                db.query(
                    sql,
                    [
                        username,
                        full_name,
                        email,
                        hashedPassword,
                        role
                    ],
                    (err) => {

                        if (err) {
                            console.log(err);

                            return res.status(500).json({
                                message: "Lỗi thêm user"
                            });
                        }

                        res.json({
                            message: "Created"
                        });
                    }
                );
            }
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

//Status block admin
exports.toggleBlockUser = (req, res) => {

    const id = req.params.id;

    // lấy status hiện tại
    const findSql = `
        SELECT status
        FROM users
        WHERE user_id = ?
    `;

    db.query(findSql, [id], (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        if(result.length === 0){
            return res.status(404).json({
                message: "Không tìm thấy user"
            });
        }

        const currentStatus = result[0].status;

        // đổi trạng thái
        const newStatus =
            currentStatus === "blocked"
            ? "active"
            : "blocked";

        const updateSql = `
            UPDATE users
            SET status = ?
            WHERE user_id = ?
        `;

        db.query(
            updateSql,
            [newStatus, id],
            (updateErr) => {

                if(updateErr){
                    return res.status(500).json(updateErr);
                }

                res.json({
                    message:
                        newStatus === "blocked"
                        ? "Đã khóa tài khoản"
                        : "Đã mở khóa tài khoản"
                });
            }
        );
    });
};

//Update User admin : hay ở FE dùng cổng PUT để lấy từ BE
// vì trong server.js app.use("/api/users", userRoutes); -thực tế: /api/users/users/:id - nên "/users/:id" là sai mà là "/:id"
exports.putUser = (req,res) => {

    const {username,full_name, email, role} = req.body;

    const sql = `
        UPDATE users 
        SET username=?, full_name=?, email=?, role=? 
        WHERE user_id=?
    `;

    db.query(
        sql,
        [username, full_name, email, role, req.params.id],
        (err, result) => {

            if(err){

                console.log(err);

                // email hoặc username trùng
                if(err.code === "ER_DUP_ENTRY"){
                    return res.status(400).json({
                        message: "Username hoặc email đã tồn tại"
                    });
                }

                return res.status(500).json(err);
            }

            res.json({
                message: "Update success"
            });
        }
    );
};

//Delete User: admin
// vì trong server.js app.use("/api/users", userRoutes); -thực tế: /api/users/users/:id - nên "/users/:id" là sai mà là "/:id"
// không cần dùng async và await
exports.deleteUser = (req,res) => { 

    // console.log("Delete id", res.params.id);
    const { id } = req.params;

    const sql = "DELETE FROM users WHERE user_id = ? ";

         db.query(sql, [id], (err) => {
            if(err){
                return res.status(500).json(err);
            }
            res.json({
                message: "Xóa thành công"
            });
         });
};



