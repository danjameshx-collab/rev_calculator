import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import thakosLogo from './assets/thakos-logo.png'

function App() {
  // State for all calculator inputs
  const [planSelection, setPlanSelection] = useState('launch')
  const [monthlyInvestment, setMonthlyInvestment] = useState(2000)
  const [offerPrice, setOfferPrice] = useState(2033)
  const [contentToCallPerformance, setContentToCallPerformance] = useState('very-good')
  const [monthlyVideoImpressions, setMonthlyVideoImpressions] = useState(1000)
  const [closeRate, setCloseRate] = useState(30)
  const [avgMonthsClientStays, setAvgMonthsClientStays] = useState(3)

  // Plan configurations
  const planConfigs = {
    authority: {
      label: 'Authority - 8 Videos, 8 Lead Magnets & 16 Emails',
      multiplier: 3.5,
      monthlyInvestment: 7000,
      videos: 8,
      leadMagnets: 8,
      emails: 16
    },
    growth: {
      label: 'Growth - 4 Videos, 4 Lead Magnets & 16 Emails',
      multiplier: 2.0,
      monthlyInvestment: 3000,
      videos: 4,
      leadMagnets: 4,
      emails: 16
    },
    launch: {
      label: 'Launch - 4 Videos',
      multiplier: 1.5,
      monthlyInvestment: 2000,
      videos: 4,
      leadMagnets: 0,
      emails: 0
    }
  }

  // Content to call performance ratios - UPDATED
  const performanceRatios = {
    'incredible': 1/50,
    'very-good': 1/100,
    'good': 1/150,
    'average': 1/250,
    'poor': 1/500,
    'awful': 1/1000
  }

  // Helper function to round numbers to 2 decimal places
  const roundToTwoDecimals = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }

  // Update monthly investment when plan changes
  useEffect(() => {
    const planConfig = planConfigs[planSelection]
    setMonthlyInvestment(planConfig.monthlyInvestment)
  }, [planSelection])

  // Calculated values
  const [calculations, setCalculations] = useState({
    monthlyMeetings: 0,
    monthlyDealsClosedFromMeetings: 0,
    customerAcquisitionCost: 0,
    newMonthlyRevenue: 0,
    newLtvAdded: 0,
    roi: 0
  })

  // Calculate all values when inputs change
  useEffect(() => {
    const planConfig = planConfigs[planSelection]
    const performanceRatio = performanceRatios[contentToCallPerformance]
    
    // Monthly meetings calculation
    const monthlyMeetings = Math.round(monthlyVideoImpressions * performanceRatio * planConfig.multiplier)
    
    // Monthly deals closed calculation
    const monthlyDealsClosedFromMeetings = Math.round(monthlyMeetings * (closeRate / 100))
    
    // Customer acquisition cost
    const customerAcquisitionCost = monthlyDealsClosedFromMeetings > 0 ? 
      roundToTwoDecimals(monthlyInvestment / monthlyDealsClosedFromMeetings) : 0
    
    // New Monthly Revenue
    const newMonthlyRevenue = monthlyDealsClosedFromMeetings * offerPrice
    
    // New LTV Added
    const newLtvAdded = monthlyDealsClosedFromMeetings * offerPrice * avgMonthsClientStays
    
    // ROI calculation (as x format instead of percentage)
    const roi = monthlyInvestment > 0 ? 
      roundToTwoDecimals((newLtvAdded - monthlyInvestment) / monthlyInvestment) : 0

    setCalculations({
      monthlyMeetings,
      monthlyDealsClosedFromMeetings,
      customerAcquisitionCost,
      newMonthlyRevenue,
      newLtvAdded,
      roi
    })
  }, [planSelection, monthlyInvestment, offerPrice, contentToCallPerformance, monthlyVideoImpressions, closeRate, avgMonthsClientStays])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Enhanced Headline Styling */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-2">
              YouTube & Email ROI Calculator
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full"></div>
          </div>
          <img 
            src={thakosLogo} 
            alt="THAKOS Logo" 
            className="absolute top-0 right-0 h-24 w-auto"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Parameters Section */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Content Paramaters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label htmlFor="plan-selection" className="text-sm font-medium text-gray-700">Plan Selecstion</Label>
                <Select value={planSelection} onValueChange={setPlanSelection}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="authority">{planConfigs.authority.label}</SelectItem>
                    <SelectItem value="growth">{planConfigs.growth.label}</SelectItem>
                    <SelectItem value="launch">{planConfigs.launch.label}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="hidden">
                <Label htmlFor="monthly-investment" className="text-sm font-medium text-gray-700">Monthly Investment</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="monthly-investment"
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Monthly cost automaticalssssly filled based on your selected plan</p>
              </div>

              <div>
                <Label htmlFor="offer-price" className="text-sm font-medium text-gray-700">Your Offer Price</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="offer-price"
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="close-rate" className="text-sm font-medium text-gray-700">Close Rate</Label>
                <div className="relative mt-1">
                  <Input
                    id="close-rate"
                    type="number"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <Label htmlFor="avg-months" className="text-sm font-medium text-gray-700">Average No. of Months Client Stays</Label>
                <Input
                  id="avg-months"
                  type="number"
                  value={avgMonthsClientStays}
                  onChange={(e) => setAvgMonthsClientStays(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="content-performance" className="text-sm font-medium text-gray-700">Content to Call Performance</Label>
                <Select value={contentToCallPerformance} onValueChange={setContentToCallPerformance}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="incredible">Incredible (1/50)</SelectItem>
                    <SelectItem value="very-good">Very Good (1/100)</SelectItem>
                    <SelectItem value="good">Good (1/150)</SelectItem>
                    <SelectItem value="average">Average (1/250)</SelectItem>
                    <SelectItem value="poor">Poor (1/500)</SelectItem>
                    <SelectItem value="awful">Awful (1/1000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="video-impressions" className="text-sm font-medium text-gray-700">Monthly Video Impressions</Label>
                <Input
                  id="video-impressions"
                  type="number"
                  value={monthlyVideoImpressions}
                  onChange={(e) => setMonthlyVideoImpressions(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* CAC Calculator Section */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-green-50 border-b">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                CAC Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Monthly Meetings</p>
                <p className="text-4xl font-bold text-green-600">{calculations.monthlyMeetings}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Monthly Deals Closed</p>
                <p className="text-4xl font-bold text-green-600">{calculations.monthlyDealsClosedFromMeetings}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Customer Acquisition Cost</p>
                <p className="text-3xl font-bold text-green-600">${calculations.customerAcquisitionCost.toLocaleString()}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">New Monthly Revenue</p>
                <p className="text-3xl font-bold text-green-600">${calculations.newMonthlyRevenue.toLocaleString()}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">New LTV Added</p>
                <p className="text-3xl font-bold text-green-600">${calculations.newLtvAdded.toLocaleString()}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">ROI</p>
                <p className="text-4xl font-bold text-green-600">{calculations.roi}x</p>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Funnel Breakdown Section */}
          <Card className="bg-white shadow-lg" style={{backgroundColor: '#111184'}}>
            <CardHeader className="border-b" style={{borderColor: 'rgba(255,255,255,0.2)'}}>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                Monthly Funnel Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-white">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-white">Detailed Calculations</h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white">Monthly Meetings:</p>
                    <p className="text-gray-100">Monthly Video Impressions ({monthlyVideoImpressions.toLocaleString()}) × Content to Call Performance ({roundToTwoDecimals(performanceRatios[contentToCallPerformance])}) × Plan Multiplier ({planConfigs[planSelection].multiplier}x) = {calculations.monthlyMeetings}</p>
                  </div>

                  <div>
                    <p className="font-medium text-white">Monthly Deals Closed:</p>
                    <p className="text-gray-100">Monthly Meetings ({calculations.monthlyMeetings}) × Close Rate ({closeRate}%) = {calculations.monthlyDealsClosedFromMeetings}</p>
                  </div>

                  <div>
                    <p className="font-medium text-white">New Monthly Revenue:</p>
                    <p className="text-gray-100">Monthly Deals Closed ({calculations.monthlyDealsClosedFromMeetings}) × Your Offer Price (${offerPrice.toLocaleString()}) = ${calculations.newMonthlyRevenue.toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="font-medium text-white">New LTV Added:</p>
                    <p className="text-gray-100">Monthly Deals Closed ({calculations.monthlyDealsClosedFromMeetings}) × Your Offer Price (${offerPrice.toLocaleString()}) × Average No. of Months Client Stays ({avgMonthsClientStays}) = ${calculations.newLtvAdded.toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="font-medium text-white">ROI:</p>
                    <p className="text-gray-100">(New LTV Added (${calculations.newLtvAdded.toLocaleString()}) - Total Investment (${monthlyInvestment.toLocaleString()})) / Total Investment (${monthlyInvestment.toLocaleString()}) = {calculations.roi}x</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App

