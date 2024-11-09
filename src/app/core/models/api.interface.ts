import { DataAPIInterface } from "./dataApi.interface";

export interface APIInterface {    
    apiVersion: string;
    data: DataAPIInterface;
    status: string;
}