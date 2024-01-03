const authMiddleware = require("../middleware/auth");

describe("Authentication Middleware", () => {
  it("should return 401 when token is missing", () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized - Missing Token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 with invalid token", () => {
    const req = { headers: { authorization: "invalidtoken" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized - Invalid Token",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
