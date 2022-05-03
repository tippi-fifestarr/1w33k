import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/global/Navbar";
import FooterOwn from "./components/global/FooterOwn";
import Home from "./pages/home/Home";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import AboutUs from "./pages/aboutUs/AboutUs";
import Profile from "./pages/profile/Profile";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/aboutUs" element={<AboutUs />} />
          {/* bottom of profile has nft timeline */}
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/stackTimer" element={<Timer />} /> */}
          {/* home has the setupStack */}
          <Route path="/" element={<Home />} />
        </Routes>
      </Content>
      <Footer>
        <FooterOwn />
      </Footer>
    </Layout>
  );
}

export default App;
