import About from './pages/About';
import AgentDetail from './pages/AgentDetail';
import Dashboard from './pages/Dashboard';
import Developer from './pages/Developer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MerchantWorkspace from './pages/MerchantWorkspace';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AgentDetail": AgentDetail,
    "Dashboard": Dashboard,
    "Developer": Developer,
    "Home": Home,
    "Marketplace": Marketplace,
    "MerchantWorkspace": MerchantWorkspace,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};