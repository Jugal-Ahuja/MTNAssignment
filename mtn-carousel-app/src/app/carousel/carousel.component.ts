import { DOCUMENT } from "@angular/common";
import { Component,OnInit,AfterViewInit,Inject} from '@angular/core';
import { gsap, TimelineMax,TweenMax  } from 'gsap';
import { Draggable } from "gsap/Draggable";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  [x: string]: any;
  slider: any;
  cellWidth:any
  wrapWidth:any;
  cellStep:any;
  baseTl:any;
  animation:any;
  public picker:any;
  proxy:any;
  numCells:any;
  wrapProgress:any;
  self = this;
  i:any;
  targetX = 0;
  slideCount: any;
  cell: any;
  
  constructor(@Inject(DOCUMENT) private _document:any) {
    Draggable:Draggable;
   }

  ngOnInit() {
    gsap.registerPlugin(Draggable);
  }

  ngAfterViewInit(){
    gsap.defaults({ ease: "none" });
    
    const cells = this._document.querySelectorAll(".cell");
    
    this.picker = this._document.querySelector(".picker");
    this.cellWidth = 450;
    this.numCells = cells.length;
    this.cellStep = 1 / this.numCells;
    this.wrapWidth = this.cellWidth * this.numCells;
    this.baseTl = gsap.timeline({ paused: true });
    this.wrapProgress = gsap.utils.wrap(0,1)
    this.slideCount = this._document.getElementsByClassName('cell-content').length;
    this.cell = this._document.querySelector('.cell');
    this.proxy = document.createElement("div");
    gsap.set(this.picker, {
      width: this.wrapWidth - this.cellWidth
    });
    

    for (this.i = 0; this.i < cells.length; this.i++) {  
      this.initCell(cells[this.i], this.i);
    }

      this.animation = gsap.timeline({ repeat: -1, paused: true })
    .add(this.baseTl.tweenFromTo(1, 2, {immediateRender: true}))


    
    this.initScroll();

  }
initScroll() {
   Draggable.create(this.cell, {  
    type: "x",
    throwProps: true,
    trigger: this.picker,
    onDrag: this.updateProgress,
    onThrowUpdate: this.updateProgress,
    snap: { 
      x: this.snapX
    },
    onThrowComplete: function(){
      console.log("onThrowComplete");
    }
  });
}
  snapX(x:any) {
  return Math.round(x / this.cellWidth) * this.cellWidth;
}

 updateProgress() {
    var self= this;

  this.baseTl = gsap.timeline({ paused: true });
  this.animation = gsap.timeline({ repeat: -1, paused: true })
  .add(this.baseTl.tweenFromTo(1, 2, {immediateRender: true}));
  if(!this.animation)
  self.animation.progress(this.wrapProgress(this.x / this.wrapWidth));
}

 initCell(element:any, index:any) {
  
  gsap.set(element, {
    width: this.cellWidth,
    scale: 0.6,
    x: -this.cellWidth
  });
  
  const tl = gsap.timeline({ repeat: 1 })
    .to(element, {duration:1, x: "+=" + this.wrapWidth/*, rotationX: -rotationX*/ }, 0)
    .to(element, this.cellStep, { color: "#009688", scale: 1, repeat: 1, yoyo: true }, 0.5 - this.cellStep);
     this.baseTl.add(tl, this.i * -this.cellStep);
 }

 prevElement() {
  if (this.targetX < 0) {
    this.targetX++;

    TweenMax.to(this.cell, 1, {
      x: this.wrapWidth * this.targetX,
      onUpdate: this.updateProgress
    });
  }
}

nextElement() {
  if (this.targetX > -1 * (this.slideCount - 1)) {
    this.targetX--;

    TweenMax.to(this.cell, 1, {
      x: this.wrapWidth * this.targetX,
      onUpdate: this.updateProgress
    });
  }
}
 
}
