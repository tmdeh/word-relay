function tokenExpired(navigate) {
  alert("토큰이 만료되었습니다.")
  localStorage.removeItem("token")
  navigate("/", {replace: true})
}

export default tokenExpired;