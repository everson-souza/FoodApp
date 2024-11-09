import { FoodInterface } from "./food.interface";

export interface LocationInterface {
    accessibility: number;
    availability: number;
    availabilityTime: number;
    classification: number;
    coordinates: [];
}

export interface LanguageInterface {
    isMandatory: boolean;
    language: string;
}

export interface DataAPIInterface {
    address: string;
    blockedPaymentMethods: unknown;
    bucketSetLayoutString: unknown;
    color: string;
    crossSelling: {
        categoryClusterType: {
            id: string;
            name: string;
        };
        isEnabled: boolean;
    };
    currency: string;
    distance: number;
    group: unknown;
    id: string;
    instantInvoicingEnabled: boolean;
    isOnline: boolean
    language: string;
    launchdate: Date;
    launchdateRaw: string;
    location: LocationInterface;
    machineProducts: FoodInterface[];
    maintenanceInfo: unknown;
    name: string;
    packages: [];
    paymentLimit: {
        sepa: {
            isEnabled: boolean;
            monthlyLimit: unknown;
        }
    };
    priority: number;
    qrCode: string;
    subsidyGroup: unknown;
    supportedLanguages: LanguageInterface[];
    videos: unknown;
}