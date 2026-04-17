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
  firstName:    string;
  lastName:     string;
  birth:        string;
  phone:        string;
  email:        string;
  notes:        string;
  details:      OrderDetailInterfaceModel[],


  ordernumber?: string;
  dateorder?:   string;
  status?:      number;
  gender?:      string;

}

export interface OrderDetailInterfaceModel{
    idTest:number;
    priority:number
}