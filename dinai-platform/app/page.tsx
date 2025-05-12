import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle, Wallet, MapPin, FileText, Users, Code, Shield } from "lucide-react"
import DisasterIcon from "@/components/disaster-icons"
import IndiaMap from "@/components/india-map"

// Mock data for the disaster ledger
const disasterLedgerData = [
  {
    id: "tx-001",
    walletAddress: "ALGO7X2RENE",
    location: "Kerala, India",
    reliefType: "Food",
    timestamp: "2023-08-15T10:30:00Z",
    status: "confirmed",
    disasterType: "flood" as const,
  },
  {
    id: "tx-002",
    walletAddress: "ALGOJ8FKDLS",
    location: "Tamil Nadu, India",
    reliefType: "Medical",
    timestamp: "2023-08-14T14:45:00Z",
    status: "pending",
    disasterType: "cyclone" as const,
  },
  {
    id: "tx-003",
    walletAddress: "ALGO9DKFJSL",
    location: "Maharashtra, India",
    reliefType: "Shelter",
    timestamp: "2023-08-13T09:15:00Z",
    status: "confirmed",
    disasterType: "earthquake" as const,
  },
  {
    id: "tx-004",
    walletAddress: "ALGOLSKDJF8",
    location: "Gujarat, India",
    reliefType: "Water",
    timestamp: "2023-08-12T16:20:00Z",
    status: "failed",
    disasterType: "fire" as const,
  },
]

// Mock data for NGO activities
const ngoActivities = [
  {
    id: "ngo-001",
    name: "Relief India",
    activity: "Food Distribution",
    location: "Kerala, India",
    date: "2023-08-15",
    verified: true,
  },
  {
    id: "ngo-002",
    name: "Disaster Response Team",
    activity: "Medical Camp",
    location: "Tamil Nadu, India",
    date: "2023-08-14",
    verified: true,
  },
  {
    id: "ngo-003",
    name: "Shelter Foundation",
    activity: "Temporary Housing",
    location: "Maharashtra, India",
    date: "2023-08-13",
    verified: false,
  },
]

// Mock data for volunteer activities
const volunteerActivities = [
  {
    id: "vol-001",
    name: "Rescue Operations",
    location: "Kerala, India",
    participants: 24,
    date: "2023-08-15",
    verified: true,
  },
  {
    id: "vol-002",
    name: "Medical Assistance",
    location: "Tamil Nadu, India",
    participants: 12,
    date: "2023-08-14",
    verified: true,
  },
  {
    id: "vol-003",
    name: "Supply Distribution",
    location: "Maharashtra, India",
    participants: 18,
    date: "2023-08-13",
    verified: false,
  },
]

