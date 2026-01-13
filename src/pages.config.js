import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import AgentDetail from './pages/AgentDetail';
import Developer from './pages/Developer';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import MerchantWorkspace from './pages/MerchantWorkspace';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Marketplace": Marketplace,
    "AgentDetail": AgentDetail,
    "Developer": Developer,
    "About": About,
    "Dashboard": Dashboard,
    "MerchantWorkspace": MerchantWorkspace,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};