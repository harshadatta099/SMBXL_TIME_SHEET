const PrivateRoute = ({ role, children }) => {
  if (userRole === role) {
    return children
  } else {
    return <Navigate to='/' />
  }
}