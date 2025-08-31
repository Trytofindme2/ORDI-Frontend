import UserLayout from '../layouts/userLayout'
import SignUp from '../pages/user/signup';
import LogIn from '../pages/user/login';
import VerificationProtected from '../protector/VerificationRouteGuard';
import Post from '../pages/user/post';
import Profile from '../pages/user/profile'
import Edituserinfo from '../pages/user/edituserinfo';
import FriendList from '../pages/user/FriendAndFollowList';
import AddRecipe from '../pages/user/addReceipe';
import Setting from '../pages/user/setting';
import PostDetail from '../pages/user/postDetail';
import Notification from '../pages/user/notification';
import MessageList from '../pages/user/message';
import Conversation from '../pages/user/converstaion'
import SavePost from '../pages/user/savePost';
import Friend from '../pages/user/Friend';
import SearchUserProfile from '../pages/user/SearchUserProfile';

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
            },
            {
                path : 'notification',
                element : <Notification/>
            },
            {
                path : 'friend',
                element : <Friend/>
            },
            {
                path : 'message',
                element : <MessageList/>
            },
            {
                path : 'conversation/:friendId',
                element : <Conversation/>
            },
            {
                path : 'savePostList',
                element : <SavePost/>
            },
            {
                path : 'searchuserprofile/:email/:searchUserId',
                element : <SearchUserProfile/>
            },
        ]
    }
]

export default userRoutes;