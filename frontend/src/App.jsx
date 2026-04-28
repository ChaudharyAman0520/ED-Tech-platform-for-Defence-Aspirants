import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Admin from "./pages/admin/Admin";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AspirantLayout from "./pages/aspirant/AspirantLayout";

// Aspirant Pages
import Dashboard from "./pages/aspirant/Dashboard";
import StudyMaterials from "./pages/aspirant/StudyMaterials";
import AvailableTests from "./pages/aspirant/AvailableTests";
import TakeTest from "./pages/aspirant/TakeTest";
import MyResults from "./pages/aspirant/MyResults";
import SSBPrep from "./pages/aspirant/SSBPrep";
import PYQSection from "./pages/aspirant/PYQSection";
import Missions from "./pages/aspirant/Missions";
//static
import StudyHub from "./pages/public/StudyHub";
import SSBGuide from "./pages/public/SSBGuide";
import WarChronicles from "./pages/public/WarChronicles";
import HallOfHeroes from "./pages/public/HallOfHeroes";
import EliteForces from "./pages/public/EliteForces";
import DefenceIntel from "./pages/public/DefenceIntel";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/study-hub" element={<StudyHub />} />
        <Route path="/ssb-guide" element={<SSBGuide />} />
        <Route path="/war-chronicles" element={<WarChronicles />} />
        <Route path="/hall-of-heroes" element={<HallOfHeroes />} />
        <Route path="/elite-forces" element={<EliteForces />} />
        <Route path="/defence-intel" element={<DefenceIntel />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Aspirant Routes - Wrapped with AspirantLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roleRequired="ASPIRANT">
              <AspirantLayout>
                <Dashboard />
              </AspirantLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/missions"
          element={
            <ProtectedRoute roleRequired="ASPIRANT">
              <AspirantLayout>
                <Missions />
              </AspirantLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/study-materials"
          element={
            <ProtectedRoute roleRequired="ASPIRANT">
              <AspirantLayout>
                <StudyMaterials />
              </AspirantLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/available-tests"
          element={
            <ProtectedRoute roleRequired="ASPIRANT">
              <AspirantLayout>
                <AvailableTests />
              </AspirantLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/take-test/:testId"
          element={
            <ProtectedRoute roleRequired="ASPIRANT">
              <AspirantLayout>
                <TakeTest />
              </AspirantLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-results"
          element={
            <ProtectedRoute roleRequired="ASPIRANT">
              <AspirantLayout>
                <MyResults />
              </AspirantLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ssb-prep"
          element={
            <ProtectedRoute roleRequired="ASPIRANT">
              <AspirantLayout>
                <SSBPrep />
              </AspirantLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/pyq"
          element={
            <ProtectedRoute roleRequired="ASPIRANT">
              <AspirantLayout>
                <PYQSection />
              </AspirantLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;