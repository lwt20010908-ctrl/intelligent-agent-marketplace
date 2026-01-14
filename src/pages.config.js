import About from './pages/About';
import AgentDetail from './pages/AgentDetail';
import AgentManagement from './pages/AgentManagement';
import Dashboard from './pages/Dashboard';
import Developer from './pages/Developer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MerchantWorkspace from './pages/MerchantWorkspace';
import WorkspaceAgents from './pages/WorkspaceAgents';
import TalentShowcase from './pages/TalentShowcase';
import Resources from './pages/Resources';
import CaseStudies from './pages/CaseStudies';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AgentDetail": AgentDetail,
    "AgentManagement": AgentManagement,
    "Dashboard": Dashboard,
    "Developer": Developer,
    "Home": Home,
    "Marketplace": Marketplace,
    "MerchantWorkspace": MerchantWorkspace,
    "WorkspaceAgents": WorkspaceAgents,
    "TalentShowcase": TalentShowcase,
    "Resources": Resources,
    "CaseStudies": CaseStudies,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};