// Props

export interface RankProps {
    crops: Crop[];
    setSelectedCrop: React.Dispatch<React.SetStateAction<Crop | undefined>>;
}

export interface HeaderProps {
    setMarketName: React.Dispatch<React.SetStateAction<string>>,
    marketName: string
}

export interface StatProps {
    stats: Stats;
}

export interface SlideProps {
    priceVariationList: PriceVariation[];
    setSelectedCrop: React.Dispatch<React.SetStateAction<Crop | undefined>>
}

export interface ModalProps {
    crop: Crop | undefined;
}

// Object

export interface Crop {
    CropName: String;
    Avg_Price: String;
    CropCode: String;
    MarketName: String;
    Trans_Quantity: number;
    TransDate: String;
    Upper_Price: number,
    Middle_Price: number,
    Lower_Price: number
}

export interface Stats {
    income: number;
    quantity: number;
}

export interface PriceVariation {
    crop: Crop;
    priceVariation: number;
}

export interface ThemeContextInterface {
    theme: String;
    setTheme: React.Dispatch<React.SetStateAction<String>>;
}
