import { Component, OnInit } from '@angular/core';

import { Memory } from './memory';
import { MemoryService } from './memory.service';

@Component({
    selector: 'memory-post',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'], 
})
export class AppComponent implements OnInit {
    title = 'Memory post';
    currentMemory: Memory;
    currentState: string;

    private memories: Memory[];
    private isFrontList: {[id: number] : string } = {};
    private currentIndex: number;

    constructor(private memoryService:MemoryService) {}

    getMemories(): void {
        //this.memoryService.getMemories().then(memories => this.memories = memories);
        this.memoryService.getMemories().then(function(memories: Memory[]) {
            this.memories = memories;
            for (var i: number = 0; i < memories.length; i++) {
                this.isFrontList[memories[i].id] = true;
            }
            this.currentIndex = 0;
            this.currentMemory = this.memories[this.currentIndex];
            this.currentState = 'front';
        }.bind(this));
    }

    ngOnInit(): void {
        this.getMemories();
    }

    onFlip(/*memory: Memory*/): void {
        //this.isFrontList[memory.id] = !this.isFrontList[memory.id];
        if (this.currentState === 'front') {
            this.currentState = 'back';
        } else {
            this.currentState = 'front';
        }
    }

    isFront(): boolean {
        return (this.currentState === 'front');
    }

    onNext(): void {
        this.currentState = 'front';
        this.currentIndex = (this.currentIndex === (this.memories.length - 1) ? this.currentIndex : this.currentIndex + 1);    
        this.currentMemory = this.memories[this.currentIndex];
    }

    onPrevious(): void {
        this.currentState = 'front';
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
