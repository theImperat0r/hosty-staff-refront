export const TEAM_MEMBERS = [
  {
    id: 1,
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-user h-9 w-9 text-blue-600"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
      </svg>
    ),
    name: "ანა",
    lastName: "გიორგაძე",
    position: "Supervisor",
    isOnShift: true,
    shifts: [
      {
        id: "1.1",
        day: "ორშაბათი",
        shiftStarts: "08:00",
        shiftEnds: "16:00",
      },
      {
        id: "1.2",
        day: "სამშაბათი",
        shiftStarts: "08:00",
        shiftEnds: "16:00",
      },
      {
        id: "1.3",
        day: "ოთხშაბათი",
        shiftStarts: "08:00",
        shiftEnds: "16:00",
      },
    ],
  },
  {
    id: 2,
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-user h-9 w-9 text-blue-600"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
      </svg>
    ),
    name: "გიორგი",
    lastName: "მამულაშვილი",
    position: "Staff",
    isOnShift: true,
    shifts: [
      {
        id: "2.1",
        day: "ორშაბათი",
        shiftStarts: "14:00",
        shiftEnds: "22:00",
      },
      {
        id: "2.2",
        day: "ხუთშაბათი",
        shiftStarts: "14:00",
        shiftEnds: "22:00",
      },
      {
        id: "2.3",
        day: "პარასევი",
        shiftStarts: "14:00",
        shiftEnds: "22:00",
      },
    ],
  },
  {
    id: 3,
    avatar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-user h-9 w-9 text-blue-600"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
      </svg>
    ),
    name: "მარიამ",
    lastName: "ბერიძე",
    position: "Staff",
    isOnShift: false,
    shifts: [
      {
        id: "3.1",
        day: "შაბათი",
        shiftStarts: "08:00",
        shiftEnds: "14:00",
      },
      {
        id: "3.2",
        day: "კვირა",
        shiftStarts: "08:00",
        shiftEnds: "14:00",
      },
    ],
  },
];
