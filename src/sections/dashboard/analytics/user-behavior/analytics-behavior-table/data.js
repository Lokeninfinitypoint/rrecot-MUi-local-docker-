// @assets
import avatar1 from '@/assets/images/users/avatar-1.png';
import avatar2 from '@/assets/images/users/avatar-2.png';
import avatar3 from '@/assets/images/users/avatar-3.png';
import avatar4 from '@/assets/images/users/avatar-4.png';

export const analyticsBehaviorTableData = [
  {
    id: '1',
    user: { src: avatar1, name: 'Stacy Reichel' },
    amount: '$199.00',
    dateTime: { date: '14 May 2024', time: '5:00 PM' },
    status: 'success',
    progress: 75
  },
  {
    id: '2',
    user: { src: avatar2, name: 'Roderi Rohan' },
    amount: '$267.00',
    dateTime: { date: '12 Jan 2024', time: '3:45 PM' },
    status: 'success',
    progress: 80
  },
  {
    id: '3',
    user: { src: avatar3, name: 'Audrey Leffler' },
    amount: '$389.00',
    dateTime: { date: '04 Apr 2024', time: '10:30 AM' },
    status: 'cancel',
    progress: 60
  },
  {
    id: '4',
    user: { src: avatar4, name: 'Allison Mose' },
    amount: '$199.00',
    dateTime: { date: '14 May 2024', time: '11:40 AM' },
    status: 'success',
    progress: 92
  }
];
