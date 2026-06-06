import React, { useState, useEffect, useCallback } from 'react';
import { Save, Download, Trash2, Upload } from 'lucide-react';
import {
  saveScenario,
  loadScenarios,
  deleteScenario,
  exportScenarioAsJson,
  ScenarioMap,
} from '../lib/scenarios';
import type { ProjectionInputs } from '../lib/types';

interface ScenarioPanelProps {
  currentInputs: ProjectionInputs;
  onLoad: (inputs: ProjectionInputs) => void;
}

const ScenarioPanel: React.FC<ScenarioPanelProps> = ({ currentInputs, onLoad }) => {
  const [name, setName] = useState('');
  const [scenarios, setScenarios] = useState<ScenarioMap>({});

  const refresh = useCallback(() => {
    setScenarios(loadScenarios());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    saveScenario(trimmed, currentInputs);
    setName('');
    refresh();
  };

  const handleDelete = (scenarioName: string) => {
    deleteScenario(scenarioName);
    refresh();
  };

  const handleLoad = (scenarioName: string) => {
    const scenario = scenarios[scenarioName];
    if (scenario) onLoad(scenario);
  };

  const handleExport = () => {
    const json = exportScenarioAsJson(currentInputs);
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'smartinsured-scenario.json';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const names = Object.keys(scenarios);

  return (
    <section
      aria-labelledby="scenarios-heading"
      className="bg-white rounded-xl shadow-xl p-4 sm:p-6 mb-6"
    >
      <h3
        id="scenarios-heading"
        className="font-semibold text-xl mb-4 text-gray-800 flex items-center gap-2"
      >
        <Save className="w-5 h-5 text-indigo-600" />
        Scenarios
      </h3>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <label htmlFor="scenario-name" className="sr-only">
          Scenario name
        </label>
        <input
          id="scenario-name"
          type="text"
          placeholder="Scenario name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={!name.trim()}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
        >
          <Save className="w-4 h-4" />
          Save Scenario
        </button>
        <button
          type="button"
          onClick={handleExport}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 justify-center"
        >
          <Download className="w-4 h-4" />
          Export JSON
        </button>
      </div>

      {names.length === 0 ? (
        <p className="text-sm text-gray-500 italic">
          No saved scenarios yet. Enter a name above and click Save Scenario to capture the current
          inputs.
        </p>
      ) : (
        <ul className="space-y-2">
          {names.map((scenarioName) => (
            <li
              key={scenarioName}
              className="flex items-center justify-between bg-gray-50 p-2 rounded border"
            >
              <span className="font-medium text-gray-800 truncate mr-2">{scenarioName}</span>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleLoad(scenarioName)}
                  aria-label={`Load scenario ${scenarioName}`}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-1"
                >
                  <Upload className="w-3 h-3" />
                  Load
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(scenarioName)}
                  aria-label={`Delete scenario ${scenarioName}`}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ScenarioPanel;
