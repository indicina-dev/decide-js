const axios = require('axios')

const fetchData = async () => {
  const client_id = 'dammytests'
  const client_secret = 'QQMK6EX-FDZ434Y-H5TQVMB-6M0MCD4'
  const options = {
    method: 'POST',
    url: 'https://staging-api.indicina.co/api/v3/client/api/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ client_id, client_secret })
  }

  try {
    const response = await axios.request(options)
    if (response?.data?.status !== "success") {
      throw new Error("Unable to fetch auth code.");
    }

    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjljNjU0ZTlhYWMifQ.eyJhdWQiOiI1YWI4NTE4ZC05OGNmLTQ3YjEtYWI2NS02NzdlNjdlMWE4MmIiLCJleHAiOjE2ODQyNDYyNDgsImlhdCI6MTY4NDI0MjY0OCwiaXNzIjoiaW5kaWNpbmEuY28iLCJzdWIiOiIwZTRkN2E2MC00YzYyLTRkMTUtOGY3NC1kNDgzZmIyOWVlMWQiLCJqdGkiOiI4ZjY2MmNlOS1mNGQyLTQ4NDctYjc2OC1kMjE2NTVhNzcyMjAiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsImVtYWlsIjoiZGFtbXlAaW5kaWNpbmEuY28iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6IjVhYjg1MThkLTk4Y2YtNDdiMS1hYjY1LTY3N2U2N2UxYTgyYiIsInJvbGVzIjpbXSwic2lkIjoiMWFmYzZhM2QtZmJiNC00Yzk3LTlkMTQtOWViZjIwMTRlMTAwIiwiYXV0aF90aW1lIjoxNjg0MjQyNjQ4LCJ0aWQiOiI0YjM4YWYwOS03ZmRkLTQ0OGUtOWFkZS02MmQ2MzBhY2JhNTUiLCJtZXJjaGFudFNsdWciOiJpbmRpY2luYSIsInVzZXJJZCI6IjY0NjM3YzEyODZjMDMxYTg4OTc2YTMyYyIsImFjY291bnRJZCI6IjYzYTMzZDgzN2NhYTQyODg2N2Y3YmUzNiIsInRlbmFudElkIjoiNGIzOGFmMDktN2ZkZC00NDhlLTlhZGUtNjJkNjMwYWNiYTU1Iiwic2x1ZyI6ImluZGljaW5hIn0.t9ykzoPZsOdRIifcQI3o8ZN5IOaT9dSYVuV5RgQLMIw";
    
  } catch (error) {
    throw new DecideException(
      `Failed to fetch auth code. HTTP status: ${error.data}; Message: ${error?.message}`
    )
  }
}

fetchData()
 