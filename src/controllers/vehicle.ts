import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// Obter todos os veículos
export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('vehicles').select('*');
    if (error) throw error;

    res.json({ vehicles: data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Obter veículo por ID
export const getVehicleById = async (req: Request, res: Response) => {
  const vehicleId = req.params.id;

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', vehicleId)
      .single();

    if (error) throw error;

    res.json({ vehicle: data });
  } catch (err: any) {
    res.status(404).json({ error: 'Vehicle not found' });
  }
};

// Criar novo veículo
export const createVehicle = async (req: Request, res: Response) => {
  const { car_name, license_plate, driver_name, service_type } = req.body;

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([{ car_name, license_plate, driver_name, service_type }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Vehicle created', vehicle: data[0] });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

//Deletar veiculo
export const deleteById = async (req: Request, res: Response) => {
  const vehicleId = req.params.id;

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', vehicleId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted', vehicle: data[0] });
  } catch (err: any) {
    res.status(404).json({ error: 'Vehicle not found' });
  }
};

//update Vechile
export const updateVehicle = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { car_name, license_plate, driver_name, service_type } = req.body;

  try {
    // Verifica se o ID foi fornecido
    if (!id) {
      res.status(400).json({ error: 'Vehicle ID is required' });
    }

    // Executa o update na tabela vehicles
    const { data, error } = await supabase
      .from('vehicles')
      .update({ car_name, license_plate, driver_name, service_type })
      .match({ id })  // Localiza o veículo pelo ID
      .select();

    if (error) throw error;

    // Se não encontrar o veículo, retorna um erro
    if (data.length === 0) {
      res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle updated', vehicle: data[0] });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


