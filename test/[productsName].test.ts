import handler from '../src/pages/api/[shopName]/[productsName]';
import { NextApiRequest, NextApiResponse } from 'next';

const mockReq = (overrides = {}) => ({
    method: 'GET',
    query: {},
    body: {},
    ...overrides,
  });
  
const mockRes = (): Partial<NextApiResponse> => {
    const res: Partial<NextApiResponse> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn(() => ({
      select: jest.fn().mockResolvedValue({ data: [{ id: 1, name: 'Product A' }] }),
      insert: jest.fn().mockResolvedValue({ data: [{ id: 1, name: 'Product A' }] }),
      update: jest.fn(() => ({ match: jest.fn().mockResolvedValue({ error: null }) })),
      delete: jest.fn(() => ({ match: jest.fn().mockResolvedValue({ error: null }) })),
    })),
  }),
}));

describe('API Handler', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = mockReq() as NextApiRequest;
    res = mockRes() as NextApiResponse;
  });

  it('should return 400 if shopName or productsName is missing', async () => {
    req.query = {};
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'The shop or product is not available',
    });
  });

  it('should handle GET method and return products', async () => {
    req.method = 'GET';
    req.query = { shopName: 'Shop1', productsName: 'Product1' };
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: [{ id: 1, name: 'Product A' }],
    });
  });

  it('should handle POST method and create a product', async () => {
    req.method = 'POST';
    req.query = { shopName: 'Shop1', productsName: 'Product1' };
    req.body = { price: 100, stock: 10, description: 'Test product' };
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Product created',
      data: [{ id: 1, name: 'Product A' }],
    });
  });

  it('should handle PUT method and update a product', async () => {
    req.method = 'PUT';
    req.query = { shopName: 'Shop1', productsName: 'Product1' };
    req.body = { price: 200 };
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Product updated',
    });
  });

  it('should handle DELETE method and delete a product', async () => {
    req.method = 'DELETE';
    req.query = { shopName: 'Shop1', productsName: 'Product1' };
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Product deleted',
    });
  });

  it('should return 405 for unsupported methods', async () => {
    req.method = 'PATCH';
    req.query = { shopName: 'Shop1', productsName: 'Product1' };
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Method PATCH not allowed',
    });
  });
});