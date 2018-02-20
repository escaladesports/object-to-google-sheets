import { google } from 'googleapis'

const sheets = google.sheets('v4')

export default async function() {
	let sheetId = 0
	const params = {
		spreadsheetId: this.options.spreadsheetId,
		resource: {
			requests: [
				{
					insertDimension: {
						range: {
							sheetId,
							dimension: 'ROWS',
							startIndex: 1,
							endIndex: 3,
						},
					}
				},
				{
					updateCells: {
						rows: [
							{
								values: [
									{
										userEnteredValue: {
											stringValue: 'test@gmail.com'
										}
									},
									{
										userEnteredValue: {
											stringValue: 'Other Name'
										}
									},
								]
							}
						],
						range: {
							sheetId,
							startRowIndex: 1,
							endRowIndex: 2,
						},
						fields: '*'
					}
				}
			],
		},
		auth: new google.auth.JWT(
			this.options.clientEmail,
			null,
			this.options.privateKey,
			['https://www.googleapis.com/auth/spreadsheets'],
			null
		)
	}
	await new Promise((resolve, reject) => {
		sheets.spreadsheets.batchUpdate(params, {}, (err, response) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(response)
			}
		})
	})
}