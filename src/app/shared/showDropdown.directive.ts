import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: "[appDropDown]"
})
export class ShowDropdown{

    show: boolean = false;
    @HostListener('click') onClick(){
        this.show = !this.show;
        if(this.show){
            this.renderer.addClass(this.elRef.nativeElement, 'open');
            this.renderer.addClass(this.elRef.nativeElement, 'alert');
        }
        else{
        this.renderer.removeClass(this.elRef.nativeElement, 'open');
        }
    }
    constructor(private elRef: ElementRef, private renderer: Renderer2){
        
    }
   
    
}