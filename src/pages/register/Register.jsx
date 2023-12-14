import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryButton } from "../../components/buttons";
import { Input } from "../../components/field";
import { toast } from "../../helpers";
import env from "../../helpers/env";
import ".//register.css";

const Register = () => {
    const navigate = useNavigate();
    const [alreadyRegis] = useState(false);

    const defaultMessage = {
        username: [],
        password: [],
        email: [],
        refferal: []
    };

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [refferal, setRefferal] = useState("");

    let regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let dataforRegis = JSON.stringify({
        name: "",
        username: username.toLocaleLowerCase(),
        password: password,
        email: email.toLocaleLowerCase(),
        rootUsername: refferal.toLocaleLowerCase(),
        address: "",
        phoneNumber: ""
    });

    let configRegis = {
        method: "post",
        url: `${env}/api/user/regis`,
        headers: {
            "Content-Type": "application/json"
        },
        data: dataforRegis
    };

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            const newErrorMessage = defaultMessage;
            if (email === "" || password === "" || username === "" || refferal === "") {
                toast("error", "Vui lòng nhập đủ thông tin!");
                return;
            } else if (!regEmail.test(email)) {
                toast("error", "Email không đúng định dạng!");
                return;
            }

            if (alreadyRegis) {
                toast("error", "This placement already registered");
            }

            if (email && username && password && refferal && alreadyRegis == false) {
                Axios(configRegis)
                    .then(response => {
                        let message = response.data;
                        if (message.includes("username")) {
                            toast("error", "Tên đang nhập đã tồn tại");
                            newErrorMessage.username = ["Tên đăng nhập đã tồn tại"];
                        } else if (message.includes("email")) {
                            toast("error", "Địa chỉ email đã tồn tại");
                            newErrorMessage.email = ["Địa chỉ email đã tồn tại"];
                        } else if (message.includes("sponsor")) {
                            toast("error", "Username người giới thiệu không tồn tại");
                            newErrorMessage.refferal = ["Username người giới thiệu không tồn tại"];
                        } else {
                            toast("success", "Đăng ký tài khoản thành công!");
                            navigate("/login");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                setLoading(false);
            }
        }, 500);
    };

    return (
        <div className="register-body">
            <div className="container-register" id="container-id">
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign Up</h1>
                        <div style={{ width: "100%" }}>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <Input
                                id="refferal"
                                type="text"
                                placeholder="Enter refferal"
                                value={refferal}
                                onChange={e => setRefferal(e.target.value)}
                            />
                        </div>
                        <p>
                            Đã có tài khoản? <a href="/login">Đăng nhập tại đây </a>
                        </p>
                        <PrimaryButton onClick={register} disabled={loading}>
                            <span>Sign up</span>
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
