export interface CreateAnimalComplaintDTO {
  complaint: string;
  animal_id: string;
  contact_info?: ContactInfo;
}

export interface ContactInfo {
  phone: string;
  name: string;
}
