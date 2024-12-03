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
    stones: {
        normal: number;
        advanced: number;
        supreme: number;
    };
    materials: {
        iron: number;
        blackIron: number;
        specialIron: number;
        lapis: number;
    };
    money: number;
};