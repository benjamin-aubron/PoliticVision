'use client';

import { IdeologyMatch } from '../../lib/types';
import { encodeScore } from '../../lib/scoring';
import { useState } from 'react';

interface IdeologyMatchProps {
  matches: IdeologyMatch[];
  onRestart?: () => void;
  className?: string;
}

function ShareButton({ score }: { score: any }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = () => {
    if (typeof window !== 'undefined') {
      const encoded = encodeScore(score);
      const url = `${window.location.origin}/?results=${encoded}`;
      
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const shareNative = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      const encoded = encodeScore(score);
      const url = `${window.location.origin}/?results=${encoded}`;
      
      navigator.share({
        title: 'Mon profil politique - PoliticVision',
        text: 'Découvrez mon positionnement politique !',
        url: url
      });
    } else {
      shareUrl();
    }
  };

  return (
    <button
      onClick={shareNative}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
    >
      {copied ? (
        <>
          ✓ Lien copié !
        </>
      ) : (
        <>
          🔗 Partager mes résultats
        </>
      )}
    </button>
  );
}

function IdeologyCard({ 
  match, 
  rank, 
  isTop = false 
}: { 
  match: IdeologyMatch; 
  rank: number; 
  isTop?: boolean;
}) {
  const { ideology, compatibility } = match;
  
  return (
    <div className={`
      rounded-lg border transition-all duration-200 
      ${isTop 
        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md' 
        : 'bg-white border-gray-200 hover:shadow-sm'
      }
    `}>
      <div className="p-4 sm:p-6">
        {/* Header avec rang et pourcentage */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {isTop && <div className="text-2xl">🏆</div>}
            <div>
              <h3 className={`font-bold text-lg ${isTop ? 'text-blue-900' : 'text-gray-900'}`}>
                {ideology.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>#{rank}</span>
                <span>•</span>
                <span className="font-medium">{compatibility}% compatible</span>
              </div>
            </div>
          </div>
          
          {/* Couleur de l'idéologie */}
          <div 
            className="w-4 h-4 rounded-full shadow-sm"
            style={{ backgroundColor: ideology.color }}
          />
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {ideology.description}
        </p>

        {/* Barre de compatibilité */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Compatibilité</span>
            <span>{compatibility}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                compatibility >= 80 ? 'bg-green-500' :
                compatibility >= 60 ? 'bg-yellow-500' :
                compatibility >= 40 ? 'bg-orange-500' :
                'bg-red-500'
              }`}
              style={{ width: `${compatibility}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function IdeologyMatchComponent({ 
  matches, 
  onRestart,
  className = "" 
}: IdeologyMatchProps) {
  if (!matches || matches.length === 0) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <div className="text-4xl mb-4">🤔</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Aucune correspondance trouvée
        </h3>
        <p className="text-gray-600 text-sm">
          Il y a eu un problème lors du calcul de vos correspondances idéologiques.
        </p>
      </div>
    );
  }

  const topMatch = matches[0];
  const otherMatches = matches.slice(1, 4); // Top 3 autres

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Votre Correspondance Idéologique
        </h2>
        <p className="text-gray-600">
          Voici les idéologies politiques qui correspondent le mieux à vos réponses
        </p>
      </div>

      {/* Meilleure correspondance (mise en avant) */}
      <div className="relative">
        <div className="absolute -top-2 -left-2 bg-yellow-400 text-yellow-900 text-xs font-bold py-1 px-2 rounded-full">
          Meilleure correspondance
        </div>
        <IdeologyCard match={topMatch} rank={1} isTop={true} />
      </div>

      {/* Autres correspondances */}
      {otherMatches.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 text-lg">
            Autres correspondances
          </h3>
          <div className="space-y-3">
            {otherMatches.map((match, index) => (
              <IdeologyCard 
                key={match.ideology.id} 
                match={match} 
                rank={index + 2} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h4 className="font-semibold text-gray-800 mb-3">
          Que souhaitez-vous faire maintenant ?
        </h4>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {onRestart && (
            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex-1"
            >
              🔄 Refaire le test
            </button>
          )}
          
          <ShareButton score={topMatch ? {
            economic: 50,  // Ces valeurs seront passées depuis le parent
            social: 50,
            authority: 50,
            environment: 50
          } : null} />
        </div>

        <div className="text-xs text-gray-500 text-center">
          💡 Partagez vos résultats pour comparer avec vos proches
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-medium text-yellow-800 mb-1">
          ⚠️ Important à retenir
        </h5>
        <p className="text-sm text-yellow-700">
          Ce test est à titre indicatif et ne remplace pas une analyse politique approfondie. 
          Les idéologies politiques sont complexes et nuancées. Vos opinions peuvent évoluer 
          et ne se limitent pas forcément à une seule famille politique.
        </p>
      </div>

      {/* Stats summary */}
      <div className="text-center text-sm text-gray-500">
        Analysé parmi {matches.length} idéologies politiques
      </div>
    </div>
  );
}