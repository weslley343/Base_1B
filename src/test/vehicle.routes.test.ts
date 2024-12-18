import request from 'supertest';
import app from '../index'; // Importa o servidor Express

let server: any;
let vehicleId: string; // Variável para armazenar o ID do veículo criado

// Inicia o servidor antes dos testes
beforeAll((done) => {
  server = app.listen(4000, done);
});

// Fecha o servidor após os testes
afterAll((done) => {
  server.close(done);
});

describe('Vehicle Routes', () => {

  // Testa a criação de um novo veículo
  it('should create a new vehicle', async () => {
    const newVehicle = {
      car_name: 'Honda Civic',
      license_plate: 'XYZ-1234',
      driver_name: 'Alice Doe',
      service_type: 'Maintenance',
    };

    const response = await request(app).post('/vehicle').send(newVehicle);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('vehicle');
    expect(response.body.vehicle.car_name).toBe(newVehicle.car_name);

    // Armazenando o ID do veículo criado para usar nos testes seguintes
    vehicleId = response.body.vehicle.id;
  });

  it('should update a vehicle', async () => {
    const updateVehicle = {
      car_name: 'Honda Civic 2009',
      license_plate: 'XYZ-1233',
      driver_name: 'Alice Doe Silver',
      service_type: 'Maintenance of EFI',
    }
    const response = await request(app).put(`/vehicle/${vehicleId}`).send(updateVehicle);
    expect(response.status).toBe(200);
    expect(response.body.vehicle.car_name).toBe(updateVehicle.car_name);
  })

  it('should update a vehicle but only with one field', async () => {
    const updateVehicle = {
      car_name: 'Honda Civic 2009 GT',
    }
    const response = await request(app).put(`/vehicle/${vehicleId}`).send(updateVehicle);
    expect(response.status).toBe(200);
    expect(response.body.vehicle.car_name).toBe(updateVehicle.car_name);
    expect(response.body.vehicle.driver_name).toBe('Alice Doe Silver');
  })

  // Testa a rota para buscar um veículo por ID
  it('should fetch the created vehicle by ID', async () => {
    const response = await request(app).get(`/vehicle/${vehicleId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('vehicle');
    expect(response.body.vehicle.id).toBe(vehicleId); // Confirma que o ID é o mesmo
  });

  // Testa a resposta para um veículo inexistente
  it('should return 404 for a non-existent vehicle', async () => {
    const invalidId = 'invalid-uuid'; // ID que não existe
    const response = await request(app).get(`/vehicle/${invalidId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Vehicle not found');
  });

  it('should delete a vehicle by ID', async () => {
    const response = await request(app)
      .delete(`/vehicle/${vehicleId}`)
      .expect(200); // Espera um status 200

    expect(response.body.message).toBe('Vehicle deleted');
    expect(response.body.vehicle.id).toBe(vehicleId);
  });

});
