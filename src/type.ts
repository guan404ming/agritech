export interface RankProps {
    crops: Crop[]
}

export interface HeaderProps {
    setMarketName: React.Dispatch<React.SetStateAction<string>>,
    marketName: string
}

export interface Crop {
    CropName: String;
    Avg_Price: String;
    CropCode: String;
    MarketName: String;
}
