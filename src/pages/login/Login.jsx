import Axios from "axios";
import qs from "qs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryButton } from "../../components/buttons";
import { Input } from "../../components/field";
import config from "../../config";
import { toast } from "../../helpers";
import env from "../../helpers/env";
import ".//login.css";

const Login = () => {
    const navigate = useNavigate();
    const defaultMessage = {
        username: [],
        password: [],
        faCode: []
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [faCode, setFaCode] = useState("");

    const login = () => {
        setLoading(true);
        setTimeout(() => {
            const newErrorMessage = defaultMessage;
            if (!username) {
                newErrorMessage.username = ["Vui lòng nhập username"];
            }
            if (!password) {
                newErrorMessage.password = ["Vui lòng nhập mật khẩu"];
            }

            let dataToken = qs.stringify({
                username: username,
                password: password
            });
            let configLogin = {
                method: "post",
                url: `${env}/api/login`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: dataToken
            };

            let data = JSON.stringify({
                username: username,
                password: password,
                authen: faCode
            });

            let configIsActivated = {
                method: "post",
                url: `${env}/api/user/validation`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: data
            };

            Axios(configIsActivated).then(response => {
                if (response.data === "Not Actived") {
                    toast("error", "Tài khoản chưa được kích hoạt!");
                } else if (response.data === "Wrong 2FA") {
                    toast("error", "Mã bảo mật 2FA không chính xác");
                } else if (
                    response.data === "Username is not exist" ||
                    response.data === "Password is not correct"
                ) {
                    toast("error", "Tài khoản không hợp lệ");
                } else {
                    Axios(configLogin).then(response => {
                        // setInvalid(true);
                        config.AUTH.DRIVER.setItem("user", {
                            permissions: ["dashboard"]
                        });
                        config.AUTH.DRIVER.setItem("username", username);
                        config.AUTH.DRIVER.setItem("access_token", response.data.access_token);
                        console.log(response.data.access_token);
                        toast("success", "Đăng nhập thành công!");
                        navigate("/dashboard");
                    });
                }
            });

            setErrorMessage(newErrorMessage);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="register-body">
            <div className="container-register" id="container-id">
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <input type="text" />
                        <input type="text" />
                        <input type="password" />
                        <input type="password" />
                        <input type="text" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <div style={{ width: "100%" }}>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                error={errorMessage.username}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                error={errorMessage.password}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <Input
                                id="faCode"
                                type="text"
                                placeholder="Enter faCode"
                                value={faCode}
                                onChange={e => setFaCode(e.target.value)}
                                error={errorMessage.faCode}
                            />
                        </div>
                        <a href="/forgot-word">Quên mật khẩu?</a>
                        <span>
                            Chưa có tài khoản?
                            <a href="/register">Đăng ký tại đây</a>
                        </span>
                        <PrimaryButton onClick={login} disabled={loading}>
                            <span>Signin</span>
                        </PrimaryButton>
                    </form>
                </div>
                {/* <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" onClick={toggleSignIn}>
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" onClick={toggleSignUp}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
