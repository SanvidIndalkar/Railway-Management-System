const trainData = [
    {
      trainNo: 1234,
      trainName: "Shatabdi Express",
      startDate: "21 Feb 2024",
      startStation: "Delhi",
      startTime: "10:12",
      startDay: "Thu",
      endDate: "22 Feb 2024",
      endStation: "Mumbai",
      endTime: "02:23",
      endDay: "Fri",
      totalSeats: { "SL": 15, "1A": 15, "2A": 15, "3A": 15 },
      trainStops: ["Mumbai", "Kalyan", "Pune", "Satara", "Sangli"],
      trainSeats: [
        { "SL": 15, "1A": 15, "2A": 15, "3A": 15 }
      ]
    },
    {
      trainNo: 2000,
      trainName: "Rajdhani Express",
      startDate: "23 Feb 2024",
      startStation: "Kolkata",
      startTime: "15:30",
      startDay: "Sat",
      endDate: "24 Feb 2024",
      endStation: "New Delhi",
      endTime: "09:45",
      endDay: "Sun",
      totalSeats: { "SL": 20, "1A": 10, "2A": 20, "3A": 30 },
      trainStops: ["New Delhi", "Agra", "Gwalior", "Jhansi", "Bhopal"],
      trainSeats: [
        { "SL": 20, "1A": 10, "2A": 20, "3A": 30 }
      ]
    },
    {
      trainNo: 3000,
      trainName: "Duronto Express",
      startDate: "25 Feb 2024",
      startStation: "Chennai",
      startTime: "12:45",
      startDay: "Mon",
      endDate: "26 Feb 2024",
      endStation: "Delhi",
      endTime: "06:30",
      endDay: "Tue",
      totalSeats: { "SL": 25, "1A": 12, "2A": 18, "3A": 25 },
      trainStops: ["Delhi", "Nagpur", "Secunderabad", "Vijayawada", "Chennai"],
      trainSeats: [
        { "SL": 25, "1A": 12, "2A": 18, "3A": 25 }
      ]
    },
    {
      trainNo: 4000,
      trainName: "Garib Rath",
      startDate: "27 Feb 2024",
      startStation: "Mumbai",
      startTime: "08:15",
      startDay: "Wed",
      endDate: "28 Feb 2024",
      endStation: "Kolkata",
      endTime: "17:40",
      endDay: "Thu",
      totalSeats: { "SL": 30, "1A": 10, "2A": 20, "3A": 35 },
      trainStops: ["Mumbai", "Pune", "Bhusawal", "Nagpur", "Asansol"],
      trainSeats: [
        { "SL": 30, "1A": 10, "2A": 20, "3A": 35 }
      ]
    },
  ];
  

  export default trainData;