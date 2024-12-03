
export type CraftLevel = 1 | 2 | 3 | 4 | 5;

export type Materials = {
    iron: number;
    wood: number;
    diamond: number;
    emerald: number;
    galok: number;
    strengthenStone: number;
    maehwaok: number;
    steel: number;
    blackjade: number;
    specialSteel: number;
};

export type Pick = {
    level: CraftLevel;
    count: number;
};

export type EnhanceLog = {
    type: 'success' | 'destroy';
    level: number;
    timestamp: number;
};

export type UsedResources = {
    materials: {
        iron: number;
        wood: number;
        diamond: number;
        emerald: number;
        galok: number;
        strengthenStone: number;
        maehwaok: number;
        steel: number;
        blackjade: number;
        specialSteel: number;
    };
    money: number;
};

export const ENHANCEMENT_RATES: Record<CraftLevel, { success: number; destroy: number }> = {
    1: { success: 55, destroy: 45 },
    2: { success: 30, destroy: 70 },
    3: { success: 20, destroy: 80 },
    4: { success: 15, destroy: 85 },
    5: { success: 15, destroy: 85 }
};

export const STONE_TYPES: Record<CraftLevel, { money: number; materials: Partial<Materials> }> = {
    1: {
        money: 1000,
        materials: {
            iron: 3,
            wood: 3
        }
    },
    2: {
        money: 5000,
        materials: {
            iron: 1,
            galok: 2,
            strengthenStone: 2,
            diamond: 2
        }
    },
    3: {
        money: 10000,
        materials: {
            steel: 1,
            emerald: 5,
            strengthenStone: 2
        }
    },
    4: {
        money: 20000,
        materials: {
            steel: 2,
            maehwaok: 2,
            strengthenStone: 2
        }
    },
    5: {
        money: 40000,
        materials: {
            blackjade: 2,
            specialSteel: 2,
            strengthenStone: 2
        }
    }
};

export const MATERIAL_NAMES: Record<keyof Materials, string> = {
    iron: '철',
    wood: '참나무원목',
    diamond: '다이아몬드',
    emerald: '에메랄드',
    galok: '갈옥',
    strengthenStone: '장비강화석',
    maehwaok: '매화옥',
    steel: '강철',
    blackjade: '흑옥',
    specialSteel: '오금철'
};