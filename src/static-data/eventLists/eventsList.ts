export interface Event {
  id: string;
  eventName?: string;
  eventDescription?: string;
  eventDate?: string;
  image?: string; // Assuming that the 'image' property is the require path for the image
}
function generateId(prefix:string) {
  const timestamp = new Date().getTime();
  return `${prefix}_${timestamp}`;
}
const eventsList:Event[] = [
  {
    id: generateId('event'),
    eventName: 'Evento 01',
    eventDescription: 'Descricion de evento 01',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
  {
    id: generateId('event'),
    eventName: 'Evento 02',
    eventDescription: 'Descricion de evento 02',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
  {
    id: generateId('event'),
    eventName: 'Evento 03',
    eventDescription: 'Descricion de evento 03',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
  {
    id: generateId('event'),
    eventName: 'Evento 04',
    eventDescription: 'Descricion de evento 04',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
  {
    id: generateId('event'),
    eventName: 'Evento 05',
    eventDescription: 'Descricion de evento 05',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
  {
    id: generateId('event'),
    eventName: 'Evento 06',
    eventDescription: 'Descricion de evento 06',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
  {
    id: generateId('event'),
    eventName: 'Evento 07',
    eventDescription: 'Descricion de evento 07',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
  {
    id: generateId('event'),
    eventName: 'Evento 08',
    eventDescription: 'Descricion de evento 08',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
  {
    id: generateId('event'),
    eventName: 'Evento 09',
    eventDescription: 'Descricion de evento 09',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
  {
    id: generateId('event'),
    eventName: 'Evento 10',
    eventDescription: 'Descricion de evento 10',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
  {
    id: generateId('event'),
    eventName: 'Evento 11',
    eventDescription: 'Descricion de evento 11',
    eventDate:'01/05/2024',
    image: require('../../assets/images/common/logo.png'),
  },
];

export default eventsList;
