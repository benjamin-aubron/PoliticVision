import { Response, PoliticalScore, Question, Ideology, IdeologyMatch, ResponseValue } from './types';
import { questions, ideologies } from '../db/dataFr';

/**
 * Normalise une valeur de réponse (1-5 ou 0) vers un score pondéré (-1 à +1)
 * 0 = Ne se prononce pas -> 0 (neutre)
 * 1 = Pas du tout d'accord -> -1
 * 2 = Plutôt pas d'accord -> -0.5
 * 3 = Mitigé -> 0
 * 4 = Plutôt d'accord -> +0.5
 * 5 = Totalement d'accord -> +1
 */
function normalizeResponseValue(responseValue: ResponseValue): number {
  const mapping: Record<ResponseValue, number> = {
    0: 0,    // Ne se prononce pas
    1: -1,   // Pas du tout d'accord
    2: -0.5, // Plutôt pas d'accord
    3: 0,    // Mitigé
    4: 0.5,  // Plutôt d'accord
    5: 1     // Totalement d'accord
  };
  
  return mapping[responseValue] || 0;
}

/**
 * Convertit un score brut (-1 à +1) vers une échelle 0-100
 * -1 -> 0, 0 -> 50, +1 -> 100
 */
function scoreToPercentage(score: number): number {
  return Math.max(0, Math.min(100, Math.round((score + 1) * 50)));
}

/**
 * Calcule le score politique d'un utilisateur basé sur ses réponses
 */
export function calculatePoliticalScore(responses: number[]): PoliticalScore {
  if (responses.length !== questions.length) {
    throw new Error(`Expected ${questions.length} responses, got ${responses.length}`);
  }

  let economicSum = 0;
  let socialSum = 0;
  let authoritySum = 0;
  let environmentSum = 0;
  let economicWeight = 0;
  let socialWeight = 0;
  let authorityWeight = 0;
  let environmentWeight = 0;

  // Parcourir toutes les réponses
  for (let i = 0; i < responses.length; i++) {
    const response = responses[i] as ResponseValue;
    const question = questions[i];
    
    if (!question) continue;

    const normalizedResponse = normalizeResponseValue(response);
    
    // Si l'utilisateur ne s'est pas prononcé (0), on ignore cette réponse
    if (normalizedResponse === 0) continue;

    // Calculer la contribution pondérée pour chaque axe
    const { economic, social, authority, environment } = question.axes;
    
    if (economic !== 0) {
      economicSum += normalizedResponse * economic;
      economicWeight += Math.abs(economic);
    }
    
    if (social !== 0) {
      socialSum += normalizedResponse * social;
      socialWeight += Math.abs(social);
    }
    
    if (authority !== 0) {
      authoritySum += normalizedResponse * authority;
      authorityWeight += Math.abs(authority);
    }
    
    if (environment !== 0) {
      environmentSum += normalizedResponse * environment;
      environmentWeight += Math.abs(environment);
    }
  }

  // Calculer les scores moyens pondérés
  const economicScore = economicWeight > 0 ? economicSum / economicWeight : 0;
  const socialScore = socialWeight > 0 ? socialSum / socialWeight : 0;
  const authorityScore = authorityWeight > 0 ? authoritySum / authorityWeight : 0;
  const environmentScore = environmentWeight > 0 ? environmentSum / environmentWeight : 0;

  // Convertir en pourcentages (0-100)
  return {
    economic: scoreToPercentage(economicScore),
    social: scoreToPercentage(socialScore),
    authority: scoreToPercentage(authorityScore),
    environment: scoreToPercentage(environmentScore)
  };
}

/**
 * Calcule la distance euclidienne entre un score utilisateur et une idéologie
 */
