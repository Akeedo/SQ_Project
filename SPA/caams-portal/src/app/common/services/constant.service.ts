import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  constructor() { }

  statusList = [
    { id: 'Active',    text: 'Active' },
    { id: 'Inactive',  text: 'Inactive' }
  ];

  genderList = [
    { id: 'Female',    text: 'Female' },
    { id: 'Male',      text: 'Male' },
    { id: 'Other',     text: 'Other' }
  ];

  country = [
    {text: 'Afghanistan', id: 'AF'},
    {text: 'Argentina', id: 'AR'},
    {text: 'Australia', id: 'AU'},
    {text: 'Bahrain', id: 'BH'},
    {text: 'Bangladesh', id: 'BD'},
    {text: 'Bhutan', id: 'BT'},
    {text: 'Canada', id: 'CA'},
    {text: 'China', id: 'CN'},
    {text: 'Ecuador', id: 'EC'},
    {text: 'Egypt', id: 'EG'},
    {text: 'France', id: 'FR'},
    {text: 'Germany', id: 'DE'},
    {text: 'Hong Kong', id: 'HK'},
    {text: 'India', id: 'IN'},
    {text: 'Italy', id: 'IT'},
    {text: 'Japan', id: 'JP'},
    {text: 'Kuwait', id: 'KW'},
    {text: 'Malaysia', id: 'MY'},
    {text: 'Maldives', id: 'MV'},
    {text: 'Myanmar', id: 'MM'},
    {text: 'Nepal', id: 'NP'},
    {text: 'New Zealand', id: 'NZ'},
    {text: 'Oman', id: 'OM'},
    {text: 'Pakistan', id: 'PK'},
    {text: 'Qatar', id: 'QA'},
    {text: 'Saudi Arabia', id: 'SA'},
    {text: 'Singapore', id: 'SG'},
    {text: 'South Africa', id: 'ZA'},
    {text: 'Spain', id: 'ES'},
    {text: 'Sri Lanka', id: 'LK'},
    {text: 'Sweden', id: 'SE'},
    {text: 'Switzerland', id: 'CH'},
    {text: 'United Arab Emirates', id: 'AE'},
    {text: 'United Kingdom', id: 'GB'},
    {text: 'United States', id: 'US'},
  ];
}

