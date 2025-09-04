// /// <reference types="jest" />
// import React from 'react';
// import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import { configureStore } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
// import type { MockedFunction } from 'jest-mock';
// import Login from '../src/pages/Login';
// import authReducer from '../src/redux/authSlice';
// import * as authService from '../src/services/authService';

// // Type definitions for Jest
// // declare global {
// //   namespace jest {
// //     interface MockedFunction<T extends (...args: any[]) => any> extends Mock<ReturnType<T>, Parameters<T>> {
// //       new (...args: Parameters<T>): ReturnType<T>;
// //       (...args: Parameters<T>): ReturnType<T>;
// //     }
// //   }
// // }

// // Mock dependencies
// jest.mock('react-toastify', () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// jest.mock('../src/services/authService', () => ({
//   loginUser: jest.fn(),
// }));

// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockNavigate,
// }));

// jest.mock('framer-motion', () => ({
//   motion: {
//     div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//     form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
//     img: ({ ...props }: any) => <img {...props} />,
//     button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
//   },
// }));

// // Mock store setup
// const createMockStore = (initialState = {}) => {
//   return configureStore({
//     reducer: {
//       auth: authReducer,
//     },
//     preloadedState: {
//       auth: {
//         accessToken: null,
//         refreshToken: null,
//         isAuthenticated: false,
//         ...initialState,
//       },
//     },
//   });
// };

// // Test wrapper component
// const TestWrapper: React.FC<{ 
//   children: React.ReactNode; 
//   store?: any; 
// }> = ({ children, store = createMockStore() }) => (
//   <Provider store={store}>
//     <BrowserRouter>
//       {children}
//     </BrowserRouter>
//   </Provider>
// );

// describe('Login Component', () => {
//   const mockLoginUser = authService.loginUser as jest.MockedFunction<typeof authService.loginUser>;

//   beforeEach(() => {
//     jest.clearAllMocks();
//     mockNavigate.mockClear();
//     // Clear localStorage
//     localStorage.clear();
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   describe('Component Rendering', () => {
//     it('should render login form with all required elements', () => {
//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       // Check if main elements are present
//       expect(screen.getByText('Welcome to HDFC Life')).toBeInTheDocument();
//       expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//       expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
//       expect(screen.getByAltText('HDFC LIFE')).toBeInTheDocument();
//     });

//     it('should render footer with correct copyright year', () => {
//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const currentYear = new Date().getFullYear();
//       expect(screen.getByText(`© ${currentYear} HDFC Life. All rights reserved.`)).toBeInTheDocument();
//       expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
//       expect(screen.getByText('Terms of Service')).toBeInTheDocument();
//       expect(screen.getByText('Contact Us')).toBeInTheDocument();
//     });

//     it('should have proper input placeholders', () => {
//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
//       expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
//     });
//   });

//   describe('Form Validation', () => {
//     it('should show validation error for empty username', async () => {
//       const user = userEvent.setup();
      
//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const submitButton = screen.getByRole('button', { name: /login/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/Password must contain at least one uppercase letter/i)).toBeInTheDocument();
//       });
//     });

//     it('should show validation error for invalid password format', async () => {
//       const user = userEvent.setup();
      
//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'weak');
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
//       });
//     });

//     it('should show validation error for password without uppercase letter', async () => {
//       const user = userEvent.setup();
      
//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'password123!');
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/Password must contain at least one uppercase letter/i)).toBeInTheDocument();
//       });
//     });

//     it('should show validation error for password without special character', async () => {
//       const user = userEvent.setup();
      
//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123');
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/Password must contain at least one special character/i)).toBeInTheDocument();
//       });
//     });

//     it('should show validation error for password with forbidden characters', async () => {
//       const user = userEvent.setup();
      
//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123$');
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/Password cannot contain \$ or \| characters/i)).toBeInTheDocument();
//       });
//     });

//     it('should show validation error for password without number', async () => {
//       const user = userEvent.setup();
      
//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password!');
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/Password must contain at least one number/i)).toBeInTheDocument();
//       });
//     });
//   });

//   describe('Successful Login', () => {
//     it('should handle successful login and redirect to dashboard', async () => {
//       const user = userEvent.setup();
//       const mockResponse = {
//         accessToken: 'mock-access-token',
//         refreshToken: 'mock-refresh-token',
//       };

//       mockLoginUser.mockResolvedValueOnce(mockResponse);

//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.click(submitButton);
//       });

//       await waitFor(() => {
//         expect(mockLoginUser).toHaveBeenCalledWith('TestUser', 'Password123!');
//         expect(toast.success).toHaveBeenCalledWith('Login successful ✅');
//         expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
//       });
//     });

//     it('should dispatch loginSuccess action on successful login', async () => {
//       const user = userEvent.setup();
//       const store = createMockStore();
//       const mockResponse = {
//         accessToken: 'mock-access-token',
//         refreshToken: 'mock-refresh-token',
//       };

//       mockLoginUser.mockResolvedValueOnce(mockResponse);

//       render(
//         <TestWrapper store={store}>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.click(submitButton);
//       });

//       await waitFor(() => {
//         const state = store.getState();
//         expect(state.auth.isAuthenticated).toBe(true);
//         expect(state.auth.accessToken).toBe('mock-access-token');
//         expect(state.auth.refreshToken).toBe('mock-refresh-token');
//       });
//     });
//   });

