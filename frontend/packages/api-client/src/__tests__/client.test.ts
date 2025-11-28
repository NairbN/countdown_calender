import { createApiClient, userSchema } from "../index";

describe("createApiClient", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("sends auth header when token provided", async () => {
    const mockUser = {
      id: crypto.randomUUID(),
      email: "test@example.com",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify(mockUser), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );

    const client = createApiClient({
      baseUrl: "http://api",
      getToken: () => "token-123",
    });

    const user = await client.me();
    expect(user).toEqual(userSchema.parse(mockUser));

    expect(fetchSpy).toHaveBeenCalledWith(
      "http://api/auth/me",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token-123",
        }),
        method: "GET",
      })
    );
  });

  it("throws on non-OK response", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("bad", { status: 400 }));

    const client = createApiClient({ baseUrl: "http://api" });
    await expect(client.listEvents()).rejects.toThrow("Request failed with status 400");
    expect(fetchSpy).toHaveBeenCalled();
  });
});
