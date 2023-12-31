import Axios from "axios";
import copy from "clipboard-copy";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import { logout, toast } from "../../helpers";
import env from "../../helpers/env";
// import ".//dashboard.css";

const Profile = () => {
    const navigate = useNavigate();
    const [username] = useState(config.AUTH.DRIVER.getItem("username"));
    const [refUrl, setRefUrl] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [identity, setIdentity] = useState("");
    const [contact, setContact] = useState("");
    const [fullname, setFullname] = useState("");
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
                setContact(response.data.contact);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    let regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmit = () => {
        if (email === "") {
            toast("error", "Vui lòng nhập địa chỉ email!");
            return;
        } else if (!regEmail.test(email)) {
            toast("error", "Email không đúng định dạng!");
            return;
        }
        let data = JSON.stringify({
            username: username,
            email: email,
            phone: phone,
            identity: identity,
            contact: contact,
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
                } else if (response.data === "This email existed!") {
                    toast("error", `Email ${email} đã tồn tại!`);
                } else if (response.data === "This username is not existed!") {
                    console.log(`${username} error`);
                }
            })
            .catch(error => {
                console.log(error);
            });
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
                                    Địa chỉ liên hệ
                                </p>
                                <input
                                    className="select w-3/4"
                                    type="text"
                                    value={contact}
                                    onChange={e => {
                                        setContact(e.target.value);
                                    }}
                                    placeholder="Địa chỉ liên hệ"
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
