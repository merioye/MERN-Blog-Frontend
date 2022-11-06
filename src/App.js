import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Signin from './pages/signin/Signin';
import Logout from './pages/logout/Logout';
import Profile from './pages/profile/Profile';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';
import WriteBlog from './pages/writeBlog/WriteBlog';
import SinglePost from './pages/singlePost/SinglePost';
import Search from './pages/search/Search';
import Error from './pages/error/Error';




const App = ()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/post/:id' component={SinglePost} />
                <Route path='/write' component={WriteBlog} />
                <Route path='/search' component={Search} />
                <Route path='/contact' component={Contact}/>
                <Route path='/about' component={About}/>
                <Route path='/signin' component={Signin} />
                <Route path='/signup' component={Signup} />
                <Route path='/logout' component={Logout} />
                <Route path='/resetpassword/:token' component={ResetPassword} />
                <Route path='/forgotpassword' component={ForgotPassword} />
                <Route path='/profile' component={Profile}/>  
                <Route component={Error}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;