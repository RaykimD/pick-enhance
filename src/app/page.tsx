'use client';
import React, { useState } from 'react';
import {
  Pick,
  EnhanceLog,
  UsedResources,
  STONE_TYPES,
  ENHANCEMENT_RATES as ENHANCE_RATES,
  CraftLevel
} from '../types';

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
    stones: {
      normal: 0,
      advanced: 0,
      supreme: 0
    },
    materials: {
      iron: 0,
      blackIron: 0,
      specialIron: 0,
      lapis: 0
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

  const createPick = (level: CraftLevel) => {
    if (level === 1) {
      setPicks(prev => prev.map(pick =>
        pick.level === 1 ? { ...pick, count: pick.count + 1 } : pick
      ));
      setUsedResources(prev => ({
        ...prev,
        materials: {
          iron: prev.materials.iron + STONE_TYPES[1].materials.iron,
          blackIron: prev.materials.blackIron + (STONE_TYPES[1].materials.blackIron || 0),
          specialIron: prev.materials.specialIron + (STONE_TYPES[1].materials.specialIron || 0),
          lapis: prev.materials.lapis + (STONE_TYPES[1].materials.lapis || 0)
        },
        money: prev.money + STONE_TYPES[1].money
      }));
    } else {
      const prevLevelPick = picks.find(p => p.level === level - 1);
      if (!prevLevelPick || prevLevelPick.count === 0) {
        alert(`${level - 1}강 곡괭이가 필요합니다`);
        return;
      }

      const roll = Math.random() * 100;
      if (roll < ENHANCE_RATES[level].success) {
        setPicks(prev => prev.map(pick => {
          if (pick.level === level - 1) return { ...pick, count: pick.count - 1 };
          if (pick.level === level) return { ...pick, count: pick.count + 1 };
          return pick;
        }));
        addEnhanceLog('success', level);

        const stoneCost = STONE_TYPES[level];
        setUsedResources(prev => ({
          ...prev,
          materials: {
            iron: prev.materials.iron + (stoneCost.materials.iron || 0),
            blackIron: prev.materials.blackIron + (stoneCost.materials.blackIron || 0),
            specialIron: prev.materials.specialIron + (stoneCost.materials.specialIron || 0),
            lapis: prev.materials.lapis + (stoneCost.materials.lapis || 0)
          },
          money: prev.money + stoneCost.money
        }));
      } else {
        setPicks(prev => prev.map(pick =>
          pick.level === level - 1 ? { ...pick, count: pick.count - 1 } : pick
        ));
        addEnhanceLog('destroy', level - 1);

        const stoneCost = STONE_TYPES[level];
        setUsedResources(prev => ({
          ...prev,
          materials: {
            iron: prev.materials.iron + (stoneCost.materials.iron || 0),
            blackIron: prev.materials.blackIron + (stoneCost.materials.blackIron || 0),
            specialIron: prev.materials.specialIron + (stoneCost.materials.specialIron || 0),
            lapis: prev.materials.lapis + (stoneCost.materials.lapis || 0)
          },
          money: prev.money + stoneCost.money
        }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => window.location.href = 'https://kochang-simulator.onrender.com/'}
            className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
          >
            ← 돌아가기
          </button>
          <h1 className="text-3xl font-bold text-white text-center">코창서버 곡괭이 강화 시뮬레이터</h1>
          <button
            onClick={() => {
              if (confirm('모든 진행 상황이 초기화됩니다. 계속하시겠습니까?')) {
                setPicks([
                  { level: 1, count: 0 },
                  { level: 2, count: 0 },
                  { level: 3, count: 0 },
                  { level: 4, count: 0 },
                  { level: 5, count: 0 }
                ]);
                setEnhanceLogs([]);
                setUsedResources({
                  stones: { normal: 0, advanced: 0, supreme: 0 },
                  materials: {
                    iron: 0,
                    blackIron: 0,
                    specialIron: 0,
                    lapis: 0
                  },
                  money: 0
                });
              }
            }}
            className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
          >
            초기화
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">곡괭이 강화</h2>
          <div className="grid grid-cols-5 gap-4">
            {picks.map((pick) => (
              <div key={pick.level} className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-white font-bold mb-2">{pick.level}강 곡괭이</p>
                <p className="text-blue-400 mb-4">보유: {pick.count}개</p>
                <div className="space-y-2">
                  <button
                    onClick={() => createPick(pick.level)}
                    className="w-full bg-green-600 hover:bg-green-500 text-white rounded px-4 py-2 text-sm"
                  >
                    제작
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">강화 확률</h2>
            <div className="space-y-2 text-gray-300">
              {Object.entries(ENHANCE_RATES).map(([level, rates]) => (
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
                  className={`text-sm ${log.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                >
                  {log.type === 'success'
                    ? `${log.level}강 강화 성공`
                    : `${log.level}강 곡괭이 파괴`}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">사용된 재화</h2>
            <div className="space-y-2 text-gray-300">
              <div className="mt-4">
                <p>철: {usedResources.materials.iron}개</p>
                <p>묵철: {usedResources.materials.blackIron}개</p>
                <p>오철: {usedResources.materials.specialIron}개</p>
                <p>청금석: {usedResources.materials.lapis}개</p>
              </div>
              <div className="mt-4">
                <p>총 사용 금액: {usedResources.money.toLocaleString()}원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}