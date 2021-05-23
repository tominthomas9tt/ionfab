import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ValidatorPatterns {
    public GstNo = "^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$";
    public PanNo = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
    public Phone = "^[0-9]{10,10}$";
    public Pin = "^[1-9][0-9]{5}$";
}