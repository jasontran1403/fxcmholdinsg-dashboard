import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import { logout, toast } from "../../helpers";
import env from "../../helpers/env";
// import ".//dashboard.css";

const Profile = () => {
    const navigate = useNavigate();
    const [username] = useState(config.AUTH.DRIVER.getItem("username"));
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [identity, setIdentity] = useState("");
    const [address, setAddress] = useState("");
    const [fullname, setFullname] = useState("");

    const handleClick = e => {
        e.preventDefault();
        logout(navigate);
    };

    useEffect(() => {
        let config = {
            method: "GET",
            url: `${env}/api/user/getInfo/${username}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        };

        Axios(config)
            .then(response => {
                setFullname(response.data.fullname);
                setPhone(response.data.phone);
                setIdentity(response.data.identity);
                setEmail(response.data.email);
                setAddress(response.data.address);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = () => {
        let data = JSON.stringify({
            username: username,
            email: email,
            phone: phone,
            identity: identity,
            address: address,
            fullname: fullname
        });

        let config = {
            method: "POST",
            url: `${env}/api/user/update`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json"
            },
            data: data
        };

        Axios(config)
            .then(response => {
                if (response.data === "ok") {
                    toast("success", "Cập nhật thông tin thành công!");
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="container">
            <aside>
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
                    <a href="/profile" className="active">
                        <span className="material-icons-sharp">inventory</span>
                        <h3>Profile</h3>
                    </a>
                    <a href="/change-password">
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
                    <a onClick={handleClick}>
                        <span className="material-icons-sharp">logout</span>
                        <h3>Logout</h3>
                    </a>
                </div>
            </aside>

            <main>
                <h1>Profile</h1>
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
                                    Tên đăng nhập
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="text"
                                    value={username}
                                    disabled={true}
                                    style={{ width: "500px" }}
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
                                    Họ và tên
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="text"
                                    value={fullname}
                                    onChange={e => {
                                        setFullname(e.target.value);
                                    }}
                                    placeholder="Họ và tên"
                                    style={{ width: "500px" }}
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
                                    Địa chỉ email
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="email"
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="Địa chỉ email"
                                    style={{ width: "500px" }}
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
                                    Số điện thoại
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="text"
                                    value={phone}
                                    onChange={e => {
                                        setPhone(e.target.value);
                                    }}
                                    placeholder="Số điện thoại"
                                    style={{ width: "500px" }}
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
                                    Số CCCD/CMND
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="text"
                                    value={identity}
                                    onChange={e => {
                                        setIdentity(e.target.value);
                                    }}
                                    placeholder="Số CCCD/CMND"
                                    style={{ width: "500px" }}
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
                                    Địa chỉ liên hệ
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="email"
                                    value={address}
                                    onChange={e => {
                                        setAddress(e.target.value);
                                    }}
                                    placeholder="Địa chỉ liên hệ"
                                    style={{ width: "500px" }}
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
                                        Cập nhật
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
