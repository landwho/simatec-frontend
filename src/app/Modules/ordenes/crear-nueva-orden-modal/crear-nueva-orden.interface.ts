export interface DetailRequestInterfaceModel {
  idTest:   number;
  priority: number;
}

export interface DetailsRequestBodyInterfaceModel {
  details: DetailRequestInterfaceModel[];
}

export interface OrderInterfaceModel{
  idOrderType:  number;
  idOrigin:     number;
  idDoctor:     number;
  idPatient:    number;
  patientCode:  string;
  patientName:  string;
  birth:        string;
  phone:        string;
  email:        string;
  details:      OrderDetailInterfaceModel[]
}

export interface OrderDetailInterfaceModel{
    idTest:number;
    priority:number
}