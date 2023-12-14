import Axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import { formatToCurrency, toast } from "../../helpers";
import { logout } from "../../helpers";
import env from "../../helpers/env";
// import ".//dashboard.css";

const Deposit = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const [image, setImage] = useState("");
    const [network, setNetwork] = useState("");
    const currentUsername = config.AUTH.DRIVER.getItem("username");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleClick = e => {
        e.preventDefault();
        logout(navigate);
    };

    console.log(loading);

    const handleCancel = transactionId => {
        let config = {
            method: "get",
            url: `${env}/api/cancel-deposit/${transactionId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        };

        Axios.request(config).then(response => {
            console.log(response);
            toast("success", "Huỷ lệnh nạp thành công!");
        });
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            let configCommissionHistory = {
                method: "get",
                url: `${env}/api/getTransaction/${currentUsername}/Deposit`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            };

            const fetchData = async () => {
                const response = await Axios(configCommissionHistory);
                response.data.forEach(item => {
                    if (item.status === false) {
                        setIsCreated(true);
                    }
                });
                setData(response.data);
            };

            fetchData();

            setLoading(false);
        }, 500);
    }, [currentUsername]);

    const handleSubmit = () => {
        if (amount === "" || network === "Vui lòng chọn mạng") {
            alert("Required input");
            return;
        } else if (parseFloat(amount) < 0) {
            alert("Input must be greater than 0");
            return;
        } else if (isNaN(amount)) {
            alert("Input must be a number");
            return;
        } else {
            window.Swal.fire({
                title: "Xác nhận thao tác nạp tiền?",
                text: "Vui lòng nạp đúng loại tiền mà bạn đã chọn!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(result => {
                if (result.isConfirmed) {
                    if (isCreated) {
                        toast(
                            "error",
                            "Đã có lệnh nạp trước đó, vui lòng huỷ hoặc nạp trước khi tạo lênh nạp mới!"
                        );
                    } else {
                        window.Swal.fire(
                            "Confirmed!",
                            "Your transaction has been created.",
                            "success"
                        );
                        let config = {
                            method: "get",
                            url: `${env}/api/generate-qr/${localStorage.getItem(
                                "username"
                            )}/${amount}`,
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("access_token")}`
                            },
                            responseType: "blob"
                        };

                        Axios.request(config)
                            .then(response => {
                                if (response.data === "") {
                                    toast(
                                        "error",
                                        "Đã có lệnh nạp trước đó, vui lòng huỷ hoặc nạp trước khi tạo lênh nạp mới!"
                                    );
                                } else {
                                    const imageUrl = URL.createObjectURL(response.data);
                                    setImage(imageUrl);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                }
            });
        }
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
                    <a href="/deposit" className="active">
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
                    <a onClick={handleClick}>
                        <span className="material-icons-sharp">logout</span>
                        <h3>Logout</h3>
                    </a>
                </div>
            </aside>

            <main>
                <h1>Nạp tiền</h1>
                <div className="buy-package">
                    <div className="col-span-1 md:col-span-3 lg:col-span-2 px-4 py-3 text-center">
                        {image ? (
                            <div className="flex justify-center col-span-1 mt-3">
                                <img
                                    src={image}
                                    alt="QR Code"
                                    style={{ width: "300px", height: "300px", textAlign: "center" }}
                                />
                            </div>
                        ) : (
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
                                        Network
                                    </p>
                                    <select
                                        className="select w-3/4 padding-none"
                                        onChange={e => {
                                            setNetwork(e.target.value);
                                        }}
                                    >
                                        <option>Vui lòng chọn mạng</option>
                                        <option>Binance Smart Chain</option>
                                        <option>TRON</option>
                                    </select>
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
                                        Số lượng
                                    </p>
                                    <input
                                        className="select w-3/4"
                                        type="number"
                                        min="0"
                                        onChange={e => {
                                            setAmount(e.target.value);
                                        }}
                                        style={{ width: "500px" }}
                                        placeholder="Số tiền nạp"
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
                                            Nạp
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="recent-orders">
                    <h2>Lịch sử nạp tiền</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Thời gian</th>
                                <th>Số lượng</th>
                                <th>Trạng thái</th>
                                <th>Hash</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {moment.unix(item.time).format("HH:mm:ss DD/MM/YYYY")}
                                        </td>
                                        <td>{formatToCurrency(item.amount)}</td>
                                        <td>
                                            {item.status === false ? (
                                                <button onClick={() => handleCancel(item.id)}>
                                                    (Cancel)
                                                </button>
                                            ) : (
                                                "success"
                                            )}
                                        </td>
                                        <td>
                                            <a
                                                href={`https://bscscan.com/tx/${item.hash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="font-light">{item.hash}</span>
                                            </a>
                                        </td>
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

export default Deposit;
