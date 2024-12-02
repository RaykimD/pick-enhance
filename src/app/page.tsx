'use client';
import React, { useState } from 'react';
import { Pick, EnhanceLog, UsedResources, CraftLevel } from '../types';
import { ENHANCEMENT_RATES, CRAFT_REQUIREMENTS, MATERIAL_NAMES } from '../constants';

const calculateEnhancementLevel = (level: number): 1 | 2 | 3 | 4 => {
  const enhanceLevel = level - 1;
  if (enhanceLevel >= 1 && enhanceLevel <= 4) {
    return enhanceLevel as 1 | 2 | 3 | 4;
  }
  return 1;
};

const isCraftLevel = (level: number): level is CraftLevel => {
  return level >= 1 && level <= 5;
};

export default function Home() {
  const [picks, setPicks] = useState<Pick[]>([
    { level: 1, count: 0 },
    { level: 2, count: 0 },
    { level: 3, count: 0 },
    { level: 4, count: 0 },
    { level: 5, count: 0 }
  ]);

  const [enhanceLogs, setEnhanceLogs] = useState<EnhanceLog[]>([]);
  const [usedResources, setUsedResources] = useState<UsedResources>({
    picks: {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0
    },
    materials: {
      iron: 0,
      strengthenStone: 0,
      wood: 0,
      diamond: 0,
      emerald: 0,
      galok: 0,
      sinseonok: 0,
      maehwaok: 0,
      steel: 0
    },
    money: 0
  });

  const addEnhanceLog = (type: 'success' | 'destroy', level: number) => {
    setEnhanceLogs(prev => {
      const newLog = {
        type,
        level,
        timestamp: Date.now()
      };
      return [newLog, ...prev].slice(0, 5);
    });
  };

  const createPick = (level: number) => {
    if (level === 1) {
      setPicks(prev => prev.map(pick =>
        pick.level === 1 ? { ...pick, count: pick.count + 1 } : pick
      ));
      setUsedResources(prev => ({
        ...prev,
        picks: {
          ...prev.picks,
          level1: prev.picks.level1 + 1
        },
        materials: {
          ...prev.materials,
          iron: prev.materials.iron + CRAFT_REQUIREMENTS[1].materials.iron,
          wood: prev.materials.wood + CRAFT_REQUIREMENTS[1].materials.wood
        },
        money: prev.money + CRAFT_REQUIREMENTS[1].money
      }));
      return;
    }

    const prevLevelPick = picks.find(p => p.level === level - 1);
    if (!prevLevelPick || prevLevelPick.count === 0) {
      alert(`${level - 1}강 곡괭이가 필요합니다`);
      return;
    }

    const roll = Math.random() * 100;
    const enhanceLevel = calculateEnhancementLevel(level);

    if (roll < ENHANCEMENT_RATES[enhanceLevel].success) {
      setPicks(prev => prev.map(pick => {
        if (pick.level === level - 1) return { ...pick, count: pick.count - 1 };
        if (pick.level === level) return { ...pick, count: pick.count + 1 };
        return pick;
      }));
      addEnhanceLog('success', level);

      if (isCraftLevel(level)) {
        const requirements = CRAFT_REQUIREMENTS[level];
        setUsedResources(prev => ({
          ...prev,
          picks: {
            ...prev.picks,
            [`level${level}`]: prev.picks[`level${level}` as keyof typeof prev.picks] + 1
          },
          materials: {
            ...prev.materials,
            ...Object.entries(requirements.materials).reduce((acc, [key, value]) => ({
              ...acc,
              [key]: prev.materials[key as keyof typeof prev.materials] + value
            }), {})
          },
          money: prev.money + requirements.money
        }));
      }
    } else {
      setPicks(prev => prev.map(pick =>
        pick.level === level - 1 ? { ...pick, count: pick.count - 1 } : pick
      ));
      addEnhanceLog('destroy', level - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">코창서버 곡괭이 강화 시뮬레이터</h1>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">곡괭이 제작/강화</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {picks.map((pick) => (
              <div key={pick.level} className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-white font-bold mb-2">{pick.level}강 곡괭이</p>
                <p className="text-blue-400 mb-4">보유: {pick.count}개</p>
                <div className="space-y-2">
                  <button
                    onClick={() => createPick(pick.level)}
                    className="w-full bg-green-600 hover:bg-green-500 text-white rounded px-4 py-2 text-sm"
                  >
                    {pick.level === 1 ? '제작' : '강화'}
                    ({isCraftLevel(pick.level) ? CRAFT_REQUIREMENTS[pick.level].money.toLocaleString() : 0}원)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">강화 확률</h2>
            <div className="space-y-2 text-gray-300">
              {Object.entries(ENHANCEMENT_RATES).map(([level, rates]) => (
                <div key={level} className="flex justify-between">
                  <span>{level}강 → {Number(level) + 1}강:</span>
                  <span>성공 {rates.success}% / 파괴 {rates.destroy}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">강화 로그</h2>
            <div className="space-y-2">
              {enhanceLogs.map((log) => (
                <div
                  key={log.timestamp}
                  className={`text-sm ${log.type === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}
                >
                  {log.type === 'success'
                    ? `${log.level}강 제작 성공`
                    : `${log.level}강 곡괭이 파괴`
                  }
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">사용된 재화</h2>
            <div className="space-y-2 text-gray-300">
              <p>총 사용 금액: {usedResources.money.toLocaleString()}원</p>
              {Object.entries(usedResources.materials).map(([material, count]) => (
                count > 0 && (
                  <p key={material}>
                    {MATERIAL_NAMES[material as keyof typeof MATERIAL_NAMES]}: {count}개
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}