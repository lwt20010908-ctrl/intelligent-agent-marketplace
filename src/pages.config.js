import About from './pages/About';
import AgentDetail from './pages/AgentDetail';
import AgentManagement from './pages/AgentManagement';
import CaseStudies from './pages/CaseStudies';
import Dashboard from './pages/Dashboard';
import Developer from './pages/Developer';
import Home from './pages/Home';
import MerchantWorkspace from './pages/MerchantWorkspace';
import Resources from './pages/Resources';
import TalentShowcase from './pages/TalentShowcase';
import WorkspaceAgents from './pages/WorkspaceAgents';
import Marketplace from './pages/Marketplace';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AgentDetail": AgentDetail,
    "AgentManagement": AgentManagement,
    "CaseStudies": CaseStudies,
    "Dashboard": Dashboard,
    "Developer": Developer,
    "Home": Home,
    "MerchantWorkspace": MerchantWorkspace,
    "Resources": Resources,
    "TalentShowcase": TalentShowcase,
    "WorkspaceAgents": WorkspaceAgents,
    "Marketplace": Marketplace,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};