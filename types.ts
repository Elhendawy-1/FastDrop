export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export enum TrackingStatus {
  ORDER_PLACED = 'Order Placed',
  PICKED_UP = 'Picked Up',
  IN_TRANSIT = 'In Transit',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  EXCEPTION = 'Exception'
}

export interface TrackingEvent {
  status: TrackingStatus;
  date: string;
  location: string;
  description: string;
}

export interface ShipmentData {
  trackingNumber: string;
  estimatedDelivery: string;
  currentStatus: TrackingStatus;
  origin: string;
  destination: string;
  history: TrackingEvent[];
}

export interface QuoteRequest {
  origin: string;
  destination: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  type: 'standard' | 'express' | 'freight';
}

export interface QuoteResult {
  price: number;
  estimatedDays: number;
  serviceType: string;
}