import { Directive, Input, ElementRef, Renderer2, OnChanges, inject } from '@angular/core';

@Directive({
  selector: '[appNotificationStyle]',
  standalone: true
})
export class NotificationStyleDirective implements OnChanges {
  @Input() appNotificationStyle: 'success' | 'error' | 'info' | undefined = undefined;

  private baseClasses = ['px-4', 'py-2', 'border', "flex", "justify-between", "items-center", "shadow-md"];

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnChanges() {
    this.updateClasses();
  }

  private updateClasses() {
    // Remove all existing notification classes
    this.removeAllNotificationClasses();
    
    // Add base classes
    this.baseClasses.forEach(cls => {
      this.renderer.addClass(this.el.nativeElement, cls);
    });

    // Add type-specific classes
    const typeClasses = this.getTypeClasses();
    typeClasses.forEach(cls => {
      this.renderer.addClass(this.el.nativeElement, cls);
    });
  }

  private getTypeClasses(): string[] {
    switch (this.appNotificationStyle) {
      case 'success':
        return ['bg-green-100', 'text-green-800', 'border-green-200'];
      case 'error':
        return ['bg-red-100', 'text-red-800', 'border-red-200'];
      case 'info':
        return ['bg-blue-100', 'text-blue-800', 'border-blue-200'];
      default:
        return ['bg-gray-100', 'text-gray-800', 'border-gray-200'];
    }
  }

  private removeAllNotificationClasses() {
    const allClasses = [
      ...this.baseClasses,
      'bg-green-100', 'text-green-800', 'border-green-200',
      'bg-red-100', 'text-red-800', 'border-red-200',
      'bg-blue-100', 'text-blue-800', 'border-blue-200',
      'bg-gray-100', 'text-gray-800', 'border-gray-200'
    ];
    
    allClasses.forEach(cls => {
      this.renderer.removeClass(this.el.nativeElement, cls);
    });
  }
}