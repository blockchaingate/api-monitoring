import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BlockchainInfo } from './shared/blockchaininfo.model'

@Injectable({
  providedIn: 'root'
})
export class ApiStatusService {

  constructor(private _http : HttpClient) { }

  checkApi(testUrl) {
    return this._http.get<BlockchainInfo>(testUrl)
  }
  
  async test() {

    let s = await this._http.get<BlockchainInfo>("http://fabexplorer.info:9001/fabapi/getblockchaininfo")
    return s;
  }

}
