import { useState, useEffect } from "react"
import Layout from "./components/layout/Layout"
import { Route, Routes } from "react-router-dom"
import UserProfile from "./components/user/UserProfile"
import Home from "./components/home/Home"
import Login from "./components/auth/Login"
import useUser from "./hooks/useUser"
import useMeasurementsByUser from "./hooks/useMeasurementsByUser"
import AllMeasurements from "./components/user/AllMeasurements"
import MeasurementPreferencesSetup from "./components/user/MeasurementPreferencesSetup"


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [refresh, setRefresh] = useState(0)


  if (!token) {
    return <Login onLogin={() => setToken(localStorage.getItem("token"))} />
  }

  return <AuthApp refresh={refresh} setRefresh={setRefresh} />
}

function AuthApp({ refresh, setRefresh }) {
  const user = useUser(refresh)
  const { entries: measurements, isLoading } = useMeasurementsByUser(user?.id, refresh)

  useEffect(() => {
    if (user) {
      document.title = user.name + " | Weight Tracker"
    }
  }, [user])

  if (user && !user.preferencesConfigured) {
    return <MeasurementPreferencesSetup user={user} onRefresh={() => setRefresh(r => r + 1)} />
  }

  return (

    <Routes>
      <Route element={<Layout user={user} />}>
        <Route path="/" element={<Home user={user} measurements={measurements} refresh={refresh} onRefresh={() => setRefresh(r => r + 1)} />} />
        <Route path="/measurements" element={<AllMeasurements user={user} measurements={measurements} refresh={refresh} onRefresh={() => setRefresh(r => r + 1)} />} />        <Route path="/profile" element={<UserProfile user={user} measurements={measurements} refresh={refresh} onRefresh={() => setRefresh(r => r + 1)} />} />
      </Route>
    </Routes>
  )
}

export default App