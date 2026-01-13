import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import AgentDetail from './pages/AgentDetail';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Marketplace": Marketplace,
    "AgentDetail": AgentDetail,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};