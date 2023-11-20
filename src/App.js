import './App.css';
import AuthProvider from './contexts/AuthContext/AuthContext';
import BookProvider from './contexts/BookContext/BookContext';
import ReviewProvider from './contexts/ReviewContext/ReviewContext';

import { router } from './router'
import { RouterProvider } from 'react-router-dom';
 

function App() { 
  return (
    <AuthProvider>
       <BookProvider>
        <ReviewProvider>
          <RouterProvider router={router} />  
        </ReviewProvider> 
       </BookProvider>
    </AuthProvider>
  );
}

export default App;
