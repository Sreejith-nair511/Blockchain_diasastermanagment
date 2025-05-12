"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, Wallet, ChevronDown } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const connectWallet = (walletType: string) => {
    // Simulate wallet connection
    const mockAddress = "ALGO" + Math.random().toString(36).substring(2, 10).toUpperCase()
    setWalletAddress(mockAddress)
    setIsWalletConnected(true)
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    setIsWalletConnected(false)
  }

  return (
    <header className="bg-dinai-green text-dinai-cream sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-dinai-orange">Dinai</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#disaster-ledger" className="hover:text-dinai-orange transition">
              Disaster Ledger
            </Link>
            <Link href="#relief-request" className="hover:text-dinai-orange transition">
              Relief Request
            </Link>
            <Link href="#ngo-portal" className="hover:text-dinai-orange transition">
              NGO Portal
            </Link>
            <Link href="#smart-contract" className="hover:text-dinai-orange transition">
              Smart Contract
            </Link>
          </nav>

          {/* Wallet Integration */}
          <div className="hidden md:flex items-center space-x-4">
            {isWalletConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-dinai-orange text-dinai-orange hover:bg-dinai-orange/10">
                    <Wallet className="mr-2 h-4 w-4" />
                    {walletAddress.substring(0, 4)}...{walletAddress.substring(walletAddress.length - 4)}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">View Transactions</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Copy Address</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-destructive" onClick={disconnectWallet}>
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-dinai-orange text-dinai-orange hover:bg-dinai-orange/10">
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => connectWallet("pera")}>
                    Pera Wallet
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => connectWallet("myalgo")}>
                    MyAlgo Wallet
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => connectWallet("algosigner")}>
                    AlgoSigner
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-dinai-cream hover:text-dinai-orange focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dinai-green border-t border-dinai-cream/10">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link href="#disaster-ledger" className="block hover:text-dinai-orange transition" onClick={toggleMenu}>
              Disaster Ledger
            </Link>
            <Link href="#relief-request" className="block hover:text-dinai-orange transition" onClick={toggleMenu}>
              Relief Request
            </Link>
            <Link href="#ngo-portal" className="block hover:text-dinai-orange transition" onClick={toggleMenu}>
              NGO Portal
            </Link>
            <Link href="#smart-contract" className="block hover:text-dinai-orange transition" onClick={toggleMenu}>
              Smart Contract
            </Link>

            {/* Mobile Wallet Integration */}
            <div className="pt-3 border-t border-dinai-cream/10">
              {isWalletConnected ? (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>
                      {walletAddress.substring(0, 4)}...{walletAddress.substring(walletAddress.length - 4)}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-dinai-orange text-dinai-orange hover:bg-dinai-orange/10"
                    onClick={disconnectWallet}
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-dinai-orange text-dinai-orange hover:bg-dinai-orange/10"
                    onClick={() => connectWallet("pera")}
                  >
                    Connect Pera Wallet
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-dinai-orange text-dinai-orange hover:bg-dinai-orange/10"
                    onClick={() => connectWallet("myalgo")}
                  >
                    Connect MyAlgo Wallet
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
