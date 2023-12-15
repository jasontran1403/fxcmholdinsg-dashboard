import Axios from "axios";
import copy from "clipboard-copy";
import qs from "qs";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import { logout, toast } from "../../helpers";
import env from "../../helpers/env";
// import ".//dashboard.css";

const Profile = () => {
    const navigate = useNavigate();
    const [username] = useState(config.AUTH.DRIVER.getItem("username"));
    const [refUrl, setRefUrl] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [authen, setAuthen] = useState("");
    const [mobile, setMobile] = useState(false);

    const handleClickNav = () => {
        setMobile(!mobile);
    };

    const handleClick = e => {
        e.preventDefault();
        logout(navigate);
    };

    useEffect(() => {
        let config = {
            method: "get",
            url: `${env}/api/user/getRef/${username}`
        };

        Axios.request(config)
            .then(response => {
                setRefUrl(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    });

    const handleCopy = () => {
        const url = `https://dashboard.fxcmholdings.com/register/${refUrl}`;
        // Sử dụng clipboard-copy để đưa nội dung vào clipboard
        copy(url)
            .then(() => {
                alert("Đã sao chép thành công vào clipboard");
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSubmit = () => {
        if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
            toast("error", "Vui lòng nhập thông tin!");
            return;
        } else if (newPassword !== confirmPassword) {
            alert("error", "Mật khẩu mới và xác nhận mật khẩu không trùng nhau!");
            return;
        } else {
            let data = qs.stringify({
                username: username,
                currentPassword: currentPassword,
                authen: authen,
                newPassword: newPassword,
                confirmNewPassword: confirmPassword
            });
            let config = {
                method: "post",
                url: `${env}/api/user/changePassword`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            };

            window.Swal.fire({
                title: "Xác nhận thực hiện thao tác?",
                text: "Mật khẩu sẽ được thay đổi!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(result => {
                if (result.isConfirmed) {
                    Axios(config).then(response => {
                        if (response.data === "Change password success") {
                            toast("success", "Thay đổi mật khẩu thành công");
                        } else if (response.data === "2FA code is incorrect") {
                            toast("error", "Mã bảo mật 2FA không chính xác");
                        } else if (response.data === "Old password is incorrect") {
                            toast("error", "Mật khẩu cũ không chính xác");
                        }
                    });
                }
            });
        }
    };

    return (
        <div className="container">
            <aside className={mobile ? "mobile" : ""}>
                <div className="toggle-dashboard">
                    <div className="logo">
                        <h2>
                            FXCM
                            <span className="danger"> Holdings</span>
                        </h2>
                    </div>
                </div>

                <div className="sidebar">
                    <a href="/dashboard">
                        <span className="material-icons-sharp">dashboard</span>
                        <h3>Dashboard</h3>
                    </a>
                    <a href="/investment">
                        <span className="material-icons-sharp">person_outline</span>
                        <h3>Investment</h3>
                    </a>
                    <a href="/history">
                        <span className="material-icons-sharp">receipt_long</span>
                        <h3>IB History</h3>
                    </a>
                    <a href="/deposit">
                        <span className="material-icons-sharp">insights</span>
                        <h3>Deposit</h3>
                    </a>
                    <a href="/withdraw">
                        <span className="material-icons-sharp">mail_outline</span>
                        <h3>Withdraw</h3>
                    </a>
                    <a href="/treeview">
                        <span className="material-icons-sharp">mail_outline</span>
                        <h3>Hệ thống</h3>
                    </a>
                    <a href="/profile">
                        <span className="material-icons-sharp">inventory</span>
                        <h3>Profile</h3>
                    </a>
                    <a href="/change-password" className="active">
                        <span className="material-icons-sharp">report_gmailerrorred</span>
                        <h3>Change password</h3>
                    </a>
                    <a href="/kyc">
                        <span className="material-icons-sharp">settings</span>
                        <h3>KYC</h3>
                    </a>
                    <a href="/2fa">
                        <span className="material-icons-sharp">add</span>
                        <h3>2FA</h3>
                    </a>
                    <p
                        onClick={handleCopy}
                        style={{ textAlign: "center", marginTop: "20px", cursor: "pointer" }}
                    >
                        <span className="material-icons-sharp">swipe_left</span>
                        <h3>Reflink</h3>
                    </p>
                    <a onClick={handleClick}>
                        <span className="material-icons-sharp">logout</span>
                        <h3>Logout</h3>
                    </a>
                </div>
            </aside>

            <main>
                <div className="right-section" onClick={handleClickNav}>
                    <div className="nav">
                        <button id="menu-btn">
                            <span className="material-icons-sharp">menu</span>
                        </button>
                    </div>
                </div>
                <h1>Đổi mật khẩu</h1>
                <div className="buy-package">
                    <div className="col-span-1 md:col-span-3 lg:col-span-2 px-4 py-3 text-center">
                        <div className="px-4 py-3 bg-white border rounded-md shadow-xs">
                            <div
                                className="flex justify-between col-span-6 mt-3 min-w-min"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <p className="investment-text flex w-3/4 text-2xl font-light text-orange-500 transition-all duration-300">
                                    Mật khẩu cũ
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="password"
                                    value={currentPassword}
                                    onChange={e => {
                                        setCurrentPassword(e.target.value);
                                    }}
                                    placeholder="Mật khẩu cũ"
                                    style={{ width: "40%", textAlign: "left" }}
                                />
                            </div>

                            <div
                                className="flex justify-between col-span-6 mt-3 min-w-min"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <p className="investment-text flex w-3/4 text-2xl font-light text-orange-500 transition-all duration-300">
                                    Mật khẩu mới
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="password"
                                    value={newPassword}
                                    onChange={e => {
                                        setNewPassword(e.target.value);
                                    }}
                                    placeholder="Mật khẩu mới"
                                    style={{ width: "40%", textAlign: "left" }}
                                />
                            </div>

                            <div
                                className="flex justify-between col-span-6 mt-3 min-w-min"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <p className="investment-text flex w-3/4 text-2xl font-light text-orange-500 transition-all duration-300">
                                    Xác nhận mật khẩu
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={e => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                    placeholder="Xác nhận mật khẩu mới"
                                    style={{ width: "40%", textAlign: "left" }}
                                />
                            </div>

                            <div
                                className="flex justify-between col-span-6 mt-3 min-w-min"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <p className="investment-text flex w-3/4 text-2xl font-light text-orange-500 transition-all duration-300">
                                    Mã bảo mật 2FA
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="text"
                                    value={authen}
                                    onChange={e => {
                                        setAuthen(e.target.value);
                                    }}
                                    placeholder="Mã bảo mật 2FA"
                                    style={{ width: "40%", textAlign: "left" }}
                                />
                            </div>

                            <div
                                className="flex justify-center col-span-1 mt-3"
                                style={{ textAlign: "center" }}
                            >
                                <div className="px-2 py-1 font-semibold text-black-300 rounded">
                                    <button
                                        className="investment-btn type1 place-items-center"
                                        onClick={handleSubmit}
                                    >
                                        Đổi mật khẩu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
