import { useState, useEffect } from "react"
import Layout from "./components/layout/Layout"
import { Route, Routes } from "react-router-dom"
import UserProfile from "./components/user/UserProfile"
import useUser from "./hooks/useUser"
import useWeightEntries from "./hooks/useWeightEntries"

function App() {
  const [refresh, setRefresh] = useState(0)
  const user = useUser(refresh)
  const weightEntries = useWeightEntries(refresh)



  useEffect(() => {
    if (user) {
      document.title = user.name + " | Weight Tracker"
    }
  }, [user])

  return (

    <Routes>
      <Route element={<Layout user={user} />}>
        <Route path="/" element={<UserProfile user={user} weightEntry={weightEntries} refresh={refresh} onRefresh={() => setRefresh(r => r + 1)} />} />
      </Route>
    </Routes>
  )
}

export default App