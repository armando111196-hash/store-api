import request from 'supertest';
import app from '../app';

describe('API REST de Productos (Store)', () => {
  
  test('GET /products responde 200 y devuelve un arreglo', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  test('POST /products con datos válidos responde 201 y devuelve el producto creado con su id', async () => {
    const newProduct = { name: "Gorra deportiva", price: 12.0, stock: 25, category: "deporte" };
    const response = await request(app).post('/products').send(newProduct);
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newProduct.name);
  });

  test('POST /products sin los campos obligatorios responde 400', async () => {
    const invalidProduct = { stock: 10 };
    const response = await request(app).post('/products').send(invalidProduct);
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', "El nombre y el precio son obligatorios");
  });

  test('POST /products con un precio inválido responde 400', async () => {
    const invalidProduct = { name: "Pantalón", price: -5 };
    const response = await request(app).post('/products').send(invalidProduct);
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', "El precio debe ser un número mayor que 0");
  });

});