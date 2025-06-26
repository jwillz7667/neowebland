import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { sendChatMessage, getChatHistory } from "@/api/chatbot"
import { useToast } from "@/hooks/useToast"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

const quickQuestions = [
  "What services do you offer?",
  "How much does a website cost?",
  "What's your contact information?",
  "How long does a project take?"
]

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI assistant. I can help you with information about our web development services, pricing, and answer any questions you have. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string>()
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load conversation history when chat opens
  useEffect(() => {
    if (isOpen && conversationId && !historyLoaded) {
      loadChatHistory()
    }
  }, [isOpen, conversationId, historyLoaded])

  const loadChatHistory = async () => {
    if (!conversationId) return

    try {
      console.log('Loading chat history for conversation:', conversationId)
      const response = await getChatHistory(conversationId)

      if (response.success && response.conversation.messages.length > 0) {
        const historyMessages = response.conversation.messages.map((msg: any, index: number) => ({
          id: `history_${index}`,
          content: msg.content,
          isBot: msg.isBot,
          timestamp: new Date(msg.timestamp)
        }))

        // Replace initial message with history
        setMessages(historyMessages)
        console.log('Chat history loaded:', historyMessages.length, 'messages')
      }
      setHistoryLoaded(true)
    } catch (error) {
      console.error('Error loading chat history:', error)
      // Don't show error toast for history loading failure
      setHistoryLoaded(true)
    }
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      console.log('Sending message to chatbot:', message)
      const response = await sendChatMessage({
        message,
        conversationId
      })

      if (response.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.response,
          isBot: true,
          timestamp: new Date(response.timestamp)
        }

        setMessages(prev => [...prev, botMessage])
        setConversationId(response.conversationId)
        console.log('Received bot response:', response.response)
      } else {
        throw new Error('Failed to get response from chatbot')
      }
    } catch (error: any) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      })

      // Remove the user message if sending failed
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id))
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputMessage)
  }

  const handleChatOpen = () => {
    setIsOpen(true)
    // Generate conversation ID if not exists
    if (!conversationId) {
      const newConversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setConversationId(newConversationId)
      console.log('Generated new conversation ID:', newConversationId)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
      >
        <Button
          onClick={handleChatOpen}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]"
          >
            <Card className="h-full bg-white dark:bg-slate-900 shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">AI Assistant</CardTitle>
                      <p className="text-xs text-white/80">Online now</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0 h-[calc(100%-80px)] flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        {message.isBot && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            message.isBot
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isBot ? 'text-slate-500' : 'text-white/70'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {!message.isBot && (
                          <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((question, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 text-xs"
                          onClick={() => handleQuickQuestion(question)}
                        >
                          {question}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}