import { Question, Ideology } from '../lib/types';

export const questions: Question[] = [
	{
		id: 1,
		text: "La peine de mort doit exister",
		categories: ["société", "valeurs"],
		axes: { economic: 0, social: 0.7, authority: 0.8, environment: 0 }
	},
	{
		id: 2,
		text: "Il faut interdire les religions",
		categories: ["société", "valeurs"],
		axes: { economic: 0, social: -0.9, authority: 0.6, environment: 0 }
	},
	{
		id: 3,
		text: "Les banques doivent être nationalisées",
		categories: ["économie", "finance"],
		axes: { economic: -0.8, social: 0, authority: 0.3, environment: 0 }
	},
	{
		id: 4,
		text: "Les impôts sur les riches doivent augmenter",
		categories: ["économie", "fiscalité"],
		axes: { economic: -0.7, social: 0, authority: 0.2, environment: 0 }
	},
	{
		id: 5,
		text: "L'immigration doit être fortement limitée",
		categories: ["société", "immigration"],
		axes: { economic: 0.2, social: 0.8, authority: 0.5, environment: 0 }
	},
	{
		id: 6,
		text: "L'État doit contrôler davantage l'économie",
		categories: ["économie", "état"],
		axes: { economic: -0.6, social: 0, authority: 0.4, environment: 0 }
	},
	{
		id: 7,
		text: "Le mariage pour tous est une bonne chose",
		categories: ["société", "valeurs"],
		axes: { economic: 0, social: -0.8, authority: -0.3, environment: 0 }
	},
	{
		id: 8,
		text: "Les entreprises privées sont plus efficaces que l'État",
		categories: ["économie", "entreprise"],
		axes: { economic: 0.7, social: 0, authority: -0.2, environment: 0 }
	},
	{
		id: 9,
		text: "La lutte contre le changement climatique doit être prioritaire",
		categories: ["environnement", "écologie"],
		axes: { economic: -0.3, social: -0.4, authority: 0.3, environment: -0.9 }
	},
	{
		id: 10,
		text: "Les syndicats ont trop de pouvoir",
		categories: ["économie", "social"],
		axes: { economic: 0.6, social: 0.2, authority: -0.1, environment: 0 }
	},
	{
		id: 11,
		text: "Il faut légaliser le cannabis",
		categories: ["société", "liberté"],
		axes: { economic: 0, social: -0.6, authority: -0.7, environment: 0 }
	},
	{
		id: 12,
		text: "La France doit sortir de l'Union européenne",
		categories: ["politique", "europe"],
		axes: { economic: -0.2, social: 0.6, authority: 0.4, environment: 0 }
	},
	{
		id: 13,
		text: "Les allocations chômage sont trop généreuses",
		categories: ["économie", "social"],
		axes: { economic: 0.5, social: 0.3, authority: 0, environment: 0 }
	},
	{
		id: 14,
		text: "L'avortement doit rester libre et gratuit",
		categories: ["société", "valeurs"],
		axes: { economic: 0, social: -0.7, authority: -0.4, environment: 0 }
	},
	{
		id: 15,
		text: "Il faut augmenter les dépenses militaires",
		categories: ["politique", "sécurité"],
		axes: { economic: 0.3, social: 0.5, authority: 0.6, environment: 0.2 }
	},
	{
		id: 16,
		text: "Les voitures électriques doivent remplacer l'essence",
		categories: ["environnement", "transport"],
		axes: { economic: 0.1, social: -0.2, authority: 0.4, environment: -0.8 }
	},
	{
		id: 17,
		text: "Il faut réduire le temps de travail",
		categories: ["économie", "social"],
		axes: { economic: -0.5, social: -0.3, authority: 0.2, environment: 0 }
	},
	{
		id: 18,
		text: "Les manifestations doivent être mieux encadrées",
		categories: ["société", "liberté"],
		axes: { economic: 0, social: 0.4, authority: 0.7, environment: 0 }
	},
	{
		id: 19,
		text: "L'énergie nucléaire est indispensable",
		categories: ["environnement", "énergie"],
		axes: { economic: 0.4, social: 0.2, authority: 0.1, environment: 0.6 }
	},
	{
		id: 20,
		text: "Les services publics doivent être privatisés",
		categories: ["économie", "état"],
		axes: { economic: 0.8, social: 0.2, authority: -0.3, environment: 0 }
	}
];

export const ideologies: Ideology[] = [
	{
		id: "extreme-gauche",
		name: "Extrême gauche",
		description: "Révolutionnaire, anticapitaliste, internationaliste. Prône une transformation radicale de la société.",
		color: "#dc2626",
		scoreRanges: {
			economic: [0, 25],
			social: [0, 40],
			authority: [0, 60],
			environment: [0, 30]
		}
	},
	{
		id: "gauche",
		name: "Gauche",
		description: "Socialiste, progressiste, favorable à l'intervention de l'État. Défend l'égalité et la justice sociale.",
		color: "#ef4444",
		scoreRanges: {
			economic: [15, 45],
			social: [0, 50],
			authority: [20, 70],
			environment: [0, 40]
		}
	},
	{
		id: "centre-gauche",
		name: "Centre gauche",
		description: "Social-démocrate, réformiste, équilibre entre marché et intervention publique.",
		color: "#f97316",
		scoreRanges: {
			economic: [35, 55],
			social: [20, 60],
			authority: [30, 70],
			environment: [20, 50]
		}
	},
	{
		id: "centre",
		name: "Centre",
		description: "Libéral modéré, pragmatique, favorable aux réformes graduelles et à l'économie de marché sociale.",
		color: "#eab308",
		scoreRanges: {
			economic: [45, 65],
			social: [40, 80],
			authority: [40, 80],
			environment: [30, 70]
		}
	},
	{
		id: "centre-droit",
		name: "Centre droit",
		description: "Libéral conservateur, favorable au marché avec quelques régulations, valeurs traditionnelles modérées.",
		color: "#22c55e",
		scoreRanges: {
			economic: [55, 75],
			social: [50, 90],
			authority: [40, 80],
			environment: [40, 80]
		}
	},
	{
		id: "droite",
		name: "Droite",
		description: "Conservateur, libéral économiquement, attaché aux valeurs traditionnelles et à l'ordre.",
		color: "#3b82f6",
		scoreRanges: {
			economic: [65, 85],
			social: [60, 100],
			authority: [50, 90],
			environment: [50, 100]
		}
	},
	{
		id: "extreme-droite",
		name: "Extrême droite",
		description: "Nationaliste, autoritaire, traditionaliste. Prône un État fort et des valeurs conservatrices.",
		color: "#6366f1",
		scoreRanges: {
			economic: [40, 100],
			social: [75, 100],
			authority: [70, 100],
			environment: [60, 100]
		}
	},
	{
		id: "ecologiste",
		name: "Écologiste",
		description: "Priorité à l'environnement, décroissance, démocratie participative, justice sociale.",
		color: "#10b981",
		scoreRanges: {
			economic: [20, 60],
			social: [0, 50],
			authority: [0, 50],
			environment: [0, 30]
		}
	}
];
