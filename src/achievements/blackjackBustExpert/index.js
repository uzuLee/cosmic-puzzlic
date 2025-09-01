const THRESHOLD = 5;

export default {
  id: 'blackjackBustExpert',
  name: '버스트 전문가',
  description: `블랙잭 게임에서 ${THRESHOLD}번 이상 버스트했습니다.`,
  icon: '💥',
  evaluate: (user, gameData, scoreData) => {
    if (gameData.gameId !== 'blackjack') {
      const existingAchievement = user.achievements.find(a => a.id === 'blackjackBustExpert');
      return { 
        isUnlocked: !!existingAchievement, 
        progress: existingAchievement ? existingAchievement.progress : 0,
        tier: existingAchievement ? existingAchievement.tier : null,
        newTierUnlocked: false 
      };
    }

    const existingAchievement = user.achievements.find(a => a.id === 'blackjackBustExpert');
    const previousProgress = existingAchievement ? existingAchievement.progress : 0;

    // scoreData.isBust가 true일 때만 진행도 증가
    const newProgress = previousProgress + (scoreData && scoreData.isBust ? 1 : 0);

    const isUnlocked = newProgress >= THRESHOLD;

    return {
      isUnlocked: isUnlocked,
      progress: newProgress,
      tier: null,
      newTierUnlocked: false,
    };
  },
};