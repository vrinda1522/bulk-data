const request = require('supertest');
const app = require('../app'); 


describe('Bulk Data API', () => {
    const sampleData = [
        { name: 'Test1', email: 'test1@example.com', age: '30', yoe: '2'},
        { name: 'Test2', email: 'test2@example.com'},
        { name: 'Test3', email: 'test', age: '45', yoe: '4'}
      ];
  it('should return 200 and an array on GET /api/data', async () => {
    const res = await request(app).get('/api/data');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 201 on successful bulk POST /api/data', async () => {
    const res = await request(app)
      .post('/api/data')
      .send(sampleData)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body.length).toBe(sampleData.length);
  });
  it('should return 400 for empty array input', async () => {
    const res = await request(app)
      .post('/api/data')
      .send([])
      .set('Content-Type', 'application/json');
  
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/non-empty array/i);
  });
  
  it('should return 400 if email is invalid', async () => {
    const res = await request(app)
      .post('/api/data')
      .send(sampleData)
      .set('Content-Type', 'application/json');
  
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/invalid email/i);
  });
  
  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/data')
      .send(sampleData)
      .set('Content-Type', 'application/json');
  
    expect(res.statusCode).toBe(400);
  });
  it('should return 404 if any ID does not exist during delete', async () => {
    const res = await request(app)
      .delete('/api/data')
      .send([7,8])
      .set('Content-Type', 'application/json');
  
    expect(res.statusCode).toBe(404);
    expect(res.body.missingIds.length).toBeGreaterThan(0);
  });
  it('should return 404 if any ID does not exist during update', async () => {
    const res = await request(app)
      .update('/api/data')
      .send([7,8])
      .set('Content-Type', 'application/json');
  
    expect(res.statusCode).toBe(404);
    expect(res.body.missingIds.length).toBeGreaterThan(0);
  });
});