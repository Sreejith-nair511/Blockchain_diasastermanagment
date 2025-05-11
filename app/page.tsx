import { DashboardHero } from "@/components/dashboard/dashboard-hero"
import { WalletManager } from "@/components/wallet/wallet-manager"
import { TransactionFeed } from "@/components/transactions/transaction-feed"
import { BlockchainVisualizer } from "@/components/blockchain/blockchain-visualizer"
import { TutorialModal } from "@/components/tutorial-modal"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <TutorialModal />
      <DashboardHero />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2">
          <WalletManager />
        </div>
        <div>
          <TransactionFeed />
        </div>
      </div>
      <div className="mt-8">
        <BlockchainVisualizer />
      </div>
    </main>
  )
}
