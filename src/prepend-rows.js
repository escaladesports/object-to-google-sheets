import { google } from 'googleapis'

const sheets = google.sheets('v4')

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

function authenticateGoogleSheets(clientEmail, privateKey) {
	return Promise.resolve(authorizeGoogleJWT(clientEmail, privateKey))
}

function prepend(params, options = {}) {
	return new Promise((resolve, reject) => {
		sheets.spreadsheets.values.batchUpdate(params, options, (err, response) => {
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
	let sheetId = 0
	const params = {
		spreadsheetId: this.options.spreadsheetId,
		//range: '!B2:Y2',
		auth: auth,
		"requests": [
			{
				"insertDimension": {
					"range": {
						"sheetId": sheetId,
						"dimension": "COLUMNS",
						"startIndex": 2,
						"endIndex": 4
					},
					"inheritBefore": true
				}
			},
			{
				"insertDimension": {
					"range": {
						"sheetId": sheetId,
						"dimension": "ROWS",
						"startIndex": 0,
						"endIndex": 3
					},
					"inheritBefore": false
				}
			},
		],
		auth
	}
	await prepend(params)
}