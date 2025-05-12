"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MessageCircleIcon as MessageCircleHelp, MapPin, Phone, FileCheck } from "lucide-react"

const EmergencyBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeOption, setActiveOption] = useState<string | null>(null)
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hello! I'm Dinai AI. How can I help you today?" },
  ])

  const handleOptionClick = (option: string) => {
    setActiveOption(option)

    let botResponse = ""

    switch (option) {
      case "shelter":
        botResponse = "I can help you find nearby shelters. Please share your location or enter your district name."
        break
      case "helpline":
        botResponse = "Emergency Helpline: 1800-XXX-XXXX\nDisaster Management: 1800-YYY-YYYY\nMedical Emergency: 108"
        break
      case "aid":
        botResponse =
          "To check your aid status, please provide your Aadhar number or the transaction hash from your relief request."
        break
      default:
        botResponse = "How can I assist you?"
    }

    setMessages([
      ...messages,
      {
        sender: "user",
        text: option === "shelter" ? "Find Shelter" : option === "helpline" ? "Call Helpline" : "Check Aid Status",
      },
      { sender: "bot", text: botResponse },
    ])
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-dinai-orange text-white p-4 rounded-full shadow-lg hover:bg-dinai-orange/90 transition-all z-50"
        aria-label="Open emergency bot"
      >
        <MessageCircleHelp className="h-6 w-6" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-dinai-green">
              <MessageCircleHelp className="mr-2 h-5 w-5" />
              Ask Dinai AI
            </DialogTitle>
            <DialogDescription>Get emergency assistance and information</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col space-y-4 max-h-[300px] overflow-y-auto p-2">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === "bot" ? "bg-muted text-foreground" : "bg-dinai-green text-white"
                  }`}
                >
                  {message.text.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              className="flex-1 border-dinai-green text-dinai-green hover:bg-dinai-green/10"
              onClick={() => handleOptionClick("shelter")}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Find Shelter
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-dinai-orange text-dinai-orange hover:bg-dinai-orange/10"
              onClick={() => handleOptionClick("helpline")}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Helpline
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-dinai-green text-dinai-green hover:bg-dinai-green/10"
              onClick={() => handleOptionClick("aid")}
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Check Aid Status
            </Button>
          </div>

          <DialogFooter className="sm:justify-start">
            <div className="text-xs text-muted-foreground">
              In case of emergency, please call the national emergency number directly.
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EmergencyBot
