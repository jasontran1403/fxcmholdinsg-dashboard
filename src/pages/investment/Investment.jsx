import Axios from "axios";
import copy from "clipboard-copy";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import { formatToCurrency, toast } from "../../helpers";
import { logout } from "../../helpers";
import env from "../../helpers/env";
// import ".//dashboard.css";

const Investment = () => {
    const navigate = useNavigate();
    const currentUsername = config.AUTH.DRIVER.getItem("username");
    const [username] = useState(config.AUTH.DRIVER.getItem("username"));
    const [refUrl, setRefUrl] = useState("");
    const [packs, setPacks] = useState([]);
    const [price, setPrice] = useState(0);
    const [profit, setProfit] = useState("0");
    const [times] = useState(["6 tháng", "12 tháng"]);
    const [currentTimeEnd, setCurrentTimeEnd] = useState("");
    const [cashBalance, setCashBalance] = useState(0);
    const [info, setInfo] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(loading);

    const handleClick = e => {
        e.preventDefault();
        logout(navigate);
    };

    useEffect(() => {
        let config = {
            method: "get",
            url: `${env}/api/packages`
        };

        Axios(config).then(response => {
            setPacks(response.data);
        });
    }, [currentUsername]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            let configCommissionHistory = {
                method: "get",
                url: `${env}/api/history/investment/${currentUsername}`
            };

            const fetchData = async () => {
                const response = await Axios(configCommissionHistory);
                setData(response.data);
            };

            fetchData();

            setLoading(false);
        }, 500);
    }, [currentUsername]);

    const handleSubmit = () => {
        if (
            info.packid === "" ||
            info.packid === "Vui lòng chọn gói" ||
            info.packid === undefined
        ) {
            toast("error", "You didnt choose any package");
            return;
        } else if (currentTimeEnd === "" || currentTimeEnd === "Vui lòng chọn thời gian") {
            toast("error", "You didnt choose any time");
            return;
        }

        let data = qs.stringify({
            packid: info.packid,
            username: info.username,
            timeEnd: currentTimeEnd
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${env}/api/package/buy`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data
        };

        window.Swal.fire({
            title: "Xác nhận mua gói?",
            text: "Bạn sẽ không thể huỷ nếu mua thành công!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                Axios(config).then(response => {
                    if (response.data === "Thất bại, số dư không đủ để mua gói này") {
                        toast("error", "Số dư không đủ để mua gói này");
                    } else {
                        toast("success", "Mua gói thành công!");
                    }
                });
            }
        });
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
        let configCashBalance = {
            method: "get",
            url: `${env}/api/cashWallet/balance/${currentUsername}`
        };

        Axios(configCashBalance).then(response => {
            setCashBalance(response.data.balance);
        });
    }, [currentUsername]);

    const handlePackageChoose = id => {
        if (id === "default") {
            setPrice(0);
            setProfit(0);
            setInfo({ packid: null, username: currentUsername });
            return;
        } else {
            setPrice(packs[id - 1].price);
            setProfit(packs[id - 1].daily.toFixed(3));
            setInfo({ packid: id, username: currentUsername });
        }
    };

    return (
        <body>
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
                        <a href="/investment" className="active">
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
                    <h1>Investment</h1>
                    <div className="buy-package">
                        <div className="col-span-1 md:col-span-3 lg:col-span-2 px-4 py-3 text-center">
                            <div
                                className="flex justify-between col-span-6 mt-3 min-w-min"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <p className="investment-text text-2xl font-light text-orange-500 transition-all duration-300">
                                    Tên gói
                                </p>
                                <select
                                    className="select rounded ml-2"
                                    name="packages"
                                    onChange={e => {
                                        handlePackageChoose(e.target.value);
                                    }}
                                >
                                    <option value="default" defaultValue>
                                        Vui lòng chọn gói
                                    </option>
                                    {packs.map((pack, index) => {
                                        return (
                                            <option key={index} value={pack.id}>
                                                {pack.name}
                                            </option>
                                        );
                                    })}
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
                                <p className="investment-text text-2xl font-light text-orange-500 transition-all duration-300">
                                    Thời gian gói
                                </p>
                                <select
                                    className="select rounded ml-2"
                                    name="times"
                                    onChange={e => {
                                        setCurrentTimeEnd(e.target.value);
                                    }}
                                >
                                    <option value="default" defaultValue>
                                        Vui lòng thời gian
                                    </option>
                                    {times.map((time, index) => {
                                        return (
                                            <option key={index} value={time}>
                                                {time}
                                            </option>
                                        );
                                    })}
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
                                <p className="investment-text text-2xl font-light text-orange-500 transition-all duration-300">
                                    Giá gói
                                </p>
                                <p className="investment-text blue-text text-2xl font-light text-orange-500 transition-all duration-300">
                                    {formatToCurrency(price)}
                                </p>
                            </div>

                            <div
                                className="flex justify-between col-span-6 mt-3 min-w-min"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <p className="investment-text text-2xl font-light text-orange-500 transition-all duration-300">
                                    Lãi hàng tháng
                                </p>
                                <p className="investment-text blue-text text-2xl font-light text-orange-500 transition-all duration-300">
                                    {profit}%
                                </p>
                            </div>

                            <div
                                className="flex justify-between col-span-6 mt-3 min-w-min"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <p className="investment-text text-2xl font-light text-orange-500 transition-all duration-300">
                                    Số dư tài khoản
                                </p>
                                <p className="investment-text text-2xl blue-text font-light text-orange-500 transition-all duration-300">
                                    {formatToCurrency(cashBalance)}
                                </p>
                            </div>

                            <div
                                className="flex justify-center col-span-1 mt-3"
                                style={{ textAlign: "center" }}
                            >
                                <button
                                    className="btn place-items-center investment-btn type1"
                                    onClick={handleSubmit}
                                >
                                    Mua gói
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="recent-orders">
                        <h2>Lịch sử</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#ID</th>
                                    <th>Thời gian</th>
                                    <th>Mã gói</th>
                                    <th>Giá</th>
                                    <th>Lần nhận IB</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.time}</td>
                                            <td>{item.code}</td>
                                            <td>{formatToCurrency(item.capital)}</td>
                                            <td>
                                                {item.timeEnd === "6 tháng"
                                                    ? `${item.count}/6`
                                                    : `${item.count}/12`}
                                            </td>
                                            <td
                                                className={
                                                    (item.count < 6 &&
                                                        item.timeEnd === "6 tháng") ||
                                                    (item.count < 12 && item.timeEnd === "12 tháng")
                                                        ? "success"
                                                        : "danger"
                                                }
                                            >
                                                {(item.count < 6 && item.timeEnd === "6 tháng") ||
                                                (item.count < 12 && item.timeEnd === "12 tháng")
                                                    ? "Đang chạy"
                                                    : "Đã hoàn tất"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </body>
    );
};

export default Investment;
