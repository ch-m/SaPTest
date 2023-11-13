import request from 'supertest'
import should from 'should'
import app from '../../src/app'
import * as testUtils from '../utils/userDbUtils'


describe('GET /api/users', () => {
  beforeEach(async () => {
    await testUtils.cleanUsers()
  })
  after(async () => {
    await testUtils.cleanUsers()
  })
  it('Should be ok if there are no users currently', async () => {
    const { body } = await request(app).get('/api/users')
    should(body).be.ok()
    should(body.data).be.ok()
    should(body.data).be.an.Array().which.eql([])
  })
  it('Should return all users if no query parameter is provided', async () => {
    const dummyData = assembleDummyData()
    await testUtils.saveUsers(dummyData)
    const { body } = await request(app).get('/api/users')
    should(body).be.ok()
    should(body.data).be.ok()
    should(body.data).be.an.Array().which.eql(dummyData)
  })
  it('Should only return users that match at least partially the query parameter provided', async () => {
    const dummyData = assembleDummyData()
    await testUtils.saveUsers(dummyData)
    let body = (await request(app).get('/api/users').query({ q: 'New' })).body
    should(body).be.ok()
    should(body.data).be.ok()
    should(body.data).be.an.Array().which.eql([dummyData[0]])
    body = (await request(app).get('/api/users').query({ q: 'Bra' })).body
    should(body).be.ok()
    should(body.data).be.ok()
    should(body.data).be.an.Array().which.eql([...dummyData.slice(1, 4)])
  })
  it('Should be case insensitive when querying', async () => {
    const dummyData = assembleDummyData()
    await testUtils.saveUsers(dummyData)
    let body = (await request(app).get('/api/users').query({ q: 'Soccer' })).body
    should(body).be.ok()
    should(body.data).be.ok()
    should(body.data).be.an.Array().which.eql([dummyData[2]])
  })
})

const assembleDummyData = () => ([
  { name: 'John' ,city: 'New york' ,country: 'United States', favorite_sport: 'baseball' },
  { name: 'Eduardo' ,city: 'Belo Horizonte' ,country: 'Brazil', favorite_sport: 'volley' },
  { name: 'Christian' ,city: 'Goiania' ,country: 'Brazil', favorite_sport: 'soccer' },
  { name: 'Edward' ,city: 'Sao Paulo' ,country: 'Brazil', favorite_sport: 'tennis' },
])