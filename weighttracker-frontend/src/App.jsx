import { useState, useEffect } from "react"
import Layout from "./components/layout/Layout"
import { Route, Routes } from "react-router-dom"
import UserProfile from "./components/user/UserProfile"
import Home from "./components/home/Home"
import Login from "./components/auth/Login"
import useUser from "./hooks/useUser"
import useWeightEntriesByUser from "./hooks/useWeightEntriesByUser"
import AllMeasurements from "./components/user/AllMeasurements"

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
  const weightEntries = useWeightEntriesByUser(user?.id, refresh)

  useEffect(() => {
    if (user) {
      document.title = user.name + " | Weight Tracker"
    }
  }, [user])



  return (

    <Routes>
      <Route element={<Layout user={user} />}>
        <Route path="/" element={<Home user={user} weightEntry={weightEntries} refresh={refresh} onRefresh={() => setRefresh(r => r + 1)} />} />
        <Route path="/measurements" element={<AllMeasurements user={user} weightEntry={weightEntries} onRefresh={() => setRefresh(r => r + 1)} />} />
        <Route path="/profile" element={<UserProfile user={user} weightEntry={weightEntries} refresh={refresh} onRefresh={() => setRefresh(r => r + 1)} />} />
      </Route>
    </Routes>
  )
}

export default App