import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function PrivacyPolicy() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-white/50 dark:hover:bg-slate-800/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Legal Document
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  We collect information you provide directly to us, such as when you create an account,
                  fill out a contact form, or communicate with us. This may include your name, email address,
                  phone number, company name, and project details.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Information</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  We automatically collect certain information about your use of our website, including
                  your IP address, browser type, operating system, pages viewed, and the dates/times of visits.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cookies and Tracking</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns,
                  and personalize content. You can control cookie settings through your browser preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Provide, maintain, and improve our services
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Respond to your inquiries and provide customer support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Send you updates, newsletters, and marketing communications (with your consent)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Analyze usage patterns to improve our website and services
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Comply with legal obligations and protect our rights
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
                except in the following circumstances:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    With service providers who assist us in operating our website and conducting business
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    When required by law or to protect our rights and safety
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    In connection with a business transfer or acquisition
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                We implement appropriate technical and organizational security measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over
                the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                You have the following rights regarding your personal information:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Access and review your personal information
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Request correction of inaccurate information
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Request deletion of your personal information
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Opt-out of marketing communications
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6" />
                Contact Us
              </h3>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email: privacy@webnaster.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone: (612) 930-1390</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-0.5 flex-shrink-0">📍</div>
                  <span>Address: 18234 80th Pl N, Maple Grove, MN 55311</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}