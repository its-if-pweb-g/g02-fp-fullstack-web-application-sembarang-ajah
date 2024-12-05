import handler from "../src/pages/api/[shopName]/[productsName]";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      insert: jest.fn(),
      select: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      match: jest.fn().mockReturnThis(),
    })),
  })),
}));

const mockSupabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

const mockJson = jest.fn();
const mockStatus = jest.fn(() => ({ json: mockJson }));
const mockRes = { status: mockStatus } as unknown as NextApiResponse;

describe("API Handler Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if shopName or productsName is missing", async () => {
    const mockReq = {
      method: "GET",
      query: {},
    } as unknown as NextApiRequest;

    await handler(mockReq, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: "error",
      error: "The shop or product is not available",
    });
  });

  it("should return product list for GET request", async () => {
    const mockReq = {
      method: "GET",
      query: { shopName: "Test Shop", productsName: "Test Product" },
    } as unknown as NextApiRequest;

    const mockData = [{ name: "Test Product", price: 100 }];
    mockSupabase.from().select.mockResolvedValueOnce({ data: mockData, error: null });

    await handler(mockReq, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      data: mockData,
    });
  });

  it("should create a product for POST request", async () => {
    const mockReq = {
      method: "POST",
      query: { shopName: "Test Shop", productsName: "Test Product" },
      body: { price: 100, stock: 10, description: "Test Description" },
    } as unknown as NextApiRequest;

    const mockInsertData = [{ id: 1 }];
    mockSupabase.from().insert.mockResolvedValueOnce({ data: mockInsertData, error: null });

    await handler(mockReq, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      message: "Product created",
      data: mockInsertData,
    });
  });

  it("should return 400 if POST request body is incomplete", async () => {
    const mockReq = {
      method: "POST",
      query: { shopName: "Test Shop", productsName: "Test Product" },
      body: { price: 100 },
    } as unknown as NextApiRequest;

    await handler(mockReq, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: "error",
      error: "Missing product details",
    });
  });

  it("should update a product for PUT request", async () => {
    const mockReq = {
      method: "PUT",
      query: { shopName: "Test Shop", productsName: "Test Product" },
      body: { price: 200 },
    } as unknown as NextApiRequest;

    mockSupabase.from().update.mockResolvedValueOnce({ data: null, error: null });

    await handler(mockReq, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      message: "Product updated",
    });
  });

  it("should delete a product for DELETE request", async () => {
    const mockReq = {
      method: "DELETE",
      query: { shopName: "Test Shop", productsName: "Test Product" },
    } as unknown as NextApiRequest;

    mockSupabase.from().delete.mockResolvedValueOnce({ data: null, error: null });

    await handler(mockReq, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      message: "Product deleted",
    });
  });

  it("should return 405 for unsupported method", async () => {
    const mockReq = {
      method: "PATCH",
      query: { shopName: "Test Shop", productsName: "Test Product" },
    } as unknown as NextApiRequest;

    await handler(mockReq, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(405);
    expect(mockJson).toHaveBeenCalledWith({
      status: "error",
      error: `Method PATCH not allowed`,
    });
  });
});
