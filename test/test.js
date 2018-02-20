import { load } from 'envdotjs'
import { expect } from 'chai'

import Client from '../src'

load()

const client = new Client({
	clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
	privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
	spreadsheetId: `1OflcxkbcGJ-uBQmDNXZd3-LLFCUpiSC1R0eLg9mB8kk`
})

describe('Client', () => {
	it('should add rows', async () => {
		let data = await client.prependRows()

	})
	/*
	it('sync should sync the schema', async () => {
		let data = await client.syncSchema({
			'Email': 'another@gmail.com',
			'Name': 'Someone else'
		})
		console.log(data)

	})
	*/
})