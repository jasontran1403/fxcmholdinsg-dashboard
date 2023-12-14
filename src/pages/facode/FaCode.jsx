import Axios from "axios";
import copy from "clipboard-copy";
import qs from "qs";
import React, { useState, useEffect } from "react";
import { BiCopy } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import { toast, logout } from "../../helpers";
import env from "../../helpers/env";
// import ".//dashboard.css";

const FaCode = () => {
    const navigate = useNavigate();
    const currentUsername = config.AUTH.DRIVER.getItem("username");
    const [username] = useState(config.AUTH.DRIVER.getItem("username"));
    const [refUrl, setRefUrl] = useState("");
    const [secretPhrase, setSecretPhrase] = useState("");
    const [qrImg, setQrImg] = useState("");
    const [authenCode, setAuthenCode] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
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

    const handleCopyUrl = () => {
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
            url: `${env}/api/authentication/showQR/${currentUsername}`
        };

        Axios(config).then(response => {
            setIsEnabled(response.data[0]);
            setSecretPhrase(response.data[1]);
            setQrImg(response.data[2]);
        });
    }, []);

    const handleEnabled = () => {
        let data = qs.stringify({
            username: currentUsername,
            code: authenCode
        });
        let config = {
            method: "post",
            url: `${env}/api/authentication/enabled`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "ngrok-skip-browser-warning": "69420"
            },
            data: data
        };

        window.Swal.fire({
            title: "Xác nhận thực hiện thao tác?",
            text: "Bạn muốn kích hoạt mã bảo mật 2FA!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                Axios(config).then(response => {
                    if (response.data === "Enabled Success") {
                        toast("success", "Cài đặt mã bảo mật 2FA thành công");
                    } else {
                        toast("error", "Thất bại, mã bảo mật 2FA không chính xác");
                    }
                });
            }
        });
    };

    const handleDisabled = () => {
        let data = qs.stringify({
            username: currentUsername,
            code: authenCode
        });
        let config = {
            method: "post",
            url: `${env}/api/authentication/disabled`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data
        };

        window.Swal.fire({
            title: "Xác nhận thực hiện thao tác?",
            text: "Bạn muốn huỷ cài đặt mã bảo mật 2FA!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                Axios(config).then(response => {
                    if (response.data === "Disabled Success") {
                        toast("success", "Huỷ cài đặt mã bảo mật 2FA thành công");
                    } else {
                        toast("error", "Thất bại, mã bảo mật 2FA không chính xác");
                    }
                });
            }
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(secretPhrase).then(function () {
            alert("Copied to clipboard");
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
                    <a href="/profile">
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
                    <a href="/facode" className="active">
                        <span className="material-icons-sharp">add</span>
                        <h3>2FA</h3>
                    </a>
                    <p
                        onClick={handleCopyUrl}
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
                <h1>Mã bảo mật 2FA</h1>
                <div className="buy-package" style={{ textAlign: "center" }}>
                    <div className="fa">
                        {isEnabled === "true" ? (
                            <>
                                <div className="flex justify-center col-span-6 mt-3 min-w-min">
                                    <p className="flex text-2xl font-light text-orange-500 transition-all duration-300">
                                        Mã bảo mật 2FA:
                                        <input
                                            className="select"
                                            type="text"
                                            value={authenCode}
                                            onChange={e => {
                                                setAuthenCode(e.target.value);
                                            }}
                                            placeholder="Nhập 6 ký tự mã bảo mật 2FA"
                                        />
                                    </p>
                                </div>

                                <div className="flex justify-center col-span-1 mt-3">
                                    <div className="px-2 py-1 font-semibold text-black-300 bg-emerald-400 rounded">
                                        <button
                                            className="place-items-center"
                                            onClick={handleDisabled}
                                        >
                                            Huỷ cài đặt
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-center col-span-6 mt-3 min-w-min">
                                    <img src={qrImg} style={{ width: "300px", height: "300px" }} />
                                </div>

                                <p className="flex justify-center text-m font-light text-orange-500 transition-all duration-300">
                                    Secret Phrase: {secretPhrase}
                                    <BiCopy
                                        style={{
                                            color: "red",
                                            cursor: "pointer",
                                            marginLeft: "5px",
                                            marginTop: "3px"
                                        }}
                                        onClick={handleCopy}
                                    />
                                </p>

                                <div className="flex justify-center col-span-6 mt-3 min-w-min">
                                    <p className="flex text-2xl font-light text-orange-500 transition-all duration-300">
                                        Mã bảo mật 2FA:
                                        <input
                                            type="text"
                                            value={authenCode}
                                            onChange={e => {
                                                setAuthenCode(e.target.value);
                                            }}
                                            placeholder="Nhập 6 ký tự mã 2FA"
                                        />
                                    </p>
                                </div>

                                <div className="flex justify-center col-span-1 mt-3">
                                    <div className="px-2 py-1 font-semibold text-black-300 bg-emerald-400 rounded">
                                        <button
                                            className="place-items-center"
                                            onClick={handleEnabled}
                                        >
                                            Kích hoạt
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FaCode;
