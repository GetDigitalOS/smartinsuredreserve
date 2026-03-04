import React, { useState, useMemo } from 'react';
import { Shield, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, ResponsiveContainer } from 'recharts';

const InsuranceOptimizer: React.FC = () => {
  const [inputs, setInputs] = useState<any>({
    autoPremium250: 1900,
    autoPremium500: 1473,
    autoPremium1000: 1140,
    autoInflation: 3.0,
    autoCurrentDeductible: 250,

    homePremium500: 2400,
    homePremium1000: 1860,
    homePremium5000: 1440,
    homeInflation: 22.5,
    homeCurrentDeductible: 500,

    currentReserve: 0,
    reserveReturn: 4.5,
    reserveContribution: 0,

    years: 30
  });

  const handleInputChange = (field: string, value: any) => {
    setInputs((prev: any) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const calculations = useMemo(() => {
    const results: any[] = [];
    let reserve = inputs.currentReserve;
    let autoDeductible = inputs.autoCurrentDeductible;
    let homeDeductible = inputs.homeCurrentDeductible;

    const autoTiers = [250, 500, 1000];
    const homeTiers = [500, 1000, 5000];

    const currentAutoBasePremium = inputs.autoCurrentDeductible === 250 ? inputs.autoPremium250 : 
                                   inputs.autoCurrentDeductible === 500 ? inputs.autoPremium500 : inputs.autoPremium1000;
    const currentHomeBasePremium = inputs.homeCurrentDeductible === 500 ? inputs.homePremium500 : 
                                   inputs.homeCurrentDeductible === 1000 ? inputs.homePremium1000 : inputs.homePremium5000;

    for (let year = 1; year <= inputs.years; year++) {
      const autoInflationFactor = Math.pow(1 + inputs.autoInflation / 100, year - 1);
      const homeInflationFactor = Math.pow(1 + inputs.homeInflation / 100, year - 1);

      const autoPremiums: any = {
        250: inputs.autoPremium250 * autoInflationFactor,
        500: inputs.autoPremium500 * autoInflationFactor,
        1000: inputs.autoPremium1000 * autoInflationFactor
      };

      const homePremiums: any = {
        500: inputs.homePremium500 * homeInflationFactor,
        1000: inputs.homePremium1000 * homeInflationFactor,
        5000: inputs.homePremium5000 * homeInflationFactor
      };

      const currentStrategyPremium = (currentAutoBasePremium * autoInflationFactor) + (currentHomeBasePremium * homeInflationFactor);

      const autoIndex = autoTiers.indexOf(autoDeductible);
      if (autoIndex < autoTiers.length - 1 && reserve >= autoTiers[autoIndex + 1]) {
        autoDeductible = autoTiers[autoIndex + 1];
      }

      const homeIndex = homeTiers.indexOf(homeDeductible);
      if (homeIndex < homeTiers.length - 1 && reserve >= homeTiers[homeIndex + 1]) {
        homeDeductible = homeTiers[homeIndex + 1];
      }

      const autoCurrentPremium = autoPremiums[autoDeductible];
      const homeCurrentPremium = homePremiums[homeDeductible];
      const totalPremium = autoCurrentPremium + homeCurrentPremium;

      const recapturedPremium = currentStrategyPremium - totalPremium;

      const beginningReserve = reserve;
      reserve += recapturedPremium + inputs.reserveContribution;
      const reserveEarnings = reserve * (inputs.reserveReturn / 100);
      reserve += reserveEarnings;

      results.push({
        year,
        autoDeductible,
        homeDeductible,
        autoPremiums,
        homePremiums,
        autoCurrentPremium,
        homeCurrentPremium,
        proposedPremium: totalPremium,
        currentPremium: currentStrategyPremium,
        recapturedPremium,
        beginningReserve,
        reserveEarnings,
        smartInsuredReserve: reserve,
        cumulativeSavings: results.length > 0 ? results[results.length - 1].cumulativeSavings + recapturedPremium : recapturedPremium
      });
    }

    return results;
  }, [inputs]);

  const finalYear = calculations[calculations.length - 1];
  const totalSaved = finalYear?.cumulativeSavings || 0;

  const chartData = calculations.map((row: any) => ({
    year: row.year,
    Proposed: row.proposedPremium,
    'Recaptured Premium': row.recapturedPremium,
    Current: row.currentPremium,
    'Smart Insured Reserve': row.smartInsuredReserve
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Smart Insurance Deductible Optimizer</h1>
          </div>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">Build your self-insurance reserve fund and optimize your deductibles over time</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-blue-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Auto Insurance
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Annual Premium ($250 deductible)</label>
                  <input type="number" value={inputs.autoPremium250} onChange={(e) => handleInputChange('autoPremium250', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Annual Premium ($500 deductible)</label>
                  <input type="number" value={inputs.autoPremium500} onChange={(e) => handleInputChange('autoPremium500', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Annual Premium ($1,000 deductible)</label>
                  <input type="number" value={inputs.autoPremium1000} onChange={(e) => handleInputChange('autoPremium1000', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Premium Inflation Rate (%)</label>
                  <input type="number" step="0.1" value={inputs.autoInflation} onChange={(e) => handleInputChange('autoInflation', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Current Deductible</label>
                  <select value={inputs.autoCurrentDeductible} onChange={(e) => handleInputChange('autoCurrentDeductible', e.target.value)} className="w-full p-2 border rounded mt-1">
                    <option value={250}>$250</option>
                    <option value={500}>$500</option>
                    <option value={1000}>$1,000</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-green-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Home Insurance
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Annual Premium ($500 deductible)</label>
                  <input type="number" value={inputs.homePremium500} onChange={(e) => handleInputChange('homePremium500', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Annual Premium ($1,000 deductible)</label>
                  <input type="number" value={inputs.homePremium1000} onChange={(e) => handleInputChange('homePremium1000', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Annual Premium ($5,000 deductible)</label>
                  <input type="number" value={inputs.homePremium5000} onChange={(e) => handleInputChange('homePremium5000', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Premium Inflation Rate (%)</label>
                  <input type="number" step="0.1" value={inputs.homeInflation} onChange={(e) => handleInputChange('homeInflation', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Current Deductible</label>
                  <select value={inputs.homeCurrentDeductible} onChange={(e) => handleInputChange('homeCurrentDeductible', e.target.value)} className="w-full p-2 border rounded mt-1">
                    <option value={500}>$500</option>
                    <option value={1000}>$1,000</option>
                    <option value={5000}>$5,000</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-purple-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Reserve Strategy
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Current Reserve Balance ($)</label>
                  <input type="number" value={inputs.currentReserve} onChange={(e) => handleInputChange('currentReserve', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Expected Annual Return (%)</label>
                  <input type="number" step="0.1" value={inputs.reserveReturn} onChange={(e) => handleInputChange('reserveReturn', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Annual Contribution ($)</label>
                  <input type="number" value={inputs.reserveContribution} onChange={(e) => handleInputChange('reserveContribution', e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Years to Project</label>
                  <input type="number" value={inputs.years} onChange={(e) => handleInputChange('years', e.target.value)} className="w-full p-2 border rounded mt-1" min={1} max={50} />
                </div>
                <div className="bg-purple-200 p-3 rounded mt-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-purple-900">Premium savings are automatically redirected to your reserve fund</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-5 h-5" />
                <h4 className="font-semibold text-sm">Final Reserve Balance</h4>
              </div>
              <p className="text-3xl font-bold">${finalYear?.smartInsuredReserve.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5" />
                <h4 className="font-semibold text-sm">Total Savings (Year {inputs.years})</h4>
              </div>
              <p className="text-3xl font-bold">${totalSaved.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5" />
                <h4 className="font-semibold text-sm">Final Auto Deductible</h4>
              </div>
              <p className="text-3xl font-bold">${finalYear?.autoDeductible.toLocaleString()}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5" />
                <h4 className="font-semibold text-sm">Final Home Deductible</h4>
              </div>
              <p className="text-3xl font-bold">${finalYear?.homeDeductible.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-6 bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-xl mb-4 text-gray-800">SmartInsured Reserve Strategy</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                <YAxis yAxisId="left" label={{ value: 'Premium ($)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Reserve Balance ($)', angle: 90, position: 'insideRight' }} />
                <Tooltip formatter={(value: any) => `${Number(value).toLocaleString('en-US', {maximumFractionDigits: 0})}`} />
                <Legend />
                <Bar yAxisId="left" dataKey="Proposed" stackId="a" fill="#fbbf24" />
                <Bar yAxisId="left" dataKey="Recaptured Premium" stackId="a" fill="#86efac" />
                <Line yAxisId="right" type="monotone" dataKey="Smart Insured Reserve" stroke="#6b7280" strokeWidth={2} dot={false} />
                <Line yAxisId="left" type="monotone" dataKey="Current" stroke="#1e3a8a" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-3 text-sm text-gray-600">
              <p><span className="inline-block w-4 h-4 bg-yellow-400 mr-2"></span><strong>Proposed:</strong> Premium with optimized deductibles</p>
              <p><span className="inline-block w-4 h-4 bg-green-300 mr-2"></span><strong>Recaptured Premium:</strong> Savings redirected to reserve</p>
              <p><span className="inline-block w-4 h-3 bg-blue-900 mr-2"></span><strong>Current:</strong> What you'd pay with current deductibles</p>
              <p><span className="inline-block w-4 h-3 bg-gray-500 mr-2"></span><strong>Smart Insured Reserve:</strong> Growing reserve balance</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <h3 className="font-semibold text-xl mb-4 text-gray-800">Year-by-Year Analysis</h3>
            <div className="max-h-96 overflow-y-auto border rounded-lg">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="p-2 text-left border-b">Year</th>
                    <th className="p-2 text-center border-b bg-blue-50">Auto Ded.</th>
                    <th className="p-2 text-center border-b bg-green-50">Home Ded.</th>
                    <th className="p-2 text-right border-b bg-yellow-50">Proposed</th>
                    <th className="p-2 text-right border-b bg-blue-50">Current</th>
                    <th className="p-2 text-right border-b bg-green-50">Recaptured</th>
                    <th className="p-2 text-right border-b bg-purple-50">Reserve Begin</th>
                    <th className="p-2 text-right border-b bg-purple-50">Reserve End</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-2 border-b font-semibold">{row.year}</td>
                      <td className="p-2 border-b text-center bg-blue-50">${row.autoDeductible}</td>
                      <td className="p-2 border-b text-center bg-green-50">${row.homeDeductible.toLocaleString()}</td>
                      <td className="p-2 border-b text-right bg-yellow-50">${row.proposedPremium.toLocaleString('en-US', {maximumFractionDigits: 0})}</td>
                      <td className="p-2 border-b text-right bg-blue-50">${row.currentPremium.toLocaleString('en-US', {maximumFractionDigits: 0})}</td>
                      <td className="p-2 border-b text-right bg-green-50 font-semibold">${row.recapturedPremium.toLocaleString('en-US', {maximumFractionDigits: 0})}</td>
                      <td className="p-2 border-b text-right bg-purple-50">${row.beginningReserve.toLocaleString('en-US', {maximumFractionDigits: 0})}</td>
                      <td className="p-2 border-b text-right bg-purple-50 font-semibold">${row.smartInsuredReserve.toLocaleString('en-US', {maximumFractionDigits: 0})}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h4 className="font-semibold text-blue-900 mb-2">How This Strategy Works:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Start with your current deductible and reserve balance</li>
              <li>Premium savings (vs. lowest deductible) are automatically added to your reserve</li>
              <li>Your reserve earns returns based on your expected rate of return</li>
              <li>When your reserve exceeds the next deductible tier, you automatically upgrade</li>
              <li>Higher deductibles = lower premiums = more savings redirected to reserve</li>
              <li>This creates a compounding cycle that safely increases your deductibles over time</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceOptimizer;
