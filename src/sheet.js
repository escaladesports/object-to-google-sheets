import { GoogleSheet } from 'google-sheets-manager'

export default function sheet(sheetId) {
	this.sheetId = sheetId
	this.api = new GoogleSheet(this.auth, this.options.spreadsheetId, this.sheetId)
	return this
}