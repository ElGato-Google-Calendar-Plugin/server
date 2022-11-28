const { google } = require('googleapis');
require('dotenv').config();

const CREDENTIALS = {
    "type": "service_account",
    "project_id": "elgato-calendar",
    "private_key_id": "cc591ac209b6aabbf21b0ed6f211aee630d63894",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9JglQRJeLpHWG\nFOxHVFe6Qi/JVAH+C5Z8vbT8rz8vrZFJGUAUOlVoSbSBugZ2m0/J9IrCklksVd36\nIyR60ghDnuYEdNp9PwzvRnzKfoPkx3tbGMoxAJwfgH2i3iBTrj76/5sH+hcturvp\nXudJAsPVdV7YBcdrkcmrJDdc6pr5z+T+c6l+fjYEGTlNMEB5oHyymFd0fXL1Lw6c\nvf7Pnjy1Sk3UOPgrA2hBSLNp26ttQpep/nzdiBPcp926dMMqFiUyw02hNmEAxR3m\nHFSHrVwftdRBlXFdsilS2ebyKJLRnWq+wPne3kM7pfgr1QzOvOXWGcMf2SewwB8B\nA0Od6xP1AgMBAAECggEAF+kwyLefE71SyQQomVzJaUeYLGKFDPUwjSzbLg1GVtPh\nd6TsQ5JbPR+CJNscGY7JL53NE8s14COrt8UNBcS63DeAWuRdwXMAwte9i0iiij+I\nccvotXifA+F1oGrlmcZ/ejHpSoEcQIDoY9hGMyXZFUks1/ClFM1dedfOct3KgRVF\np3ka4FHqPb6IC/0vq0hlnvo14iMsqc5rPVuDdz0HbDNm8EGUZMiY8wu0HVxZ28/5\nkBqfFLUKwWlciSKIFBCsF+tYwEeXKLTB9xgP+wHN5s05t8zEEt5BO3VqInLtbgQd\nIDf3VDpFtOVBDbz2Ekwr6o9qEGRaH/f5mNXeol3uMQKBgQD1ECcP10BpgY7aIJsz\nXh83quStdVMyZYHxJn3IyVXD6+QbMXVrgPoux/InUPRAabhzTgIe4ZibamNSypf9\nxwz57doomZnWW1FSTirqfkpnJFb7mxoLuAM2kFg8f7G7IlvooQ87+M9EZDe7OVJR\nRUs+9V0WhJilXzYuCgDy3VY8kQKBgQDFlw9iSk7Up6ibNma6HFBldLkFlO21on/m\nJlu/n3KTdj6ePZyWZO2ZrVqPL3BgS015M3JkaqmNZelreRZ+YBW3oVmxc5jR7HyS\nx8x8eWQKkfNh+ER52BJGEVYCPRkGk8rDKIOlIE9Y2TVmGUwxJIBIwbAGRuWtc/Nm\nxRNPu6SjJQKBgDkVlCPKfkSVW1NQORbUG+15r18Ab2rT3lrwHmjBDWtf7XiwIqvy\nFVUEWlHyN5MxjTe+uhu7bTL2q0BD1PfWgB1P3HuMnBsklmLXtoN8+5PfESv2yzBj\nosv4/7TIAfyXWlVr/wJ3SMCjn5/LEHPB8m8t9IskQ/JxpUtAJUxtZoMhAoGAfBth\n4k7iLNgSI0uMQqG+Lbue606b8FZdF2ZIgpfYE59VvXbdf+ltA/XKx9z4LMOfqd0S\noNgOH24/qu2nn0Ei4vBJshf1iQWNSXSNkDF/ENSTlpmmCRIaiEAjUcymh2cVGHe+\nGF2u+ROVYsfI/6T5nrlposetQ8FsxMRMWOx3gLECgYEA1c3p4PHJ+e9+zCdCUGWK\nWKI+LKZbnrCZOqgjMvj6tTlkZ4hlzRwgWYCpwcF7NElaF/SOPznulmbutok/1gqp\nIzM67r2xaUcuZF/XObRn6/5mEHx36TNlJPoQhMo2VtsI1gg9RZg7qFAzygJNtd7z\nyuZ+wZmsAl6m4IMl2ac2ZSw=\n-----END PRIVATE KEY-----\n",
    "client_email": "nuevo-gato-calendar@elgato-calendar.iam.gserviceaccount.com",
    "client_id": "109730084762582921868",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/nuevo-gato-calendar%40elgato-calendar.iam.gserviceaccount.com"
};
const calendarId = process.env.CALENDAR_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version: "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

const TIMEOFFSET = '+05:30';

const dateTimeForCalendar = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    const newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.0000${TIMEOFFSET}`;
    const event = new Date(Date.parse(newDateTime));

    const startDate = event;
    const endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }
}


const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        const response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            // timeZone: ''
        });

        const items = response['data']['items'];
        return items;
    } catch (error) {
        console.log('Get events error', error);
        return 0;
    }
}

const start = '2022-01-01T00:00:00.000Z';
const end = '2022-12-12T00:00:00.000Z';

const getAllEvents = async (start, end) => {
    try {
        const res = await getEvents(start, end);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

getAllEvents(start,end);