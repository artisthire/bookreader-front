import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IModalData } from '../../services/modal/modal.model';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { read: ViewContainerRef })
  private readonly modal!: ViewContainerRef;
  @ViewChild('modalTemplate', { read: TemplateRef })
  private readonly modalTemplate!: TemplateRef<any>;
  @ViewChild('contentWrap', { read: ElementRef })
  private readonly contentWrap!: ElementRef;
  @ContentChild('content', { read: ViewContainerRef })
  private readonly content!: ViewContainerRef;

  private destroy$: Subject<void> = new Subject();
  private readonly window: Window | null;
  private readonly htmlEl: HTMLElement;

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private modalService: ModalService
  ) {
    const { defaultView, documentElement } = inject(DOCUMENT);
    this.window = defaultView;
    this.htmlEl = documentElement;
  }

  ngOnInit(): void {
    this.modalService.modalObservable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IModalData<any> | null) => {
        if (!data) {
          this.close();
        } else {
          this.open(data);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onWindowKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  public onOverlayClick(event: MouseEvent): void {
    if (
      event.target &&
      !(this.contentWrap.nativeElement as HTMLDivElement).contains(
        <HTMLDivElement>event.target
      )
    ) {
      this.close();
    }
  }

  private open(data: IModalData<any>): void {
    const modalContent = this.content.createComponent(data.component);
    modalContent.instance.data = data.data;
    this.modal.createEmbeddedView(this.modalTemplate);
    this.window?.addEventListener('keydown', this.onWindowKeydown);
    this.renderer.addClass(this.htmlEl, 'overflow-hidden');
    this.cd.detectChanges();
  }

  private close(): void {
    this.content.clear();
    this.modal.clear();
    this.window?.removeEventListener('keydown', this.onWindowKeydown);
    this.renderer.removeClass(this.htmlEl, 'overflow-hidden');
    this.cd.detectChanges();
  }
}
