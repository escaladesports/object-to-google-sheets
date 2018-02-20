import { ServiceAccount } from 'google-sheets-manager'

import sheet from './sheet'
import syncAll from './sync-all'
import syncSchema from './sync-schema'
import prependRows from './prepend-rows'
import add from './add'

class GoogleSheetsNoSQL{
	constructor(options){
		this.options = {
			sheet: 0,
			cache: true,
			...options
		}

		this.auth = new ServiceAccount({
			client_email: this.options.clientEmail,
			private_key: this.options.privateKey,
		})
		this.sheet(this.options.sheet)
		this.data = []
		this.synced = false

		return this
	}
}

GoogleSheetsNoSQL.prototype = {
	sheet,
	syncAll,
	syncSchema,
	add,
	prependRows,
}

export default GoogleSheetsNoSQL