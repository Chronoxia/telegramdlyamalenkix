import SignUpContainer from "containers/SignUpContainer";
import LogInContainer from "containers/LogInContainer";
import ChatPageContainer from "containers/ChatPageContainer";

const routes = [
    {
        path:"/login",
        component: LogInContainer,
        exact: true
    },
    {
        path:"/signup",
        component: SignUpContainer,
        exact: true
    },
];

export default routes