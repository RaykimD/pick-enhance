export type CraftLevel = 1 | 2 | 3 | 4 | 5;
export type EnhancementLevel = 1 | 2 | 3 | 4;

export type Pick = {
    level: number;
    count: number;
};

export type EnhanceLog = {
    type: 'success' | 'destroy';
    level: number;
    timestamp: number;
};

export type Materials = {
    iron: number;
    strengthenStone: number;
    wood: number;
    diamond: number;
    emerald: number;
    galok: number;
    sinseonok: number;
    maehwaok: number;
    steel: number;
};

export type UsedResources = {
    picks: {
        level1: number;
        level2: number;
        level3: number;
        level4: number;
        level5: number;
    };
    materials: Materials;
    money: number;
};