// Mock data for smart contract
const smartContractData = {
  blockNumber: 18456789,
  balance: "45.678 ALGO",
  contractAddress: "0x1234...5678",
  callLog: [
    {
      id: "call-001",
      function: "verifyDisaster",
      params: "location: Kerala, type: flood",
      result: "Verified",
      timestamp: "2023-08-15T10:35:00Z",
    },
    {
      id: "call-002",
      function: "allocateAid",
      params: "recipient: ALGO7X2RENE, amount: 5 ALGO",
      result: "Success",
      timestamp: "2023-08-15T10:36:00Z",
    },
    {
      id: "call-003",
      function: "registerVolunteer",
      params: "id: vol-001, location: Kerala",
      result: "Registered",
      timestamp: "2023-08-15T09:30:00Z",
    },
  ],
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-dinai-green to-dinai-darkGreen text-dinai-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Decentralized Relief.
                <span className="text-dinai-orange block mt-2">Trusted by the Blockchain.</span>
              </h1>
              <p className="text-lg md:text-xl text-dinai-cream/80 max-w-xl">
                Dinai leverages blockchain technology to ensure transparent, efficient, and accountable disaster
                management across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-dinai-orange hover:bg-dinai-orange/90 text-white">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
                <Button variant="outline" className="border-dinai-cream text-dinai-cream hover:bg-white/10">
                  <MapPin className="mr-2 h-4 w-4" />
                  Report Disaster
                </Button>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-xl border-4 border-dinai-cream/20">
              <div className="aspect-[4/3] bg-dinai-darkGreen relative" style={{ height: "400px" }}>
                <div className="absolute inset-0" style={{ height: "100%" }}>
                  <IndiaMap />
                </div>
                <div className="absolute top-4 left-4 z-20 bg-dinai-green/80 text-dinai-cream px-3 py-1 rounded-md text-sm font-medium">
                  Live Disaster Map
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disaster Ledger Section */}
      <section id="disaster-ledger" className="py-16 bg-dinai-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dinai-green mb-4">Disaster Ledger</h2>
            <p className="text-dinai-green/70 max-w-2xl mx-auto">
              Transparent record of all disaster relief transactions verified on the blockchain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disasterLedgerData.map((transaction) => (
              <Card
                key={transaction.id}
                className="overflow-hidden border-dinai-green/20 hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <DisasterIcon type={transaction.disasterType} className="mr-2 h-5 w-5 text-dinai-green" />
                      <CardTitle className="text-lg font-semibold text-dinai-green">{transaction.reliefType}</CardTitle>
                    </div>
                    {transaction.status === "confirmed" && (
                      <Badge variant="outline" className="verified-badge">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                    {transaction.status === "pending" && (
                      <Badge variant="outline" className="pending-badge">
                        <Clock className="h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                    {transaction.status === "failed" && (
                      <Badge variant="outline" className="failed-badge">
                        <XCircle className="h-3 w-3" />
                        Failed
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-dinai-green/70">
                    {new Date(transaction.timestamp).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <Wallet className="h-4 w-4 mr-2 text-dinai-green/70 mt-0.5" />
                      <div>
                        <div className="font-medium text-dinai-green">Wallet</div>
                        <div className="text-dinai-green/70">{transaction.walletAddress}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-dinai-green/70 mt-0.5" />
                      <div>
                        <div className="font-medium text-dinai-green">Location</div>
                        <div className="text-dinai-green/70">{transaction.location}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-dinai-green border-dinai-green/30 hover:bg-dinai-green/10"
                  >
                    View Transaction
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-dinai-green text-dinai-green hover:bg-dinai-green/10">
              View All Transactions
            </Button>
          </div>
        </div>
      </section>

      {/* Relief Request Form Section */}
      <section id="relief-request" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dinai-green mb-4">Submit Relief Request</h2>
            <p className="text-dinai-green/70 max-w-2xl mx-auto">
              Request assistance for disaster-affected areas. All requests are verified and processed through our
              blockchain system.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-dinai-green/20">
              <CardHeader>
                <CardTitle className="text-xl text-dinai-green">Relief Request Form</CardTitle>
                <CardDescription>
                  Fill out the details below to submit a relief request to the blockchain.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-dinai-green">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border border-dinai-green/20 rounded-md focus:outline-none focus:ring-2 focus:ring-dinai-green/50"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="aadhar" className="text-sm font-medium text-dinai-green">
                        Aadhar Number (Optional)
                      </label>
                      <input
                        id="aadhar"
                        type="text"
                        className="w-full px-3 py-2 border border-dinai-green/20 rounded-md focus:outline-none focus:ring-2 focus:ring-dinai-green/50"
                        placeholder="XXXX-XXXX-XXXX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="disaster-type" className="text-sm font-medium text-dinai-green">
                        Disaster Type
                      </label>
                      <select
                        id="disaster-type"
                        className="w-full px-3 py-2 border border-dinai-green/20 rounded-md focus:outline-none focus:ring-2 focus:ring-dinai-green/50"
                      >
                        <option value="">Select disaster type</option>
                        <option value="flood">Flood</option>
                        <option value="fire">Fire</option>
                        <option value="cyclone">Cyclone</option>
                        <option value="earthquake">Earthquake</option>
                        <option value="thunderstorm">Thunderstorm</option>
                        <option value="coldwave">Cold Wave</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium text-dinai-green">
                        GPS Location
                      </label>
                      <input
                        id="location"
                        type="text"
                        className="w-full px-3 py-2 border border-dinai-green/20 rounded-md focus:outline-none focus:ring-2 focus:ring-dinai-green/50"
                        placeholder="Latitude, Longitude or Address"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-dinai-green">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      className="w-full px-3 py-2 border border-dinai-green/20 rounded-md focus:outline-none focus:ring-2 focus:ring-dinai-green/50"
                      placeholder="Describe the situation and required assistance"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-dinai-green">Resources Needed</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Food", "Water", "Medical", "Shelter", "Clothing", "Rescue", "Evacuation", "Other"].map(
                        (resource) => (
                          <div key={resource} className="flex items-center">
                            <input
                              id={`resource-${resource.toLowerCase()}`}
                              type="checkbox"
                              className="h-4 w-4 text-dinai-green border-dinai-green/30 rounded focus:ring-dinai-green/50"
                            />
                            <label
                              htmlFor={`resource-${resource.toLowerCase()}`}
                              className="ml-2 text-sm text-dinai-green"
                            >
                              {resource}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="documents" className="text-sm font-medium text-dinai-green">
                      Upload Documents (Optional)
                    </label>
                    <div className="border-2 border-dashed border-dinai-green/20 rounded-md p-6 text-center">
                      <div className="space-y-2">
                        <div className="text-dinai-green/70 text-sm">
                          Drag and drop files here, or click to select files
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-dinai-green/30 text-dinai-green hover:bg-dinai-green/10"
                        >
                          Select Files
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button className="w-full sm:w-auto bg-dinai-orange hover:bg-dinai-orange/90 text-white">
                  Send to Blockchain
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-dinai-green/30 text-dinai-green hover:bg-dinai-green/10"
                >
                  Save as Draft
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* NGO & Volunteer Portal Section */}
      <section id="ngo-portal" className="py-16 bg-dinai-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dinai-green mb-4">NGO & Volunteer Portal</h2>
            <p className="text-dinai-green/70 max-w-2xl mx-auto">
              Coordinate relief efforts, track volunteer activities, and verify on-chain participation.
            </p>
          </div>

          <Tabs defaultValue="ngo" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="ngo"
                className="text-dinai-green data-[state=active]:bg-dinai-green data-[state=active]:text-white"
              >
                <Users className="mr-2 h-4 w-4" />
                NGO Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="volunteer"
                className="text-dinai-green data-[state=active]:bg-dinai-green data-[state=active]:text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                Volunteer Activities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ngo">
              <Card className="border-dinai-green/20">
                <CardHeader>
                  <CardTitle className="text-xl text-dinai-green">NGO Activities</CardTitle>
                  <CardDescription>Track and verify NGO relief activities on the blockchain.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-dinai-green/20">
                          <th className="px-4 py-3 text-left text-sm font-medium text-dinai-green">Organization</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-dinai-green">Activity</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-dinai-green">Location</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-dinai-green">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-dinai-green">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ngoActivities.map((activity) => (
                          <tr key={activity.id} className="border-b border-dinai-green/10 hover:bg-dinai-green/5">
                            <td className="px-4 py-3 text-sm text-dinai-green">{activity.name}</td>
                            <td className="px-4 py-3 text-sm text-dinai-green">{activity.activity}</td>
                            <td className="px-4 py-3 text-sm text-dinai-green">{activity.location}</td>
                            <td className="px-4 py-3 text-sm text-dinai-green">{activity.date}</td>
                            <td className="px-4 py-3 text-sm">
                              {activity.verified ? (
                                <Badge variant="outline" className="verified-badge">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="pending-badge">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pending
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="border-dinai-green/30 text-dinai-green hover:bg-dinai-green/10">
                    Register New Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="volunteer">
              <Card className="border-dinai-green/20">
                <CardHeader>
                  <CardTitle className="text-xl text-dinai-green">Volunteer Activities</CardTitle>
                  <CardDescription>Track volunteer participation and verify on-chain contributions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-dinai-green/20">
                          <th className="px-4 py-3 text-left text-sm font-medium text-dinai-green">Activity</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-dinai-green">Location</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-dinai-green">Participants</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-dinai-green">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-dinai-green">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {volunteerActivities.map((activity) => (
                          <tr key={activity.id} className="border-b border-dinai-green/10 hover:bg-dinai-green/5">
                            <td className="px-4 py-3 text-sm text-dinai-green">{activity.name}</td>
                            <td className="px-4 py-3 text-sm text-dinai-green">{activity.location}</td>
                            <td className="px-4 py-3 text-sm text-dinai-green">{activity.participants}</td>
                            <td className="px-4 py-3 text-sm text-dinai-green">{activity.date}</td>
                            <td className="px-4 py-3 text-sm">
                              {activity.verified ? (
                                <Badge variant="outline" className="verified-badge">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="pending-badge">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pending
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="border-dinai-green/30 text-dinai-green hover:bg-dinai-green/10">
                    Join as Volunteer
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Smart Contract Simulator Section */}
      <section id="smart-contract" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dinai-green mb-4">Smart Contract Simulator</h2>
            <p className="text-dinai-green/70 max-w-2xl mx-auto">
              Explore how our blockchain-based smart contracts verify and process disaster relief requests.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-dinai-green/20">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-dinai-green">Contract Status</CardTitle>
                    <CardDescription>Current state of the disaster relief smart contract</CardDescription>
                  </div>
                  <Button className="bg-dinai-orange hover:bg-dinai-orange/90 text-white">
                    <Code className="mr-2 h-4 w-4" />
                    Run Contract Check
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-dinai-green/5 rounded-lg p-4 border border-dinai-green/20">
                    <div className="text-sm text-dinai-green/70 mb-1">Block Number</div>
                    <div className="text-xl font-semibold text-dinai-green">{smartContractData.blockNumber}</div>
                  </div>
                  <div className="bg-dinai-green/5 rounded-lg p-4 border border-dinai-green/20">
                    <div className="text-sm text-dinai-green/70 mb-1">ALGO Balance</div>
                    <div className="text-xl font-semibold text-dinai-green">{smartContractData.balance}</div>
                  </div>
                  <div className="bg-dinai-green/5 rounded-lg p-4 border border-dinai-green/20">
                    <div className="text-sm text-dinai-green/70 mb-1">Contract Address</div>
                    <div className="text-xl font-semibold text-dinai-green">{smartContractData.contractAddress}</div>
                  </div>
                  <div className="bg-dinai-green/5 rounded-lg p-4 border border-dinai-green/20">
                    <div className="text-sm text-dinai-green/70 mb-1">Status</div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <div className="text-xl font-semibold text-dinai-green">Active</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-dinai-green mb-3">Recent Contract Calls</h3>
                  <div className="space-y-3">
                    {smartContractData.callLog.map((call) => (
                      <div key={call.id} className="bg-dinai-green/5 rounded-lg p-4 border border-dinai-green/20">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center">
                            <Shield className="h-5 w-5 text-dinai-green mr-2" />
                            <div className="font-medium text-dinai-green">{call.function}</div>
                          </div>
                          <div className="text-sm text-dinai-green/70">
                            {new Date(call.timestamp).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-dinai-green/70">
                          <div>
                            <span className="font-medium">Params:</span> {call.params}
                          </div>
                          <div>
                            <span className="font-medium">Result:</span> {call.result}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="text-sm text-dinai-green/70">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                    Smart contract is running normally
                  </div>
                </div>
                <Button variant="outline" className="border-dinai-green/30 text-dinai-green hover:bg-dinai-green/10">
                  View Contract on Explorer
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
