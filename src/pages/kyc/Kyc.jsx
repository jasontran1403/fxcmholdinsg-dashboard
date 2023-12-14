import Axios from "axios";
import copy from "clipboard-copy";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import { logout, toast } from "../../helpers";
import env from "../../helpers/env";
// import ".//dashboard.css";

const Kyc = () => {
    const navigate = useNavigate();
    const [username] = useState(config.AUTH.DRIVER.getItem("username"));
    const [refUrl, setRefUrl] = useState("");
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [image1Url, setImage1Url] = useState(null);
    const [image2Url, setImage2Url] = useState(null);
    const [image3Url, setImage3Url] = useState(null);
    const [image4Url, setImage4Url] = useState(null);

    const handleClick = e => {
        e.preventDefault();
        logout(navigate);
    };

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${env}/api/user/getKycImage/${username}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        };

        Axios.request(config)
            .then(response => {
                setImage1Url(response.data[0]);
                setImage2Url(response.data[1]);
                setImage3Url(response.data[2]);
                setImage4Url(response.data[3]);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleIDFrontSelected = e => {
        const selectedFile = e.target.files[0];
        setFile1(selectedFile);
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImage1Url(imageUrl);
        }
    };

    const handleIDBackSelected = e => {
        const selectedFile = e.target.files[0];
        setFile2(selectedFile);
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImage2Url(imageUrl);
        }
    };

    const handleCfFrontSelected = e => {
        const selectedFile = e.target.files[0];
        setFile3(selectedFile);
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImage3Url(imageUrl);
        }
    };

    const handleCfBackSelected = e => {
        const selectedFile = e.target.files[0];
        setFile4(selectedFile);
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImage4Url(imageUrl);
        }
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
        if (file1 === null || file2 === null || file3 === null || file4 === null) {
            toast("error", "Vui lòng chọn ảnh để hoàn tất KYC!");
            return;
        }
        let data = new FormData();
        console.log(file1);
        data.append("file1", file1);
        data.append("file2", file2);
        data.append("file3", file3);
        data.append("file4", file4);
        data.append("username", username);

        let config = {
            method: "post",
            url: `${env}/api/user/kyc`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            data: data
        };

        Axios(config)
            .then(response => {
                if (response.data === "ok") {
                    toast("success", "Upload ảnh KYC thành công!");
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
                    <a href="/profile">
                        <span className="material-icons-sharp">inventory</span>
                        <h3>Profile</h3>
                    </a>
                    <a href="/change-password">
                        <span className="material-icons-sharp">report_gmailerrorred</span>
                        <h3>Change password</h3>
                    </a>
                    <a href="/kyc" className="active">
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
                <h1>KYC tài khoản</h1>
                <div
                    className="analyse"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)"
                    }}
                >
                    <div className="sales">
                        <div
                            className="status"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                height: "300px"
                            }}
                        >
                            <div className="info" style={{ width: "100%", textAlign: "center" }}>
                                <h3>CCCD/CMND/Hộ chiếu</h3>
                            </div>
                            <div className="progresss" style={{ textAlign: "center" }}>
                                <img src={image1Url} />
                            </div>
                            <div className="progresss" style={{ textAlign: "center" }}>
                                <input
                                    type="file"
                                    onChange={e => {
                                        handleIDFrontSelected(e);
                                    }}
                                    accept="image/*"
                                    multiple
                                    capture="camera"
                                />
                            </div>
                            <div className="info" style={{ width: "100%", textAlign: "center" }}>
                                <h3>Mặt trước</h3>
                            </div>
                        </div>
                    </div>
                    <div className="sales">
                        <div
                            className="status"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                height: "300px"
                            }}
                        >
                            <div className="info" style={{ width: "100%", textAlign: "center" }}>
                                <h3>CCCD/CMND/Hộ chiếu</h3>
                            </div>
                            <div className="progresss" style={{ textAlign: "center" }}>
                                <img src={image2Url} />
                            </div>
                            <div className="progresss" style={{ textAlign: "center" }}>
                                <input
                                    type="file"
                                    onChange={e => {
                                        handleIDBackSelected(e);
                                    }}
                                    accept="image/*"
                                    multiple
                                    capture="camera"
                                />
                            </div>
                            <div className="info" style={{ width: "100%", textAlign: "center" }}>
                                <h3>Mặt sau</h3>
                            </div>
                        </div>
                    </div>
                    <div className="sales">
                        <div
                            className="status"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                height: "300px"
                            }}
                        >
                            <div className="info" style={{ width: "100%", textAlign: "center" }}>
                                <h3>Xác nhận tài khoản</h3>
                            </div>
                            <div className="progresss" style={{ textAlign: "center" }}>
                                <img src={image3Url} />
                            </div>
                            <div className="progresss" style={{ textAlign: "center" }}>
                                <input
                                    type="file"
                                    onChange={e => {
                                        handleCfFrontSelected(e);
                                    }}
                                    accept="image/*"
                                    multiple
                                    capture="camera"
                                />
                            </div>
                            <div className="info" style={{ width: "100%", textAlign: "center" }}>
                                <h3>Mặt trước</h3>
                            </div>
                        </div>
                    </div>
                    <div className="sales">
                        <div
                            className="status"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                height: "300px"
                            }}
                        >
                            <div className="info" style={{ width: "100%", textAlign: "center" }}>
                                <h3>Xác nhận tài khoản</h3>
                            </div>
                            <div className="progresss" style={{ textAlign: "center" }}>
                                <img src={image4Url} />
                            </div>
                            <div className="progresss" style={{ textAlign: "center" }}>
                                <input
                                    type="file"
                                    onChange={e => {
                                        handleCfBackSelected(e);
                                    }}
                                    accept="image/*"
                                    multiple
                                    capture="camera"
                                />
                            </div>
                            <div className="info" style={{ width: "100%", textAlign: "center" }}>
                                <h3>Mặt sau</h3>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-center col-span-1 mt-3"
                        style={{ width: "100%", textAlign: "center" }}
                    >
                        <div className="px-2 py-1 font-semibold text-black-300 bg-emerald-400 rounded">
                            <button className="place-items-center" onClick={handleSubmit}>
                                KYC
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Kyc;
