import handler from '../src/pages/api/[shopName]/index';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}));

const mockSupabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn(),
};

(createClient as jest.Mock).mockReturnValue(mockSupabase);

const mockReq = (method: string, query: object): Partial<NextApiRequest> => ({
  method,
  query,
});

const mockRes = (): Partial<NextApiResponse> => {
  const res: Partial<NextApiResponse> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('[productsName] API handler', () => {
  it('should return 400 if shopName is not provided', async () => {
    const req = mockReq('GET', {});
    const res = mockRes();

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Shop name is required',
    });
  });

  it('should return 404 if shop is not found', async () => {
    mockSupabase.eq.mockResolvedValueOnce({ data: [] });
    const req = mockReq('GET', { shopName: 'NonExistentShop' });
    const res = mockRes();

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(mockSupabase.from).toHaveBeenCalledWith('products');
    expect(mockSupabase.select).toHaveBeenCalledWith('*');
    expect(mockSupabase.eq).toHaveBeenCalledWith('shop_name', 'NonExistentShop');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Shop not found',
    });
  });

  it('should return 200 with products if shop is found', async () => {
    const mockData = [{ id: 1, name: 'Product A' }];
    mockSupabase.eq.mockResolvedValueOnce({ data: mockData });
    const req = mockReq('GET', { shopName: 'ExistingShop' });
    const res = mockRes();

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(mockSupabase.from).toHaveBeenCalledWith('products');
    expect(mockSupabase.select).toHaveBeenCalledWith('*');
    expect(mockSupabase.eq).toHaveBeenCalledWith('shop_name', 'ExistingShop');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      shopName: 'ExistingShop',
      products: mockData,
    });
  });

  it('should return 405 for unsupported HTTP methods', async () => {
    const req = mockReq('POST', { shopName: 'ExistingShop' });
    const res = mockRes();

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      error: `Method POST not allowed`,
    });
  });

  it('should return 500 if an unexpected error occurs', async () => {
    mockSupabase.eq.mockRejectedValueOnce(new Error('Database error'));
    const req = mockReq('GET', { shopName: 'SomeShop' });
    const res = mockRes();

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Internal server error',
    });
  });
});