import AdminLayout from "../layouts/adminLayout"
import Login from "../pages/admin/login";
import SignUp from "../pages/admin/signup";
import Dashboard from "../pages/admin/dashboard";
import UserManage from "../pages/admin/userManage";


const adminRoutes = [
  {
    path: '/admin/log-in',
    element: <Login />
  },
  {
    path : '/admin/sign-up',
    element : <SignUp/>
  },
  {
    path : '/admin/dashboard',
    element : <AdminLayout/>,
    children : [
      {
        index : 'true',
        element : <Dashboard/>
      },
      {
        path : 'usermanage',
        element : <UserManage/>
      }
    ]
  }
];

export default adminRoutes; 
