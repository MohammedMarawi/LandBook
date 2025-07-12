const axios = require('axios');

async function testBooking() {
  try {
    const response = await axios.post('http://localhost:3000/api/bookings', {
      land: "664f2e4e9d287c5b1a0e3f90",
      user: "664f2e6a9d287c5b1a0e3f95",
      startDate: "2025-07-01T00:00:00.000Z",
      endDate: "2024-07-10T00:00:00.000Z"
    });
    
    console.log('Success:', response.data);
  } catch (error) {
    console.log('Error:', error.response?.data || error.message);
  }
}

testBooking(); 