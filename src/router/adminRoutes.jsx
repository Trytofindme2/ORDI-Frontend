import AdminLayout from "../layouts/adminLayout"
import Login from "../pages/admin/login";
import SignUp from "../pages/admin/signup";
import Dashboard from "../pages/admin/dashboard";
import UserManage from "../pages/admin/userManage";
import ReportMangement from "../pages/admin/reportMangement";


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
      },
      {
        path : 'report',
        element : <ReportMangement/>
      }
    ]
  }
];

export default adminRoutes; 
