// Props

export interface RankProps {
    crops: Crop[];
}

export interface SlideProps {
    priceVariations: PriceVariation[];
}

export interface StatProps {
    crops: Crop[];
}

export interface ModalProps {
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
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export interface MarketContextInterface {
    marketName: string;
    setMarketName: React.Dispatch<React.SetStateAction<string>>;
    selectedCrop: Crop | undefined;
    setSelectedCrop: React.Dispatch<React.SetStateAction<Crop | undefined>>;
    curDate: Date;
    prevDate: Date;
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
