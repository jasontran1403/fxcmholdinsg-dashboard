import { Menu, Transition } from "@headlessui/react";
import Axios from "axios";
import copy from "clipboard-copy";
import { addMonths, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import { formatToCurrency } from "../../helpers";
import { logout } from "../../helpers";
import env from "../../helpers/env";
import ".//dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const currentUsername = config.AUTH.DRIVER.getItem("username");
    const [username] = useState(config.AUTH.DRIVER.getItem("username"));
    const [refUrl, setRefUrl] = useState("");
    const [cashBalance, setCashBalance] = useState("");
    const [commissionBalance, setCommissionBalance] = useState("");
    const [personalSale, setPersonalSale] = useState(0);
    const [investments, setInvestments] = useState([]);
    const [expenses, setExpenses] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(loading);

    const packageName = [
        {
            name: "1.000$"
        },
        {
            name: "2.000$"
        },
        {
            name: "3.000$"
        },
        {
            name: "4.000$"
        },
        {
            name: "5.000$"
        },
        {
            name: "6.000$"
        },
        {
            name: "7.000$"
        },
        {
            name: "8.000$"
        },
        {
            name: "9.000$"
        },
        {
            name: "10.000$"
        }
    ];

    const countDateEnd = (date, timeEnd) => {
        const newdate = `${date.substring(15, date.length)}-${date.substring(
            12,
            14
        )}-${date.substring(9, 11)}`;
        const someDate = new Date(newdate);

        // Sử dụng thư viện date-fns để thêm tháng
        const endDate = timeEnd === "6 tháng" ? addMonths(someDate, 6) : addMonths(someDate, 12);

        // Format ngày theo định dạng bạn mong muốn
        const dateFormatted = format(endDate, "dd/MM/yyyy");

        return dateFormatted;
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
            method: "get",
            url: `${env}/api/history/runningInvestment/${currentUsername}`
        };

        Axios(config).then(response => {
            setInvestments(response.data);
            if (response.data.length > 0) {
                const numberToCal = response.data[0].timeEnd === "6 tháng" ? 6 : 12;
                setExpenses({
                    investmentName: response.data[0].packageId,
                    investmentCode: response.data[0].code,
                    startAt: response.data[0].time.substring(9, response.data[0].time.length),
                    endAt: countDateEnd(response.data[0].time, response.data[0].timeEnd),
                    percentage: Math.floor((response.data[0].count / numberToCal) * 100),
                    claimable: response.data[0].claimable
                });
            } else {
                setExpenses({});
            }
        });
    }, [currentUsername]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            let configGetInfo = {
                method: "get",
                maxBodyLength: Infinity,
                url: `${env}/api/user/${currentUsername}`
            };

            Axios(configGetInfo).then(response => {
                setCashBalance(response.data.cashbalance);
                setCommissionBalance(response.data.commissionbalance);
                setPersonalSale(response.data.user.sales);
            });

            let configCommissionHistory = {
                method: "get",
                url: `${env}/api/history/commissionForDashboard/${currentUsername}`
            };

            const fetchData = async () => {
                const response = await Axios(configCommissionHistory);
                setData(response.data);
            };

            fetchData();

            setLoading(false);
        }, 500);
    }, [currentUsername]);

    console.log(investments);

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
                    <a href="/dashboard" className="active">
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
                    <a href="/2fa">
                        <span className="material-icons-sharp">add</span>
                        <h3>2FA</h3>
                    </a>
                    <p
                        onClick={handleCopy}
                        style={{ textAlign: "center", marginTop: "20px", cursor: "pointer" }}
                    >
                        <span className="material-icons-sharp">swipe_left</span>
                        <h3>Reflinl</h3>
                    </p>
                    <a onClick={handleClick}>
                        <span className="material-icons-sharp">logout</span>
                        <h3>Logout</h3>
                    </a>
                </div>
            </aside>

            <main>
                <h1>Dashboard</h1>
                <div className="analyse">
                    <div className="sales">
                        <div className="status">
                            <div className="info">
                                <h3>Số dư</h3>
                                <h1>{formatToCurrency(cashBalance)}</h1>
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
                                <h3>Số dư IB</h3>
                                <h1>{formatToCurrency(commissionBalance)}</h1>
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
                                <h3>Tổng doanh số</h3>
                                <h1>{formatToCurrency(personalSale)}</h1>
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

                <div className="analyse-invest">
                    <div className="investments">
                        <div className="status">
                            <div className="flex justify-center">
                                <Menu>
                                    <div className="relative">
                                        {investments.length > 0 ? (
                                            <>
                                                <Menu.Button className="flex items-center justify-center w-12 h-12 text-2xl text-gray-400">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-6 h-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 6h16M4 12h16M4 18h16"
                                                        />
                                                    </svg>
                                                </Menu.Button>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        <Transition>
                                            <Menu.Items
                                                style={{ display: "flex", flexDirection: "column" }}
                                                className="d-flex z-10 mr-3.5 top-0 mt-9 py-1.5 right-0 text-xs text-gray-700 bg-white border rounded-md w-40"
                                            >
                                                {investments.map((investment, index) => {
                                                    const number =
                                                        investment.timeEnd === "6 tháng" ? 6 : 12;
                                                    return (
                                                        <Menu.Item key={index}>
                                                            <a
                                                                className="d-flex w-full px-5 py-2 hover:bg-gray-100 hover:text-blue-500"
                                                                onClick={() => {
                                                                    setExpenses({
                                                                        investmentName:
                                                                            investment.packageId,
                                                                        investmentCode:
                                                                            investment.code,
                                                                        startAt:
                                                                            investment.time.substring(
                                                                                9,
                                                                                investment.time
                                                                                    .length
                                                                            ),
                                                                        endAt: countDateEnd(
                                                                            investment.time,
                                                                            investment.timeEnd
                                                                        ),
                                                                        percentage: Math.floor(
                                                                            (investment.count /
                                                                                number) *
                                                                                100
                                                                        ),
                                                                        claimable:
                                                                            investment.claimable
                                                                    });
                                                                }}
                                                            >
                                                                Gói {investment.packageId}
                                                            </a>
                                                        </Menu.Item>
                                                    );
                                                })}
                                            </Menu.Items>
                                        </Transition>
                                    </div>
                                </Menu>
                            </div>

                            {investments.length > 0 ? (
                                <>
                                    <div className="flex flex-col items-center justify-between">
                                        <p className="text-4xl">
                                            Gói {packageName[expenses.investmentName - 1].name}
                                        </p>
                                    </div>

                                    <div className="flex justify-between col-span-1 mt-3">
                                        <p className="text-2xl font-light text-orange-500 transition-all duration-300">
                                            Ngày bắt đầu: {expenses.startAt}
                                        </p>

                                        <p className="text-2xl font-light text-orange-500 transition-all duration-300">
                                            Ngày kết thúc: {expenses.endAt}
                                        </p>
                                    </div>

                                    <div className="flex items-center mt-5 space-x-5">
                                        <div className="w-full px-2 py-1 bg-gray-200 rounded-full">
                                            <div
                                                className="transition-all duration-300 flex items-center justify-end h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-900"
                                                style={{ width: `${expenses.percentage}%` }}
                                            >
                                                <div className="w-2 h-2 mr-1 bg-white rounded-full" />
                                            </div>
                                        </div>

                                        <p className="font-medium text-orange-500">
                                            {expenses.percentage}%
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex mt-24 justify-center">
                                        <p className="text-4xl font-light text-orange-500 justifty-center transition-all duration-300">
                                            Chưa mua gói
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="recent-orders">
                    <h2>Các khoản IB mới nhất</h2>
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
                    <a href="/history">Show All</a>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
