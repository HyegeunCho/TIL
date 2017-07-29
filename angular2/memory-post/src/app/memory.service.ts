import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import { MEMORIES } from './mock-memories';

import 'rxjs/add/operator/toPromise';

import { Memory } from './memory';

@Injectable()
export class MemoryService {

	getMemories(): Promise<Memory[]> {
		return Promise.resolve(MEMORIES);
	}

	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}
}