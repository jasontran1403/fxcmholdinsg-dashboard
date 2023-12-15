import Axios from "axios";
import copy from "clipboard-copy";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
// import { formatToCurrency } from "../../helpers";
import { logout } from "../../helpers";
import env from "../../helpers/env";
import ".//treeview.css";

const Treeview = () => {
    const navigate = useNavigate();
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
                    <a href="/treeview" className="active">
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
                <h1>Treeview</h1>
                <div className="analyse">
                    <div className="sales">
                        <div className="status">
                            <div className="info">
                                <h3>Total Sales</h3>
                                <h1>$65,024</h1>
                            </div>
                            <div className="progresss">
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className="percentage">
                                    <p>+81%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="visits">
                        <div className="status">
                            <div className="info">
                                <h3>Site Visit</h3>
                                <h1>24,981</h1>
                            </div>
                            <div className="progresss">
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className="percentage">
                                    <p>-48%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="searches">
                        <div className="status">
                            <div className="info">
                                <h3>Searches</h3>
                                <h1>14,147</h1>
                            </div>
                            <div className="progresss">
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className="percentage">
                                    <p>+21%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="recent-orders">
                    <h2>Recent Orders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Course Number</th>
                                <th>Payment</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CSS Full Course</td>
                                <td>97245</td>
                                <td>Refunded</td>
                                <td className="danger">Declined</td>
                            </tr>
                            <tr>
                                <td>CSS Full Course</td>
                                <td>97245</td>
                                <td>Refunded</td>
                                <td className="danger">Declined</td>
                            </tr>
                            <tr>
                                <td>CSS Full Course</td>
                                <td>97245</td>
                                <td>Refunded</td>
                                <td className="danger">Declined</td>
                            </tr>
                            <tr>
                                <td>CSS Full Course</td>
                                <td>97245</td>
                                <td>Refunded</td>
                                <td className="danger">Declined</td>
                            </tr>
                            <tr>
                                <td>CSS Full Course</td>
                                <td>97245</td>
                                <td>Refunded</td>
                                <td className="danger">Declined</td>
                            </tr>
                        </tbody>
                    </table>
                    <a href="#">Show All</a>
                </div>
            </main>
        </div>
    );
};

export default Treeview;
