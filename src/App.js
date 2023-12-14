import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Auth, Guest } from "./middlewares";
import ChangePassword from "./pages/changepassword/ChangePassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Deposit from "./pages/deposit/Deposit";
import FaCode from "./pages/facode/FaCode";
import IBHistory from "./pages/ibhistory/IBHistory";
import Investment from "./pages/investment/Investment";
import Kyc from "./pages/kyc/Kyc";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Treeview from "./pages/treeview/Treeview";
import Withdraw from "./pages/withdraw/Withdraw";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Auth>
                            <Dashboard />
                        </Auth>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Guest>
                            <Login />
                        </Guest>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Guest>
                            <Register />
                        </Guest>
                    }
                />
                <Route
                    path="/register/:uuid"
                    element={
                        <Guest>
                            <Register />
                        </Guest>
                    }
                />
                <Route
                    path="/investment"
                    element={
                        <Auth>
                            <Investment />
                        </Auth>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <Auth>
                            <IBHistory />
                        </Auth>
                    }
                />
                <Route
                    path="/deposit"
                    element={
                        <Auth>
                            <Deposit />
                        </Auth>
                    }
                />
                <Route
                    path="/withdraw"
                    element={
                        <Auth>
                            <Withdraw />
                        </Auth>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Auth>
                            <Profile />
                        </Auth>
                    }
                />
                <Route
                    path="/change-password"
                    element={
                        <Auth>
                            <ChangePassword />
                        </Auth>
                    }
                />
                <Route
                    path="/kyc"
                    element={
                        <Auth>
                            <Kyc />
                        </Auth>
                    }
                />
                <Route
                    path="/treeview"
                    element={
                        <Auth>
                            <Treeview />
                        </Auth>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <Auth>
                            <Dashboard />
                        </Auth>
                    }
                />
                <Route
                    path="/2fa"
                    element={
                        <Auth>
                            <FaCode />
                        </Auth>
                    }
                />
                <Route path="/*" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
