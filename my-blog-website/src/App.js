import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './Components/BeforeLogIn/Home/Home';
import ReactNotes from './Components/BeforeLogIn/React/ReactNotes';
import NotePage from './Components/BeforeLogIn/NotePage/NotePage';
import NodeJSNotes from './Components/BeforeLogIn/NodeJs/NodeJSNotes';
import SeoNotes from './Components/BeforeLogIn/SEO/SeoNotes';
import JavaScriptNotes from './Components/BeforeLogIn/JavaScript/JavaScriptNotes';
import ReactNativeNotes from './Components/BeforeLogIn/ReactNative/ReactNativeNotes';
import SignIn from './Components/AfterLogIn/LogIn/SignIn/SignIn';
import ForgetPassword from './Components/AfterLogIn/LogIn/ForgetPassword/ForgetPassword';
import { useEffect } from 'react';
import axios from 'axios';
import { API } from './API/Api';
import MyInformation from './Components/AfterLogIn/MyInformation/MyInformation';
import NotesList from './Components/AfterLogIn/Notes/NotesList/NotesList';
import EnglishWordsList from './Components/AfterLogIn/EnglishWords/EnglishWordsList/EnglishWordsList';
import NotesUpdate from './Components/AfterLogIn/Notes/NotesUpdate/NotesUpdate';
import NoteAdd from './Components/AfterLogIn/Notes/NoteAdd/NoteAdd';
import EnglishWordUpdate from './Components/AfterLogIn/EnglishWords/EnglishWordUpdate/EnglishWordUpdate';
import EnglishWordAdd from './Components/AfterLogIn/EnglishWords/EnglishWordAdd/EnglishWordAdd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIsLogin } from './redux/actions/currencyActions';
import EnglishTest from './Components/BeforeLogIn/EnglishTest/EnglishTest';

axios.defaults.withCredentials = true;

function App(props) {

  const getLoggedIn = async () => {
    await axios.get(API + "/authentication/loggedIn")
      .then(async () => {
        await props.setIsLogin(true);
      })
      .catch(async (error) => {
        if (error.response) {
          if (error.response.data.isLogin)
          await props.setIsLogin(false)
        }
      });
  }

  useEffect(() => {
    getLoggedIn();
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/react" element={<ReactNotes />} />
        <Route path="/react/:url" element={<NotePage />} />
        <Route path="/nodejs" element={<NodeJSNotes />} />
        <Route path="/nodejs/:url" element={<NotePage />} />
        <Route path="/seo" element={<SeoNotes />} />
        <Route path="/seo/:url" element={<NotePage />} />
        <Route path="/javascript" element={<JavaScriptNotes />} />
        <Route path="/javascript/:url" element={<NotePage />} />
        <Route path="/react-native" element={<ReactNativeNotes />} />
        <Route path="/react-native/:url" element={<NotePage />} />
        <Route path="/english-test/" element={<EnglishTest />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        {
          props.isLogin ? <>
          <Route path="/my-information" element={<MyInformation />} />
          <Route path="/notes/list" element={<NotesList />} />
          <Route path="/notes/add" element={<NoteAdd />} />
          <Route path="/notes/update/:id" element={<NotesUpdate />} />
          <Route path="/english-test/list" element={<EnglishWordsList />} />
          <Route path="/english-test/add" element={<EnglishWordAdd />} />
          <Route path="/english-test/word/update/:id" element={<EnglishWordUpdate />} />
        </>:null
        }
      </Routes>
    </>
  );
}

const mapStateToProps = state => {
  return {
      isLogin:state.currencyListReducer.isLogin
  }
};

const mapDispatchToProps = dispatch => (
  (
    bindActionCreators({
      setIsLogin
    },dispatch)
  )
);

export default connect(mapStateToProps,mapDispatchToProps)(App);
