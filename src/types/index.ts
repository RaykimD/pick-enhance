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
    iron: number;           // 철
    strengthenStone: number;// 장비강화석
    wood: number;          // 참나무원목
    diamond: number;       // 다이아몬드
    emerald: number;       // 에메랄드
    galok: number;         // 갈옥
    sinseonok: number;     // 신선옥
    maehwaok: number;      // 매화옥
    steel: number;         // 강철
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