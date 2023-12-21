import axios from "axios";
import React, { useState, useEffect } from "react";

import { PrimaryButton } from "../../components/buttons";
import { Input } from "../../components/field";
import { toast } from "../../helpers";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const forgotPassword = () => {
        const FormData = require("form-data");
        let data = new FormData();
        data.append("email", email);

        let config = {
            method: "post",
            url: "https://seashell-app-bbv6o.ondigitalocean.app/api/user/forgotpassword",
            data: data
        };

        axios
            .request(config)
            .then(response => {
                if (response.data == "OK") {
                    toast("success", "Email has been sent");
                } else {
                    toast("error", "Email khong ton tai");
                }
                console.log(JSON.stringify(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        function handleEnterKey(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent the default behavior of the Enter key in a form
                forgotPassword();
            }
        }
        // Attach the event listener when the component mounts
        document.getElementById("email").addEventListener("keydown", handleEnterKey);
        // Detach the event listener when the component unmounts
        return () => {
            document.getElementById("email").removeEventListener("keydown", handleEnterKey);
        };
    }, [email]); // Reattach the event listener if email changes
    return (
        <div className="register-body">
            <div className="container-register" id="container-id">
                <div className="form-container sign-in">
                    <form>
                        <h1>Forgot Password</h1>
                        <div style={{ width: "100%" }}>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <p>
                            Đã có tài khoản? <a href="/login">Đăng nhập tại đây </a>
                        </p>
                        <PrimaryButton id="forgotPassword-btn" onClick={forgotPassword}>
                            <span>Send</span>
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