//   describe('Error Handling', () => {
//     it('should handle 400 error (invalid input)', async () => {
//       const user = userEvent.setup();
//       const mockError = {
//         status: 400,
//         message: 'Invalid credentials',
//       };

//       mockLoginUser.mockRejectedValueOnce(mockError);

//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.click(submitButton);
//       });

//       await waitFor(() => {
//         expect(toast.error).toHaveBeenCalledWith('Invalid input. Please check username/password.');
//       });
//     });

//     it('should handle 401 error (unauthorized)', async () => {
//       const user = userEvent.setup();
//       const mockError = {
//         status: 401,
//         message: 'Unauthorized',
//       };

//       mockLoginUser.mockRejectedValueOnce(mockError);

//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.click(submitButton);
//       });

//       await waitFor(() => {
//         expect(toast.error).toHaveBeenCalledWith('Unauthorized: Invalid or expired token.');
//       });
//     });

//     it('should handle 403 error (forbidden)', async () => {
//       const user = userEvent.setup();
//       const mockError = {
//         status: 403,
//         message: 'Forbidden',
//       };

//       mockLoginUser.mockRejectedValueOnce(mockError);

//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.click(submitButton);
//       });

//       await waitFor(() => {
//         expect(toast.error).toHaveBeenCalledWith("Forbidden: You don't have access.");
//       });
//     });

//     it('should handle 500 error (server error)', async () => {
//       const user = userEvent.setup();
//       const mockError = {
//         status: 500,
//         message: 'Internal server error',
//       };

//       mockLoginUser.mockRejectedValueOnce(mockError);

//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.click(submitButton);
//       });

//       await waitFor(() => {
//         expect(toast.error).toHaveBeenCalledWith('Server error. Please try again later.');
//       });
//     });

//     it('should handle generic error', async () => {
//       const user = userEvent.setup();
//       const mockError = {
//         status: 999,
//         message: 'Unknown error',
//       };

//       mockLoginUser.mockRejectedValueOnce(mockError);

//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.click(submitButton);
//       });

//       await waitFor(() => {
//         expect(toast.error).toHaveBeenCalledWith('Unknown error');
//       });
//     });
//   });

//   describe('Loading State', () => {
//     it('should show loading state during login process', async () => {
//       const user = userEvent.setup();
//       let resolvePromise: (value: any) => void;
      
//       const loginPromise = new Promise((resolve) => {
//         resolvePromise = resolve;
//       });
      
//       mockLoginUser.mockReturnValueOnce(loginPromise);

//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.click(submitButton);
//       });

//       // Check loading state
//       expect(screen.getByText('Logging in...')).toBeInTheDocument();
//       expect(submitButton).toBeDisabled();

//       // Resolve the promise
//       act(() => {
//         resolvePromise!({
//           accessToken: 'mock-access-token',
//           refreshToken: 'mock-refresh-token',
//         });
//       });

//       await waitFor(() => {
//         expect(screen.getByText('Login')).toBeInTheDocument();
//         expect(submitButton).not.toBeDisabled();
//       });
//     });
//   });

//   describe('User Interactions', () => {
//     it('should handle form submission with Enter key', async () => {
//       const user = userEvent.setup();
//       const mockResponse = {
//         accessToken: 'mock-access-token',
//         refreshToken: 'mock-refresh-token',
//       };

//       mockLoginUser.mockResolvedValueOnce(mockResponse);

//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.type(passwordInput, '{enter}');
//       });

//       await waitFor(() => {
//         expect(mockLoginUser).toHaveBeenCalledWith('TestUser', 'Password123!');
//       });
//     });
//   });

//   describe('Edge Cases', () => {
//     it('should handle empty response from login service', async () => {
//       const user = userEvent.setup();
//       mockLoginUser.mockResolvedValueOnce(null);

//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.click(submitButton);
//       });

//       await waitFor(() => {
//         expect(mockLoginUser).toHaveBeenCalledWith('TestUser', 'Password123!');
//         // Should not navigate or show success message for null response
//         expect(toast.success).not.toHaveBeenCalled();
//       });
//     });

//     it('should handle response without accessToken', async () => {
//       const user = userEvent.setup();
//       const mockResponse = {
//         refreshToken: 'mock-refresh-token',
//       };

//       mockLoginUser.mockResolvedValueOnce(mockResponse);

//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       const usernameInput = screen.getByPlaceholderText('Enter your username');
//       const passwordInput = screen.getByPlaceholderText('Enter your password');
//       const submitButton = screen.getByRole('button', { name: /login/i });

//       await user.type(usernameInput, 'TestUser');
//       await user.type(passwordInput, 'Password123!');

//       await act(async () => {
//         await user.click(submitButton);
//       });

//       await waitFor(() => {
//         expect(mockLoginUser).toHaveBeenCalledWith('TestUser', 'Password123!');
//         // Should not navigate or show success message without accessToken
//         expect(toast.success).not.toHaveBeenCalled();
//       });
//     });
//   });

//   describe('Accessibility', () => {
//     it('should have proper ARIA labels and roles', () => {
//       render(
//         <TestWrapper>
//           <Login />
//         </TestWrapper>
//       );

//       expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
//       expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//     });
//   });
// });
