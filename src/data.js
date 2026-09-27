// Seed data used only the very first time the app runs (before anything is saved to localStorage).

function seedPriorities() {
  return [
    { id: uid(), title: 'Follow up with Ahmed', description: 'Discuss villa viewing feedback for The Valley listing.', level: 'High', done: false },
    { id: uid(), title: 'Send MOU draft to Sara', description: 'Emaar Beachfront apartment — buyer is ready to sign.', level: 'High', done: false },
    { id: uid(), title: 'Prep listing photos', description: 'Upload new shoot for the Damac Hills townhouse.', level: 'Medium', done: false },
  ];
}

function seedLeads() {
  return [
    {
      id: uid(), name: 'Ahmed Khalil', area: 'The Valley', property: '4BR Villa', phone: '+971 50 111 2233',
      temp: 'Hot', status: 'Negotiation', lastContact: isoFromOffset(-3), nextFollowUp: isoFromOffset(-1), dealValue: null,
    },
    {
      id: uid(), name: 'Sara Al Mansoori', area: 'Emaar Beachfront', property: '2BR Apartment', phone: '+971 55 222 3344',
      temp: 'Hot', status: 'MOU', lastContact: isoFromOffset(-1), nextFollowUp: isoFromOffset(0), dealValue: null,
    },
    {
      id: uid(), name: 'James Whitfield', area: 'Downtown Dubai', property: '1BR Apartment', phone: '+971 56 333 4455',
      temp: 'Warm', status: 'Viewing', lastContact: isoFromOffset(-5), nextFollowUp: isoFromOffset(2), dealValue: null,
    },
    {
      id: uid(), name: 'Fatima Noor', area: 'Damac Hills', property: '3BR Townhouse', phone: '+971 52 444 5566',
      temp: 'Warm', status: 'Contacted', lastContact: isoFromOffset(-2), nextFollowUp: isoFromOffset(0), dealValue: null,
    },
    {
      id: uid(), name: 'Liu Wei', area: 'Business Bay', property: 'Studio', phone: '+971 58 555 6677',
      temp: 'Cold', status: 'Lead', lastContact: isoFromOffset(-10), nextFollowUp: isoFromOffset(5), dealValue: null,
    },
    {
      id: uid(), name: 'Omar Sheikh', area: 'Arabian Ranches', property: '5BR Villa', phone: '+971 50 666 7788',
      temp: 'Hot', status: 'Viewing', lastContact: isoFromOffset(-4), nextFollowUp: isoFromOffset(-2), dealValue: null,
    },
    {
      id: uid(), name: 'Priya Nair', area: 'JVC', property: '2BR Apartment', phone: '+971 54 777 8899',
      temp: 'Warm', status: 'Contacted', lastContact: isoFromOffset(-6), nextFollowUp: isoFromOffset(-3), dealValue: null,
    },
    {
      id: uid(), name: 'Khalid Rahman', area: 'Dubai Hills', property: '4BR Villa', phone: '+971 55 888 9900',
      temp: 'Hot', status: 'Closed', lastContact: isoFromOffset(-8), nextFollowUp: null, dealValue: 45000, closedDate: isoFromOffset(-8),
    },
    {
      id: uid(), name: 'Elena Petrova', area: 'Palm Jumeirah', property: 'Penthouse', phone: '+971 56 999 0011',
      temp: 'Warm', status: 'Lead', lastContact: isoFromOffset(-15), nextFollowUp: isoFromOffset(7), dealValue: null,
    },
    {
      id: uid(), name: 'Yusuf Demir', area: 'Dubai Marina', property: '3BR Apartment', phone: '+971 50 123 4567',
      temp: 'Cold', status: 'Contacted', lastContact: isoFromOffset(-12), nextFollowUp: isoFromOffset(-4), dealValue: null,
    },
  ];
}

function seedSchedule() {
  return [
    { id: uid(), time: '05:30', label: 'Fajr Prayer', category: 'Prayer', done: false },
    { id: uid(), time: '07:00', label: 'Morning workout', category: 'Exercise', done: false },
    { id: uid(), time: '09:00', label: 'Office — pipeline review', category: 'Office', done: false },
    { id: uid(), time: '11:00', label: 'Viewing with James — Downtown', category: 'Meeting', done: false },
    { id: uid(), time: '12:30', label: 'Dhuhr Prayer', category: 'Prayer', done: false },
    { id: uid(), time: '14:00', label: 'Call new leads batch', category: 'Office', done: false },
    { id: uid(), time: '16:00', label: 'Dr. appointment', category: 'Personal', done: false },
    { id: uid(), time: '15:30', label: 'Asr Prayer', category: 'Prayer', done: false },
    { id: uid(), time: '18:00', label: 'Maghrib Prayer', category: 'Prayer', done: false },
    { id: uid(), time: '20:00', label: 'Family dinner', category: 'Personal', done: false },
  ];
}

function seedCommissionGoal() {
  return { goal: 500000, current: 0 };
}
