type EnhancementLevel = 1 | 2 | 3 | 4;
type CraftLevel = 1 | 2 | 3 | 4 | 5;

export const ENHANCEMENT_RATES: Record<EnhancementLevel, { success: number; destroy: number }> = {
    1: { success: 55, destroy: 45 },
    2: { success: 30, destroy: 70 },
    3: { success: 20, destroy: 80 },
    4: { success: 15, destroy: 85 }
};

export const CRAFT_REQUIREMENTS: Record<CraftLevel, { money: number; materials: Record<string, number> }> = {
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