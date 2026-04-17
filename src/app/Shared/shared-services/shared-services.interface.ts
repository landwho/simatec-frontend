export interface CatalogosInterfaceModel{
    area:       AreaInterfaceModel[];
    physician:  PhysicianInterfaceModel[];
    origin:     OriginInterfaceModel[];
    test:       AreaCatalogInterfaceModel[];
    orderType:  OrderTypeInterfaceModel[];
    priceList: any
}

export interface AreaInterfaceModel {
    confidential:   boolean; 
    idarea:         number; 
    name:           string; 
    status?:        number;
}

export interface PhysicianInterfaceModel{
    iddoctor:     number;
    codedoctor:   string;
    firstname:    string;
    lastname:     string;
}

export interface OrderTypeInterfaceModel{
    description:    string;
    idOrderType:    number;
    orderTypeCode:  string;
}

export interface AreaCatalogInterfaceModel{
    areaName:   string;
    idArea:     number;
    tests:      TestInterfaceModel[]

}

export interface TestInterfaceModel {
    allowDiscount?: boolean;
    idTest:         number;
    maxDiscount?:   number;
    price?:         number;
    testCode:       string;
    testName:       string;
    testOrder:      number;
}

export interface OriginInterfaceModel {
    idorigin:       number;
    origincode:     string;
    description:    string;
}

export type CatalogType = 'area' | 'physician' | 'test' | 'origin' | 'orderType' | 'priceList';