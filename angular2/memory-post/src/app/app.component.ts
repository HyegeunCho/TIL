import { Component, OnInit } from '@angular/core';

import { Memory } from './memory';
import { MemoryService } from './memory.service';

@Component({
    selector: 'memory-post',
    templateUrl: './app.component.html',
     styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Memory post';
    memories: Memory[];
    isName: {[id: number] : boolean } = {};

    constructor(private memoryService:MemoryService) {}

    getMemories(): void {
        //this.memoryService.getMemories().then(memories => this.memories = memories);
        this.memoryService.getMemories().then(function(memories: Memory[]) {
            this.memories = memories;
            for (var i: number = 0; i < memories.length; i++) {
                this.isName[memories[i].id] = true;
            }
        }.bind(this));
    }

    ngOnInit(): void {
        this.getMemories();
    }

    onSelect(memory: Memory): void {
        this.isName[memory.id] = !this.isName[memory.id];
    }
}