function calculateIdeologyDistance(userScore: PoliticalScore, ideology: Ideology): number {
  const { economic, social, authority, environment } = userScore;
  const ranges = ideology.scoreRanges;
  
  // Pour chaque axe, calculer la distance au range de l'idéologie
  const economicDistance = Math.min(
    Math.abs(economic - ranges.economic[0]),
    Math.abs(economic - ranges.economic[1]),
    economic >= ranges.economic[0] && economic <= ranges.economic[1] ? 0 : 
      Math.min(Math.abs(economic - ranges.economic[0]), Math.abs(economic - ranges.economic[1]))
  );
  
  const socialDistance = Math.min(
    Math.abs(social - ranges.social[0]),
    Math.abs(social - ranges.social[1]),
    social >= ranges.social[0] && social <= ranges.social[1] ? 0 : 
      Math.min(Math.abs(social - ranges.social[0]), Math.abs(social - ranges.social[1]))
  );
  
  const authorityDistance = Math.min(
    Math.abs(authority - ranges.authority[0]),
    Math.abs(authority - ranges.authority[1]),
    authority >= ranges.authority[0] && authority <= ranges.authority[1] ? 0 : 
      Math.min(Math.abs(authority - ranges.authority[0]), Math.abs(authority - ranges.authority[1]))
  );
  
  const environmentDistance = Math.min(
    Math.abs(environment - ranges.environment[0]),
    Math.abs(environment - ranges.environment[1]),
    environment >= ranges.environment[0] && environment <= ranges.environment[1] ? 0 : 
      Math.min(Math.abs(environment - ranges.environment[0]), Math.abs(environment - ranges.environment[1]))
  );

  return Math.sqrt(
    economicDistance ** 2 + 
    socialDistance ** 2 + 
    authorityDistance ** 2 + 
    environmentDistance ** 2
  );
}

/**
 * Calcule le pourcentage de compatibilité basé sur la distance
 */
function calculateCompatibility(distance: number): number {
  // Distance maximale théorique = sqrt(100^2 * 4) = 200
  const maxDistance = 200;
  const compatibility = Math.max(0, 100 - (distance / maxDistance) * 100);
  return Math.round(compatibility);
}

/**
 * Trouve les meilleures correspondances idéologiques pour un score donné
 */
export function findBestIdeologyMatches(score: PoliticalScore): IdeologyMatch[] {
  const matches = ideologies.map(ideology => {
    const distance = calculateIdeologyDistance(score, ideology);
    const compatibility = calculateCompatibility(distance);
    
    return {
      ideology,
      compatibility,
      distance
    };
  });

  // Trier par compatibilité décroissante
  return matches.sort((a, b) => b.compatibility - a.compatibility);
}

/**
 * Trouve la meilleure correspondance idéologique
 */
export function findBestIdeologyMatch(score: PoliticalScore): IdeologyMatch {
  const matches = findBestIdeologyMatches(score);
  return matches[0];
}

/**
 * Encode un score politique en string pour URL sharing
 */
export function encodeScore(score: PoliticalScore): string {
  const values = [score.economic, score.social, score.authority, score.environment];
  return btoa(values.join(','));
}

/**
 * Decode un score politique depuis une string
 */
export function decodeScore(encoded: string): PoliticalScore | null {
  try {
    const decoded = atob(encoded);
    const values = decoded.split(',').map(v => parseInt(v, 10));
    
    if (values.length !== 4 || values.some(v => isNaN(v) || v < 0 || v > 100)) {
      return null;
    }
    
    return {
      economic: values[0],
      social: values[1],
      authority: values[2],
      environment: values[3]
    };
  } catch {
    return null;
  }
}

/**
 * Obtient les labels descriptifs pour chaque axe basé sur le score
 */
export function getAxisLabels(score: PoliticalScore) {
  return {
    economic: score.economic < 40 ? "Gauche économique" : 
              score.economic > 60 ? "Droite économique" : "Centre économique",
    social: score.social < 40 ? "Progressiste" : 
            score.social > 60 ? "Conservateur" : "Modéré social",
    authority: score.authority < 40 ? "Libertaire" : 
               score.authority > 60 ? "Autoritaire" : "Équilibré autorité",
    environment: score.environment < 40 ? "Écologiste" : 
                 score.environment > 60 ? "Croissanciste" : "Équilibré environnement"
  };
}