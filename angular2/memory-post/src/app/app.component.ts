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
    currentMemory: Memory;
    currentIsName: boolean;

    private memories: Memory[];
    private isName: {[id: number] : boolean } = {};
    private currentIndex: number;

    constructor(private memoryService:MemoryService) {}

    getMemories(): void {
        //this.memoryService.getMemories().then(memories => this.memories = memories);
        this.memoryService.getMemories().then(function(memories: Memory[]) {
            this.memories = memories;
            for (var i: number = 0; i < memories.length; i++) {
                this.isName[memories[i].id] = true;
            }
            this.currentIndex = 0;
            this.currentMemory = this.memories[this.currentIndex];
            this.currentIsName = true;
        }.bind(this));
    }

    ngOnInit(): void {
        this.getMemories();
    }

    onSelect(/*memory: Memory*/): void {
        //this.isName[memory.id] = !this.isName[memory.id];
        this.currentIsName = !this.currentIsName;
    }

    onNext(): void {
        this.currentIsName = true;
        this.currentIndex = (this.currentIndex === (this.memories.length - 1) ? this.currentIndex : this.currentIndex + 1);
        this.currentMemory = this.memories[this.currentIndex];
    }

    onPrevious(): void {
        this.currentIsName = true;
        this.currentIndex = (this.currentIndex === 0 ? 0 : this.currentIndex - 1);
        this.currentMemory = this.memories[this.currentIndex];
    }

    onWeightPlus(): void {
        this.currentMemory.weight++;
    }

    onWeightMinus(): void {
        this.currentMemory.weight--;
    }
}
