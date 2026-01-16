import About from './pages/About';
import AgentDetail from './pages/AgentDetail';
import AgentManagement from './pages/AgentManagement';
import CaseStudies from './pages/CaseStudies';
import Developer from './pages/Developer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MerchantWorkspace from './pages/MerchantWorkspace';
import Resources from './pages/Resources';
import TalentShowcase from './pages/TalentShowcase';
import WorkspaceAgents from './pages/WorkspaceAgents';
import Dashboard from './pages/Dashboard';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AgentDetail": AgentDetail,
    "AgentManagement": AgentManagement,
    "CaseStudies": CaseStudies,
    "Developer": Developer,
    "Home": Home,
    "Marketplace": Marketplace,
    "MerchantWorkspace": MerchantWorkspace,
    "Resources": Resources,
    "TalentShowcase": TalentShowcase,
    "WorkspaceAgents": WorkspaceAgents,
    "Dashboard": Dashboard,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};