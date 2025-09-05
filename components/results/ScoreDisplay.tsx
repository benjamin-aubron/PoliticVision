'use client';

import { PoliticalScore } from '../../lib/types';
import { getAxisLabels } from '../../lib/scoring';

interface ScoreDisplayProps {
  score: PoliticalScore;
  className?: string;
}

interface AxisBarProps {
  label: string;
  value: number;
  description: string;
  leftLabel: string;
  rightLabel: string;
  color: string;
}

function AxisBar({ label, value, description, leftLabel, rightLabel, color }: AxisBarProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{label}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="text-2xl font-bold text-gray-800">
          {value}%
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        {/* Labels des extrêmes */}
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span className="font-medium">{leftLabel}</span>
          <span className="font-medium">{rightLabel}</span>
        </div>

        {/* Barre de progression */}
        <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
          {/* Graduation au centre (50%) */}
          <div className="absolute left-1/2 top-0 w-px h-full bg-gray-400 z-10" />
          
          {/* Barre de progression colorée */}
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
            style={{ width: `${value}%` }}
          />
          
          {/* Indicateur de valeur */}
          <div 
            className="absolute top-0 h-full w-1 bg-gray-800 shadow-sm z-20 transition-all duration-1000"
            style={{ left: `${value}%` }}
          />
        </div>

        {/* Graduations */}
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span className="text-gray-500">50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}

export function ScoreDisplay({ score, className = "" }: ScoreDisplayProps) {
  const labels = getAxisLabels(score);

  const axes = [
    {
      key: 'economic',
      label: 'Axe Économique',
      value: score.economic,
      description: labels.economic,
      leftLabel: 'Gauche',
      rightLabel: 'Droite',
      color: score.economic < 40 ? 'bg-gradient-to-r from-red-500 to-red-400' :
             score.economic > 60 ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
             'bg-gradient-to-r from-yellow-500 to-yellow-400'
    },
    {
      key: 'social',
      label: 'Axe Social',
      value: score.social,
      description: labels.social,
      leftLabel: 'Progressiste',
      rightLabel: 'Conservateur',
      color: score.social < 40 ? 'bg-gradient-to-r from-purple-500 to-purple-400' :
             score.social > 60 ? 'bg-gradient-to-r from-indigo-500 to-indigo-400' :
             'bg-gradient-to-r from-pink-500 to-pink-400'
    },
    {
      key: 'authority',
      label: 'Axe Autorité',
      value: score.authority,
      description: labels.authority,
      leftLabel: 'Libertaire',
      rightLabel: 'Autoritaire',
      color: score.authority < 40 ? 'bg-gradient-to-r from-green-500 to-green-400' :
             score.authority > 60 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
             'bg-gradient-to-r from-teal-500 to-teal-400'
    },
    {
      key: 'environment',
      label: 'Axe Environnemental',
      value: score.environment,
      description: labels.environment,
      leftLabel: 'Écologiste',
      rightLabel: 'Croissanciste',
      color: score.environment < 40 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
             score.environment > 60 ? 'bg-gradient-to-r from-gray-500 to-gray-400' :
             'bg-gradient-to-r from-lime-500 to-lime-400'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Votre Profil Politique
        </h2>
        <p className="text-gray-600">
          Voici votre positionnement sur les 4 axes politiques principaux
        </p>
      </div>

      {/* Axes */}
      <div className="space-y-4">
        {axes.map((axis) => (
          <AxisBar
            key={axis.key}
            label={axis.label}
            value={axis.value}
            description={axis.description}
            leftLabel={axis.leftLabel}
            rightLabel={axis.rightLabel}
            color={axis.color}
          />
        ))}
      </div>

      {/* Legend/Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-blue-900 mb-2">💡 Comment lire ces résultats ?</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• <strong>0-40%</strong> : Position de gauche/progressiste sur l'axe</p>
          <p>• <strong>40-60%</strong> : Position centriste/modérée sur l'axe</p>
          <p>• <strong>60-100%</strong> : Position de droite/conservatrice sur l'axe</p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {axes.map((axis) => (
          <div key={axis.key} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">{axis.value}%</div>
            <div className="text-xs text-gray-600 truncate">{axis.label.replace('Axe ', '')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}