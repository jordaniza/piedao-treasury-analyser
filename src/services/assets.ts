import { PieData } from "../types/Chart";
import { AssetEntity, TreasuryEntity } from "../types/Treasury";
import { calculateChange } from "../utils";

export const getFirstTotalInAsset = (assets: AssetEntity[], assetName: string): number => {
  /**
   * @param assets - array of underlying assets
   * @param assetName - protocol to search for
   * @returns total value locked in the asset
   */
  const asset = assets.find(({ protocol }) => protocol === assetName);
  return asset?.total ?? 0
}

export const assetSplitByValue = (treasury: TreasuryEntity) => {
  /**
   * @returns the passed treasury record with the percentage split of
   * each asset added, according to total value.
   */
  return treasury.underlying_assets.map(asset => ({
    ...asset,
    percentage: asset.total / treasury.treasury
  }));
};

export const generateAssetData = (selectedRecord: TreasuryEntity, baseAssets: AssetEntity[]) => {
  /**
   * split the assets by percentage of total value, then calculate the change in asset
   * values since the base period.
   */
  const assetWithPercentage = assetSplitByValue(selectedRecord);
  const sortedAssets = assetWithPercentage.sort((a, b) => b.total - a.total);
  return sortedAssets.map(asset => {
    const assetStartValue = getFirstTotalInAsset(baseAssets, asset.protocol);
    return {
      ...asset,
      initialValue: assetStartValue,
      performance: calculateChange(asset.total, assetStartValue)
    }
  });
};

export const generatePieData = (total: TreasuryEntity): PieData[] => total
  .underlying_assets
  .map(asset => ({
    id: asset.protocol,
    label: asset.protocol,
    value: asset.total,
    color: `hsl(${Math.round(Math.random() * 100)}, 70%, 50%)`
  })
);