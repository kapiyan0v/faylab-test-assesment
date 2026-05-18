import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ApiKeysPage from './pages/ApiKeysPage';
import ChatPage from './pages/ChatPage';
import ModelsPage from './pages/ModelsPage';
import UsagePage from './pages/UsagePage';
import BillingPage from './pages/BillingPage';
import PlaygroundPage from './pages/PlaygroundPage';
import NodeRewardsPage from './pages/NodeRewardsPage';
import SettingsPage from './pages/SettingsPage';
import DocsPage from './pages/DocsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/api-keys" replace />} />
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/api-keys" element={<ApiKeysPage />} />
        <Route path="/usage" element={<UsagePage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/node-rewards" element={<NodeRewardsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/api-keys" replace />} />
      </Route>
    </Routes>
  );
}
