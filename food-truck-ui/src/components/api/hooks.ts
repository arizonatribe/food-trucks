import { useQuery } from 'react-query';
import { fetchClient as client } from './fetch';
import { ProprietorType, PermitStatus } from './types';

export function useTrucksQuery() {
  return useQuery('getTrucks', client.getTrucks);
}

export function useTrucksByIdQuery(id: number) {
  return useQuery('getTrucksById', () => client.getTruckById(id));
}

export function useReportTrucksByStatusQuery() {
  return useQuery('reportTrucksByStatus', client.reportTrucksByStatus);
}

export function useReportTrucksByTypeQuery() {
  return useQuery('reportTrucksByType', client.reportTrucksByType);
}

export function useReportTrucksByBlockQuery() {
  return useQuery('reportTrucksByBlock', client.reportTrucksByBlock);
}

export function useSearchTrucksByStatusQuery(s: PermitStatus) {
  return useQuery('searchTrucksByStatus', () => client.searchTrucksByStatus(s));
}

export function useSearchTrucksByTypeQuery(t: ProprietorType) {
  return useQuery('searchTrucksByType', () => client.searchTrucksByType(t));
}

export function useSearchTrucksByFoodQuery(f: string) {
  return useQuery('searchTrucksByFood', () => client.searchTrucksByFood(f));
}

export function useSearchTrucksByNameQuery(n: string) {
  return useQuery('searchTrucksByName', () => client.searchTrucksByName(n));
}
