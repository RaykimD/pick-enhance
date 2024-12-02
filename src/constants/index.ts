type EnhancementLevel = 1 | 2 | 3 | 4;

export const ENHANCEMENT_RATES: Record<EnhancementLevel, { success: number; destroy: number }> = {
    1: { success: 55, destroy: 45 },
    2: { success: 30, destroy: 70 },
    3: { success: 20, destroy: 80 },
    4: { success: 15, destroy: 85 }
};

export const CRAFT_REQUIREMENTS = {
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
            iron: 1,
            sinseonok: 2,
            strengthenStone: 2,
            emerald: 2
        }
    },
    4: {
        money: 20000,
        materials: {
            steel: 2,
            maehwaok: 2
        }
    },
    5: {
        money: 40000,
        materials: {
            steel: 2,
            maehwaok: 2,
            strengthenStone: 2
        }
    }
};

export const MATERIAL_NAMES: Record<keyof Materials, string> = {
    iron: '철',
    strengthenStone: '장비강화석',
    wood: '참나무원목',
    diamond: '다이아몬드',
    emerald: '에메랄드',
    galok: '갈옥',
    sinseonok: '신선옥',
    maehwaok: '매화옥',
    steel: '강철'
};