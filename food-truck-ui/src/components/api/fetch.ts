import {
  FoodTruck,
  PermitStatus,
  ProprietorType,
  TruckCountByType,
  TruckCountByBlock,
  TruckCountByStatus
} from './types';

export const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchClient = {
  async getTrucks() {
    const response = await fetch(`${baseUrl}/food-trucks/`);
    const result = await response.json();
    return (result?.data ?? []) as FoodTruck[];
  },

  async getTruckById(id: number) {
    const response = await fetch(`${baseUrl}/food-trucks/${id}`);
    const result = await response.json();
    return result?.data as FoodTruck | undefined;
  },

  async searchTrucksByStatus(status: PermitStatus) {
    const response = await fetch(`${baseUrl}/search/status?search=${status}`);
    const result = await response.json();
    return (result?.data ?? []) as FoodTruck[];
  },

  async searchTrucksByType(type: ProprietorType) {
    const response = await fetch(`${baseUrl}/search/type?search=${type}`);
    const result = await response.json();
    return (result?.data ?? []) as FoodTruck[];
  },

  async searchTrucksByName(name: string) {
    const response = await fetch(`${baseUrl}/search/truck?search=${encodeURIComponent(name)}`);
    const result = await response.json();
    return (result?.data ?? []) as FoodTruck[];
  },

  async searchTrucksByFood(food: string) {
    const response = await fetch(`${baseUrl}/search/food?search=${encodeURIComponent(food)}`);
    const result = await response.json();
    return (result?.data ?? []) as FoodTruck[];
  },

  async reportTrucksByType() {
    const response = await fetch(`${baseUrl}/report/type`);
    const result = await response.json();
    return (result?.data ?? []) as TruckCountByType
  },

  async reportTrucksByBlock() {
    const response = await fetch(`${baseUrl}/report/block`);
    const result = await response.json();
    return (result?.data ?? []) as TruckCountByBlock
  },

  async reportTrucksByStatus() {
    const response = await fetch(`${baseUrl}/report/status`);
    const result = await response.json();
    return (result?.data ?? []) as TruckCountByStatus
  }
};
