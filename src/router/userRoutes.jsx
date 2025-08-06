import UserLayout from '../layouts/userLayout'
import SignUp from '../pages/user/signup';
import LogIn from '../pages/user/login';
import VerificationProtected from '../protector/VerificationRouteGuard';
import Post from '../pages/user/post';
import Profile from '../pages/user/profile'
import Edituserinfo from '../pages/user/edituserinfo';
import FriendList from '../pages/user/friendList'
import AddRecipe from '../pages/user/addReceipe';
import Setting from '../pages/user/setting';
import PostDetail from '../pages/user/postDetail';



const userRoutes = [
    {
        path : '/user/sign-up',
        element : <SignUp/>
    },
    {
        path : '/user/verification',
        element : <VerificationProtected/>
    },
    {
        path : '/user/log-in',
        element : <LogIn/>
    },
    {
        path : '/user/ordi',
        element : <UserLayout/>,
        children : [
            {
                path : 'profile',
                element : <Profile/>
            },
            {
                path : 'main',
                element : <Post/>
            },
            {
                path : 'detail/:id',
                element : <PostDetail/>
            },
            {
                path : 'editProfile',
                element : <Edituserinfo/>
            },
            {
                path : 'friendlist',
                element : <FriendList/>
            },
            {
                path : 'addReceipe',
                element : <AddRecipe/>
            },
            {
                path : 'setting',
                element : <Setting/>
            }
        ]
    }
]

export default userRoutes;