import { Injectable } from '@angular/core';
import {Dinosaure} from "../models/dinosaure";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  loggedDino: Dinosaure = null;

  isLogged = false;
}
