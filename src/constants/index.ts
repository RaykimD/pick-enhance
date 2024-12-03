import { Materials } from '../types';

type CraftLevel = 1 | 2 | 3 | 4 | 5;

export const ENHANCEMENT_RATES: Record<CraftLevel, { success: number; destroy: number }> = {
    1: { success: 55, destroy: 45 },
    2: { success: 30, destroy: 70 },
    3: { success: 20, destroy: 80 },
    4: { success: 15, destroy: 85 },
    5: { success: 15, destroy: 85 }  // 5강 추가
};

export const STONE_TYPES = {
    normal: {
        cost: 1000,
        materials: {
            iron: 3,
            wood: 3
        }
    },
    2: CRAFT_REQUIREMENTS[2],
    3: CRAFT_REQUIREMENTS[3],
    4: CRAFT_REQUIREMENTS[4],
    5: CRAFT_REQUIREMENTS[5]
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

export { CRAFT_REQUIREMENTS };