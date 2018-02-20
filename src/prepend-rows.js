import { google } from 'googleapis'

const sheets = google.sheets('v4')

console.log(sheets)

// https://developers.google.com/sheets/api/samples/rowcolumn#insert_an_empty_row_or_column

function authorizeGoogleJWT(clientEmail, privateKey, scopes) {
	return new google.auth.JWT(
		clientEmail,
		null,
		privateKey,
		['https://www.googleapis.com/auth/spreadsheets'],
		null
	)
}

function authenticateGoogleSheets() {
	return Promise.resolve(authorizeGoogleJWT(process.env.GOOGLE_SHEETS_CLIENT_EMAIL, process.env.GOOGLE_SHEETS_API_KEY))
}

function appendPromisified(params, options = {}) {
	return new Promise((resolve, reject) => {
		sheets.spreadsheets.values.append(params, options, (err, response) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(response)
			}
		});
	});
}

export default async function() {
	let auth = await authenticateGoogleSheets(this.options.clientEmail, this.options.privateKey)
	console.log(auth)
}