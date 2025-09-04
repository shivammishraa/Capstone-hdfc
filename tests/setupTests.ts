// import '@testing-library/jest-dom';

// // Extend the global object for Jest types
// declare global {
//   namespace jest {
//     interface Mock<T = any, Y extends any[] = any[]> extends Function {
//       new (...args: Y): T;
//       (...args: Y): T;
//     }
//   }
  
//   var describe: (description: string, specDefinitions: () => void) => void;
//   var it: (description: string, specDefinition: () => void) => void;
//   var expect: jest.Expect;
//   var beforeAll: (action: () => void) => void;
//   var afterAll: (action: () => void) => void;
//   var beforeEach: (action: () => void) => void;
//   var afterEach: (action: () => void) => void;
//   var jest: jest.Jest;
// }

// // Mock IntersectionObserver
// (global as any).IntersectionObserver = class IntersectionObserver {
//   root: Element | null = null;
//   rootMargin: string = '';
//   thresholds: ReadonlyArray<number> = [];
  
//   constructor(private callback: IntersectionObserverCallback, private options?: IntersectionObserverInit) {}
  
//   disconnect() {}
//   observe() {}
//   unobserve() {}
//   takeRecords(): IntersectionObserverEntry[] {
//     return [];
//   }
// };

// // Mock ResizeObserver
// (global as any).ResizeObserver = class ResizeObserver {
//   constructor(private callback: ResizeObserverCallback) {}
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// };

// // Mock matchMedia
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: (query: string) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: () => {}, // deprecated
//     removeListener: () => {}, // deprecated
//     addEventListener: () => {},
//     removeEventListener: () => {},
//     dispatchEvent: () => {},
//   }),
// });

// // Mock window.location
// Object.defineProperty(window, 'location', {
//   value: {
//     href: 'http://localhost/',
//     assign: () => {},
//     replace: () => {},
//     reload: () => {},
//   },
//   writable: true,
// });

// // Mock localStorage with proper Storage interface
// const createStorageMock = (): Storage => ({
//   length: 0,
//   clear: () => {},
//   getItem: () => null,
//   key: () => null,
//   removeItem: () => {},
//   setItem: () => {},
// });

// Object.defineProperty(window, 'localStorage', {
//   value: createStorageMock(),
//   writable: true,
// });

// Object.defineProperty(window, 'sessionStorage', {
//   value: createStorageMock(),
//   writable: true,
// });

// // Mock console.warn for cleaner test output
// const originalWarn = console.warn;

// // Setup and teardown functions will be available globally
// if (typeof beforeAll !== 'undefined') {
//   beforeAll(() => {
//     console.warn = () => {};
//   });

//   afterAll(() => {
//     console.warn = originalWarn;
//   });

//   // Clean up after each test
//   afterEach(() => {
//     // Reset all mocks
//     if (typeof jest !== 'undefined' && jest.clearAllMocks) {
//       jest.clearAllMocks();
//     }
    
//     // Clear storage
//     localStorage.clear();
//     sessionStorage.clear();
//   });
// }

// // tests/__mocks__/fileMock.ts
// // This should be in a separate file at tests/__mocks__/fileMock.ts
// export default 'test-file-stub';