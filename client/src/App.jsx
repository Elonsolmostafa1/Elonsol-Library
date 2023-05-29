import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AddBook from './Components/AddBook/AddBook';
import Book from './Components/Book/Book';
import Home from './Components/Home/Home';
import IssuedBooks from './Components/IssuedBooks/IssuedBooks';
import Login from './Components/Login/Login';
import NonReturnedBooks from './Components/NonReturnedBooks/NonReturnedBooks';
import Profile from './Components/Profile/Profile';
import RootLayout from './Components/RootLayout/RootLayout';
import SignUp from './Components/SignUp/SignUp';
import UserContextProvider from './Context/UserContext';


let routers = createBrowserRouter([
  {path:'/', element: <RootLayout/>, children:[
    {index:true, element: <SignUp/>},
    {path:"login", element: <Login/>},
    {path:"home", element: <Home/>},
    {path:"addBook", element: <AddBook/>},
    {path:"Book/:id", element: <Book/>},
    {path:"profile", element: <Profile/>},
    {path:"nonReturnedBooks", element: <NonReturnedBooks/>},
    {path:"issuedBooks", element: <IssuedBooks/>},
    
  ]}
])

function App() {
  return <>
        <UserContextProvider>
              <RouterProvider router={routers}/>
        </UserContextProvider>
    
        </>
    ;
}

export default App;
