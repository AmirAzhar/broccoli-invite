import { submitInvite } from "./invite";
import { InviteFormData } from "../components/InviteFormModal/InviteFormModal.d";

jest.mock("../config/config", () => ({
  config: {
    INVITE_API_URL: "http://localhost:mock",
  },
}));

describe("submitInvite", () => {
  const mockData: InviteFormData = {
    fullName: "Amir Azhar",
    email: "amir.azhar@airwallex.com",
    confirmEmail: "amir.azhar@airwallex.com",
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns success when response.ok is true", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    const result = await submitInvite(mockData);
    expect(result).toEqual({ success: true, errorMessage: null });
  });

  test("returns error message from response when response.ok is false and errorMessage provided", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ errorMessage: "Server error occurred" }),
      })
    ) as jest.Mock;

    const result = await submitInvite(mockData);
    expect(result).toEqual({ success: false, errorMessage: "Server error occurred" });
  });

  test("returns default error message when response.ok is false and no errorMessage provided", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    const result = await submitInvite(mockData);
    expect(result).toEqual({
      success: false,
      errorMessage: "An error occurred. Please try again.",
    });
  });

  test("returns network error message on fetch rejection", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network failure"))) as jest.Mock;

    const result = await submitInvite(mockData);
    expect(result).toEqual({ success: false, errorMessage: "Network error. Please try again." });
  });
});
