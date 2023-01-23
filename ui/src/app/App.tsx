import { Route, Routes } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { Box } from "@mui/material";
import Home from "../pages/Home";
import CoachListPage from "../pages/CoachListPage";
import CoachDetailPage from "../pages/CoachDetailPage";
import ClientDetailPage from "../pages/ClientDetailPage";
import CreateUserPage from "../pages/CreateUserPage";
import LoginPage from "../pages/LoginPage";
import InvestmentDetailPage from "../pages/InvestmentDetailPage";
import OrganisationTablePage from "../pages/OrganisationTablePage";
import OrganisationDetailsPage from "../pages/OrganisationDetailsPage";
import CreateOrganisationPage from "../pages/CreateOrganisationPage";

const App = () => (
  <div className="App">
    <AppHeader />
    <Box sx={{ margin: 2 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/public" element={<div>Public</div>} />
        <Route path="/organisations" element={<OrganisationTablePage />} />
        <Route path="/organisations/:organisationId" element={<OrganisationDetailsPage />} />
        <Route path="/coaches" element={<CoachListPage />} />
        <Route path="/coaches/:coachId" element={<CoachDetailPage />} />
        <Route path="/clients/:clientId" element={<ClientDetailPage />} />
        <Route
          path="/clients/:clientId/investments/:investmentId"
          element={<InvestmentDetailPage />}
        />
        <Route path="/user/create" element={<CreateUserPage />} />
        <Route path="/organisation/create" element={<CreateOrganisationPage />} />
      </Routes>
    </Box>
  </div>
);

export default App;
