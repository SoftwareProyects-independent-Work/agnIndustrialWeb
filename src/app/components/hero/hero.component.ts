import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('servicesLine') servicesLineRef?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.fitServicesLine();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.fitServicesLine();
  }

  private fitServicesLine(): void {
    const el = this.servicesLineRef?.nativeElement;
    if (!el) return;

    // Below this width the line wraps to a comfortable, readable size (see CSS media query)
    // instead of being squeezed onto one illegibly small line.
    if (window.innerWidth < 768) {
      el.style.transform = 'none';
      return;
    }

    el.style.transform = 'scale(1)';
    const availableWidth = el.clientWidth;
    const naturalWidth = el.scrollWidth;
    const scale = naturalWidth > availableWidth ? availableWidth / naturalWidth : 1;
    el.style.transform = `scale(${scale})`;
  }
}
