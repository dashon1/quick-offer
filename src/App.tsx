import { useState } from 'react'
import { Zap, Check, Rocket, DollarSign, ArrowRight, CheckCircle2, X, ChevronRight } from 'lucide-react'

const OFFER_TEMPLATES = {
  freelance: [
    { name: "Quick Win", price: 97, desc: "Single deliverable - fast turnaround" },
    { name: "Project Pack", price: 497, desc: "Complete project with revisions" },
    { name: "Retainer", price: 1997, desc: "Monthly ongoing work" }
  ],
  consulting: [
    { name: "Discovery Call", price: 0, desc: "Free 30-min call" },
    { name: "Strategy Session", price: 297, desc: "Deep dive" },
    { name: "VIP Day", price: 1997, desc: "Full-day workshop" }
  ],
  service: [
    { name: "Starter", price: 197, desc: "Basic package" },
    { name: "Professional", price: 597, desc: "Most popular" },
    { name: "Enterprise", price: 1997, desc: "Full solution" }
  ]
}

const LOGOS = ["Google", "Meta", "Stripe", "Shopify", "Notion", "Webflow", "Figma", "Linear"]

function App() {
  const [step, setStep] = useState(1)
  const [offerType, setOfferType] = useState<'freelance' | 'consulting' | 'service'>('freelance')
  const [clientName, setClientName] = useState('')
  const [clientProblem, setClientProblem] = useState('')
  const [clientGoal, setClientGoal] = useState('')
  const [budget, setBudget] = useState('')
  const [generatedOffers, setGeneratedOffers] = useState<any[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [showPricing, setShowPricing] = useState(false)
  const [offerCount, setOfferCount] = useState(0)
  const [activeTab, setActiveTab] = useState<'offers' | 'landing' | 'script'>('offers')

  const generateOffers = () => {
    if (!clientName || !clientProblem || !clientGoal) return
    const templates = OFFER_TEMPLATES[offerType]
    const offers = templates.map(t => ({
      ...t,
      title: `${t.name} - ${clientName}'s ${clientGoal} Solution`,
      valueProp: `Solve ${clientProblem} so you can achieve ${clientGoal}`,
      deliverables: generateDeliverables(offerType),
      timeline: t.price > 1000 ? "4 weeks" : t.price > 400 ? "2 weeks" : "1 week",
      guarantee: t.price > 400 ? "100% satisfaction guarantee" : "Revision included"
    }))
    setGeneratedOffers(offers)
    setOfferCount(offerCount + 1)
    setStep(3)
  }

  const generateDeliverables = (type: string) => {
    const base = ["Initial strategy call", "Custom proposal document", "Implementation roadmap"]
    if (type === 'freelance') return [...base, "Source files", "Documentation"]
    if (type === 'consulting') return [...base, "Recorded session", "Action items PDF"]
    return [...base, "Training materials", "30-day support"]
  }

  const generateLandingPage = () => ({
    headline: `Get ${clientGoal} Without The Hassle`,
    subheadline: `Stop struggling with ${clientProblem}. Our proven approach delivers ${clientGoal} in weeks, not months.`,
    cta: "Book Your Consultation"
  })

  const generateSalesScript = () => ({
    intro: `Hi, this is about ${clientName}'s ${clientGoal}. I understand you're dealing with ${clientProblem}.`,
    close: `The question isn't whether you can afford to invest - it's whether you can afford NOT to. Let's talk.`
  })

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const landing = generateLandingPage()
  const script = generateSalesScript()

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-['Inter','system-ui',sans-serif]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0f0f0f]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="font-semibold text-lg">QuickOffer</span>
          </div>
          <div className="flex items-center gap-8">
            <button onClick={() => setShowPricing(true)} className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</button>
            <button onClick={() => setStep(2)} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {step === 1 && (
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-semibold mb-6 leading-tight">
              Create offers that
              <span className="block text-amber-500">close deals faster</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Enter client details once. Get professional offers, landing page copy, and sales scripts instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setStep(2)} className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setShowPricing(true)} className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
                View Pricing
              </button>
            </div>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="py-12 px-6 border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-sm text-gray-500 mb-6">Trusted by freelancers at companies like</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {LOGOS.map((logo, i) => (
                <span key={i} className="text-lg font-semibold text-gray-400">{logo}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: DollarSign, title: "Professional Offers", desc: "Generate 3-tier pricing packages with deliverables, timelines, and guarantees auto-populated." },
                { icon: Rocket, title: "Landing Page Copy", desc: "Get conversion-ready headlines, subheads, and CTAs that make clients say yes." },
                { icon: CheckCircle2, title: "Sales Scripts", desc: "Complete call scripts from intro to close. Just fill in the blanks." }
              ].map((feature, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Ready to close more deals?</h2>
            <p className="text-gray-400 mb-8">Join thousands of professionals who've transformed their sales process.</p>
            <button onClick={() => setStep(2)} className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Free
            </button>
            <p className="text-gray-500 text-sm mt-4">No credit card required</p>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-lg mx-auto">
            <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 text-sm">
              <ChevronRight className="w-4 h-4 rotate-180" /> Back
            </button>
            <div className="border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-2">Create your offer</h2>
              <p className="text-gray-400 mb-6 text-sm">Enter your client details below.</p>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Client Name *</label>
                  <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Acme Corp" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Their Problem *</label>
                  <textarea value={clientProblem} onChange={e => setClientProblem(e.target.value)} placeholder="e.g., low website traffic" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 h-20 focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Desired Result *</label>
                  <input value={clientGoal} onChange={e => setClientGoal(e.target.value)} placeholder="e.g., double their leads" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Budget <span className="text-gray-600">(optional)</span></label>
                  <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="$500 - $2000" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Offer Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['freelance', 'consulting', 'service'] as const).map(type => (
                      <button key={type} onClick={() => setOfferType(type)} className={`py-2 rounded-lg text-sm font-medium capitalize ${offerType === type ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400'}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={generateOffers} disabled={!clientName || !clientProblem || !clientGoal} className="w-full py-3 bg-white text-black rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" /> Generate Offer
              </button>
            </div>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your Generated Assets</h2>
              <button onClick={() => { setStep(1); setGeneratedOffers([]); }} className="text-sm text-gray-400 hover:text-white">
                Create Another
              </button>
            </div>
            <div className="flex gap-2 mb-6">
              {[{id: 'offers', icon: DollarSign, label: 'Offers'}, {id: 'landing', icon: Rocket, label: 'Landing'}, {id: 'script', icon: CheckCircle2, label: 'Script'}].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === tab.id ? 'bg-white text-black' : 'bg-white/5 text-gray-400'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            {activeTab === 'offers' && (
              <div className="space-y-4">
                {generatedOffers.map((offer, idx) => (
                  <div key={idx} className="border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-amber-500">{offer.name}</span>
                          <span className="text-xs text-gray-500">{offer.timeline}</span>
                        </div>
                        <h3 className="text-lg font-medium">{offer.title}</h3>
                      </div>
                      <span className="text-2xl font-semibold text-green-400">${offer.price}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{offer.valueProp}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">{offer.deliverables.slice(0, 2).join(', ')}...</div>
                      <button onClick={() => copyToClipboard(`Offer: ${offer.title}\n\n${offer.valueProp}\n\nPrice: $${offer.price}\n\nDeliverables: ${offer.deliverables.join(', ')}\n\nTimeline: ${offer.timeline}\n\n${offer.guarantee}`, `offer-${idx}`)} className="text-sm text-amber-500 hover:text-amber-400">
                        {copied === `offer-${idx}` ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'landing' && (
              <div className="border border-white/10 rounded-xl p-6">
                <h4 className="text-amber-500 text-sm font-medium mb-2">Headline</h4>
                <p className="text-xl font-medium mb-4">{landing.headline}</p>
                <h4 className="text-amber-500 text-sm font-medium mb-2">Subheadline</h4>
                <p className="text-gray-400 mb-4">{landing.subheadline}</p>
                <button onClick={() => copyToClipboard(`HEADLINE: ${landing.headline}\n\n${landing.subheadline}`, 'landing')} className="text-sm text-amber-500">
                  {copied === 'landing' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
            {activeTab === 'script' && (
              <div className="border border-white/10 rounded-xl p-6">
                <h4 className="text-amber-500 text-sm font-medium mb-2">Opening</h4>
                <p className="text-gray-300 mb-4">{script.intro}</p>
                <h4 className="text-amber-500 text-sm font-medium mb-2">Close</h4>
                <p className="font-medium">{script.close}</p>
                <button onClick={() => copyToClipboard(`${script.intro}\n\n${script.close}`, 'script')} className="text-sm text-amber-500 mt-4">
                  {copied === 'script' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {showPricing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6" onClick={() => setShowPricing(false)}>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Pricing</h2>
              <button onClick={() => setShowPricing(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Free</span>
                  <span className="text-xl font-semibold">$0</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4" /> 3 offers/month</li>
                </ul>
              </div>
              <div className="border border-amber-500/30 bg-amber-500/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Pro</span>
                  <div><span className="text-xl font-semibold">$19</span><span className="text-gray-400">/mo</span></div>
                </div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-500" /> Unlimited offers</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-500" /> Landing pages</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-500" /> Sales scripts</li>
                </ul>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-white text-black rounded-lg font-medium">Start Free Trial</button>
          </div>
        </div>
      )}

      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>© 2026 QuickOffer</p>
      </footer>
    </div>
  )
}

export default App