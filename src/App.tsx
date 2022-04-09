import {
  Routes,
  Route,
} from "react-router-dom";
import LogIn from "./Containers/User/LogIn";
import SignUp from "./Containers/User/SignUp"
import ProtectedRoute from "./ProtectedRoute";
import UnprotectedRoute from "./UnProtecteRoute"
import Map from "./Containers/Map";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={
        <ProtectedRoute >
          <Map />
        </ProtectedRoute>} />
      <Route path='/auth' element={<UnprotectedRoute />}>
        <Route path="/auth/login" element={<LogIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Route>

    </Routes>
  );
}