import { createApp } from '../index'
import request from 'supertest'

describe('ping', function () {
  let app

  beforeAll(async () => {
    app = await createApp()
  })

  it('should ping successfully', async () => {
    const res = await request(app).get('/ping').send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({ success: true })
  })
})
