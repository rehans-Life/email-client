import {
  Component,
  ElementRef,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnDestroy {
  @Output() close = new EventEmitter();
  constructor(private el: ElementRef) {}

  ngOnit() {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }

  onClose() {
    this.close.emit();
  }
}
