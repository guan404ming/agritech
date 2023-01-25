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
    CropCode: String;
    MarketName: String;
    Trans_Quantity: number;
    TransDate: String;
    Avg_Price: number;
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

const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
});
export { formatter };
