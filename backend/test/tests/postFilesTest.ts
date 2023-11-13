import request from 'supertest'
import should from 'should'
import app from '../../src/app'
import * as testUtils from '../utils/userDbUtils'


describe('POST /api/files', () => {
  beforeEach(async () => {
    await testUtils.cleanUsers()
  })
  after(async () => {
    await testUtils.cleanUsers()
  })
  it('Should validate the file existence in the request', async () => {
    const { body, status } = await request(app).post('/api/files')
    should(status).be.exactly(400)
    should(body.message).be.ok().and.be.exactly('Please upload a .csv file')
  })
  it('Should validate the file extension', async () => {
    const { body, status } = await request(app)
      .post('/api/files')
      .attach('file', './test/files/dummy.json', { contentType: 'multipart/form-data', filename: 'dummy.json' })
    should(status).be.exactly(400)
    should(body.message).be.ok().and.be.exactly('Only the following extensions are permitted: csv')
  })
  it('Should correctly upload the file correctly', async () => {
    const { body, status } = await request(app)
      .post('/api/files')
      .attach('file', './test/files/dummy.csv', { contentType: 'multipart/form-data', filename: 'dummy.csv' })
    should(status).be.exactly(200)
    should(body.message).be.ok().and.be.exactly('The file was uploaded successfully.')
  })
})