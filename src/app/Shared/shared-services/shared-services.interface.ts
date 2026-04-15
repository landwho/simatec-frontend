export interface CatalogosInterfaceModel{
    area:       AreaInterfaceModel[];
    physician:  PhysicianInterfaceModel[];
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

export type CatalogType = 'area' | 'physician';