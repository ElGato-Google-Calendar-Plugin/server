
const { google } = require('googleapis');
const apiResponse = require("../helpers/apiResponse");

const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version: "v3"});

const TIMEOFFSET = '+05:30';

const getEvents = async (params, {credentials, calendarId}, res) => {
    try {
        const auth = new google.auth.JWT(
            credentials.client_email,
            null,
            credentials.private_key,
            SCOPES
        );


        const response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            ...params
            // timeZone: ''
        });
        return response['data']['items'];
    } catch (error) {
        throw error;
    }
}


exports.getTodayEvents = [
	async function (req, res) {
        const dateTimeStart = new Date(req.query.from);
        const dateTimeEnd = new Date(req.query.to);
        try {
            const events = await getEvents({
                timeMin: dateTimeStart,
                timeMax: dateTimeEnd
            }, req.body,res);
            if (events) {
                return apiResponse.successResponseWithData(res, "Operation success", events);
            }
        } catch (error) {
			return apiResponse.ErrorResponse(res, error);
        }
	}
];

exports.getAllEvents = [
	async function (req, res) {
        const dateTimeStart = '2022-01-01T00:00:00.000Z';
        const dateTimeEnd = '2022-12-12T00:00:00.000Z';
        try {
            const events = await getEvents({
                timeMin: dateTimeStart,
                timeMax: dateTimeEnd
            }, req.body, res);
            return apiResponse.successResponseWithData(res, "Operation success", events);
        } catch (error) {
            console.log(error);
			return apiResponse.ErrorResponse(res, err);
        }
	}
];