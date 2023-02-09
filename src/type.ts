// Props

export interface RankProps {
    crops: Crop[];
    setSelectedCrop: React.Dispatch<React.SetStateAction<Crop | undefined>>;
}

export interface HeaderProps {
    setMarketName: React.Dispatch<React.SetStateAction<string>>,
    marketName: string
}

export interface SlideProps {
    priceVariations: PriceVariation[];
    setSelectedCrop: React.Dispatch<React.SetStateAction<Crop | undefined>>
}

export interface StatProps {
    stats: Stats;
}

export interface ModalProps {
    crop: Crop | undefined;
    selectedCropData: SelectedCropData | undefined
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

export interface SelectedCropData {
    week: {
        price: number;
        quantity: number;
    };
    month: {
        price: number;
        quantity: number;
    };
    season: {
        price: number;
        quantity: number;
    };
}

// formatter
const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
});
export { formatter };
