import React from 'react';
import { NexusProvider, useNexus } from './context/NexusContext';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Toast from './components/Toast';
import IntentModal from './components/IntentModal';

// Views
import Onboarding from './views/Onboarding';
import Dashboard from './views/Dashboard';
import InstitutionHub from './views/InstitutionHub';
import GraphView from './views/GraphView';
import ProofOfWork from './views/ProofOfWork';
import BountyBoard from './views/BountyBoard';
import ReferralInbox from './views/ReferralInbox';

function MainWorkspace() {
  const { isAuthenticated, activeView } = useNexus();

  if (!isAuthenticated) {
    return <Onboarding />;
  }

  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'proof-of-work' && <ProofOfWork />}
        {activeView === 'bounties' && <BountyBoard />}
        {activeView === 'referrals' && <ReferralInbox />}
        {activeView === 'graph' && <GraphView />}
        {activeView === 'institution' && <InstitutionHub />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <NexusProvider>
      <div className="min-h-screen flex flex-col mesh-gradient text-slate-100 selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <MainWorkspace />
        <IntentModal />
        <Toast />
      </div>
    </NexusProvider>
  );
}
