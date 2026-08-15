import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import AddBank from "./pages/AddBank";
import BankDetails from "./pages/BankDetails";
import EditBank from "./pages/EditBank";
import Accounts from "./pages/Accounts";

import MainLayout from "./layouts/MainLayout";
import Banks from "./pages/Banks";
import AccountDetails from "./pages/AccountDetails";
import Transactions from "./pages/Transactions";
import Addresses from "./pages/Addresses";
import AddressDetails from "./pages/AddressDetails";
import EditAddress from "./pages/EditAddress";
import Dashboard from "./pages/Dashboard";
import AddAccount from "./pages/AddAccount";
import AdminProfile from "./pages/AdminProfile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
    path="/login"
    element={<Login />}
/>
 {/* Protected routes */}
        <Route element={<ProtectedRoute />}></Route>
                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />
                    <Route
    path="/admin/profile"
    element={<AdminProfile />}
/>
<Route
    path="/settings"
    element={<Settings />}
/>

                    <Route
                        path="/banks"
                        element={<Banks />}
                    />
                    <Route
                    path="/banks/add"
                    element={<AddBank/>}/>

                     <Route
                     path="/banks/:id"
                     element={<BankDetails />}
                    />
                    <Route
                   path="/banks/:id/edit"
                   element={<EditBank />}
                    />

                    <Route
                    path="/accounts"
                    element={<Accounts />}
                      />
                      <Route
                       path="/accounts/:id"
                      element={<AccountDetails />}
                       />
                       <Route
                        path="/transactions"
                       element={<Transactions />}
                         />
                         <Route
                        path="/addresses"
                        element={<Addresses />}
                          />

                          <Route
                     path="/addresses/:id"
                          element={<AddressDetails />}
                            />

                          <Route
                          path="/addresses/:id/edit"
                          element={<EditAddress />}
                            />

                            <Route
                            path="/accounts/add"
                            element={<AddAccount />}
                               />


                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;