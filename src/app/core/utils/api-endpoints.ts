export const apiEndpoints = {
  user: 'user/profile',
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/logout',
    refresh: 'auth/refresh',
    google: 'auth/google',
  },
  books: {
    get: 'books',
    add: 'books',
    delete: 'books',
    updateStatus: 'books/status',
    updateReview: 'books/review',
  },
  training: {
    get: 'training',
    add: 'training',
    updateResults: 'training/results',
  },
};
