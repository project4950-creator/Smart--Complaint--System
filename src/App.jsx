import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import CitizenLogin from "./component/CitizenLogin";
import ManagerLogin from "./component/ManagerLogin";
import ContractorLogin from "./component/ContractorLogin";
import KarmchariLogin from "./component/KarmchariLogin";
import SignUp from "./component/SignUppage";
import ForgotPassword from "./component/ForgotPassword";
import SubmitComplaint from "./component/SubmitComplaint";
import CitizenDashboard from "./component/CitizenDashboard";
import ManagerDashboard from "./component/ManagerDashboard";
import ContractorDashboard from "./component/ContractorDashboard";
import KarmchariDashboard from "./component/KarmchariDashboard";
import ContractorValidationDashboard from "./component/ContractorValidationDashboard";
import Footer from "./component/Footer";


function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<CitizenLogin />} />   {/* ✅ ADD */}
  <Route path="/citizen-login" element={<CitizenLogin />} />
  <Route path="/manager-login" element={<ManagerLogin />} />
  <Route path="/contractor-login" element={<ContractorLogin />} />
  <Route path="/karmchari-login" element={<KarmchariLogin />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/submit-complaint" element={<SubmitComplaint />} />
  <Route path="/forgot" element={<ForgotPassword />} />

  {/* ✅ DASHBOARD */}
        <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/contractor-dashboard" element={<ContractorDashboard />} />
        <Route path="/karmachari-dashboard" element={<KarmchariDashboard />} />
        <Route path="/contractor-validation"element={<ContractorValidationDashboard />}/>

</Routes>
<div>
  <Footer/>
</div>
    </BrowserRouter>
  );
}

export default App;
