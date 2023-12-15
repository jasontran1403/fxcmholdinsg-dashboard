import Axios from "axios";
import copy from "clipboard-copy";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import { formatToCurrency } from "../../helpers";
import { logout } from "../../helpers";
import env from "../../helpers/env";
// import ".//dashboard.css";

const IBHistory = () => {
    const navigate = useNavigate();
    const currentUsername = config.AUTH.DRIVER.getItem("username");
    const [data, setData] = useState([]);
    const [username] = useState(config.AUTH.DRIVER.getItem("username"));
    const [refUrl, setRefUrl] = useState("");
    const [mobile, setMobile] = useState(false);

    const handleClickNav = () => {
        setMobile(!mobile);
    };

    const handleClick = e => {
        e.preventDefault();
        logout(navigate);
    };

    useEffect(() => {
        let configCommissionHistory = {
            method: "get",
            url: `${env}/api/history/commission/${currentUsername}`
        };

        const fetchData = async () => {
            const response = await Axios(configCommissionHistory);
            setData(response.data);
        };

        fetchData();
    }, []);

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
                    <a href="/ib-history" className="active">
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
                <h1>IB History</h1>

                <div className="recent-orders">
                    <h2>Lịch sử nhận IB</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Thời gian</th>
                                <th>Mã gói</th>
                                <th>Số tiền</th>
                                <th>Loại</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.code}</td>
                                        <td>{item.time}</td>
                                        <td>{item.frominvestment}</td>
                                        <td>{formatToCurrency(item.amount)}</td>
                                        <td>{item.type}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default IBHistory;
