import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, AlertTriangle, CreditCard, Shield, Scale, Mail, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function TermsOfService() {
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
            <FileText className="w-4 h-4 mr-2" />
            Legal Agreement
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Terms of Service
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                By accessing and using NeoWebLand's website and services, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Services Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                NeoWebLand provides web design, development, and digital marketing services including but not limited to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Custom website design and development
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Mobile application development
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    E-commerce solutions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    SEO and digital marketing services
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Website maintenance and support
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Project Payments</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Payment terms are outlined in individual project contracts. Typically, we require a 50% deposit
                  before work begins, with the remaining balance due upon project completion.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Late Payments</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Late payments may result in suspension of services and may incur additional fees.
                  We reserve the right to charge interest on overdue amounts.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Refund Policy</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Refunds are handled on a case-by-case basis and are subject to the terms outlined
                  in individual project contracts.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Client Content</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  You retain ownership of all content, materials, and intellectual property you provide to us.
                  You grant us a license to use this content solely for the purpose of providing our services.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Our Work Product</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Upon full payment, you will own the final deliverables created specifically for your project.
                  We retain ownership of our general methodologies, know-how, and reusable components.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Portfolio Rights</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  We reserve the right to display completed work in our portfolio and marketing materials
                  unless otherwise agreed upon in writing.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                NeoWebLand shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from your use of our services.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                In no event shall our total liability to you for all damages exceed the amount paid by you to
                NeoWebLand for the specific service giving rise to the liability.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                Either party may terminate services with written notice. Upon termination:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    All outstanding invoices become immediately due
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    We will provide completed work product upon full payment
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Client data will be returned or destroyed as requested
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                These terms shall be governed by and construed in accordance with the laws of the State of Minnesota,
                without regard to its conflict of law provisions. Any disputes arising under these terms shall be
                subject to the exclusive jurisdiction of the courts of Minnesota.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting to our website. Your continued use of our services after any changes constitutes acceptance
                of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6" />
                Contact Information
              </h3>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email: legal@neowebland.com</span>
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