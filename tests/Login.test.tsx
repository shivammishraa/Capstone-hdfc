/// <reference types="jest" />

import { act, render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../src/pages/Login";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { loginUser } from "../src/services/authService";
import { loginSuccess } from "../src/redux/authSlice";
import { toast } from "react-toastify";

jest.mock("../src/services/authService", () => ({
  loginUser: jest.fn(),
}));

jest.mock("../src/utils/encryptedPassword", () => ({
  encryptPassword: jest.fn(() => "encrypted-password"),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../public/HDFC_Life_Logo.svg", () => "test-file-stub");
jest.mock("../../public/HDFC_Life_Background.svg", () => "test-file-stub");

const mockStore = configureStore([]);
const renderWithProviders = (store: any) =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

describe("Login Page", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    jest.clearAllMocks();
  });

  it("renders username and password inputs", () => {
    renderWithProviders(store);
    expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    renderWithProviders(store);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/must contain at least one uppercase/i)).toBeInTheDocument();
    });
  });

  it("submits form with valid credentials and dispatches loginSuccess", async () => {
    (loginUser as jest.Mock).mockResolvedValue({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });

    renderWithProviders(store);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
        target: { value: "Shivam" }, // ✅ uppercase
      });
      fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
        target: { value: "Password123!" }, // ✅ meets all schema rules
      });
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith("Shivam", "encrypted-password");
      expect(store.dispatch).toHaveBeenCalledWith(
        loginSuccess({
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
        })
      );
    });
  });

it("shows error toast on failed login", async () => {
  (loginUser as jest.Mock).mockRejectedValue({ status: 401 });

  renderWithProviders(store);

  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "Shivam" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "WrongPass123!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
  });

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith("Unauthorized: Invalid or expired token.");
  });
});

  it("disables button while loading", async () => {
    (loginUser as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) =>
        setTimeout(() => resolve({ accessToken: "token", refreshToken: "refresh" }), 1000)
      );
    });

    renderWithProviders(store);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
        target: { value: "Shivam" },
      });
      fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
        target: { value: "Password123!" },
      });
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
