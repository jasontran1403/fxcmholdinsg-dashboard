// import axios from "axios";
import React, { useState } from "react";

import { PrimaryButton } from "../../components/buttons";
import { Input } from "../../components/field";
// import { toast } from "../../helpers";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // const forgotPassword = () => {
    //     const FormData = require("form-data");
    //     let data = new FormData();
    //     data.append("email", email);

    //     let config = {
    //         method: "post",
    //         url: "https://seashell-app-bbv6o.ondigitalocean.app/api/user/forgotpassword",
    //         data: data
    //     };

    //     axios
    //         .request(config)
    //         .then(response => {
    //             if (response.data == "OK") {
    //                 toast("success", "Email has been sent");
    //             } else {
    //                 toast("error", "Email khong ton tai");
    //             }
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };
    return (
        <div className="register-body">
            <div className="container-register" id="container-id">
                <div className="form-container sign-in">
                    <form>
                        <h1>Reset Password</h1>
                        <div style={{ width: "100%" }}>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <p>
                            Đã có tài khoản? <a href="/login">Đăng nhập tại đây </a>
                        </p>
                        <PrimaryButton>
                            <span>Sumbit</span>
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
