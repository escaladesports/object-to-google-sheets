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
		sheets.spreadsheets.batchUpdate(params, options, (err, response) => {
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
		auth: auth,
		resource: {
			requests: [
				{
					insertDimension: {
						range: {
							sheetId,
							dimension: 'ROWS',
							startIndex: 1,
							endIndex: 2,
						},
						//insertBefore: true
					},
				}
			]
		},
		auth
	}
	await prepend(params)
}