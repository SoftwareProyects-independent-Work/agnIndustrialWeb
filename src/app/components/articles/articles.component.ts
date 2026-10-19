import { AfterViewInit, Component, HostListener, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import articles from './articles.json';

interface Article {
  title: string;
  slug: string;
  description: string;
  paragraphs: string[];
  points?: string[];
}

@Component({
  selector: 'app-articles',
  standalone: true,
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements AfterViewInit {
  readonly articles: Article[] = articles;
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly homeTitle = 'AGN Industrial | Tratamiento de Agua Industrial en Uruguay';
  private readonly homeDescription = 'Soluciones integrales en tratamiento y purificación de agua para la industria en Uruguay: ablandadores automáticos, tratamiento integral y asesoría técnica. Más de 30 años de experiencia.';
  private readonly canonicalOrigin = new URL(this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!.href).origin;
  activeSlug = this.slugFromPath();
  copyMessage = '';
  sharedSlug: string | null = null;

  ngAfterViewInit(): void {
    this.updateMetadata();
    this.scrollToArticle();
  }

  openArticle(event: Event, slug: string): void {
    event.preventDefault();
    this.navigate(this.activeSlug === slug ? null : slug);
  }

  private navigate(slug: string | null): void {
    if (this.activeSlug === slug) return;
    this.activeSlug = slug;
    this.copyMessage = '';
    window.history.pushState(null, '', slug ? `/articulos/${slug}` : '/#articulos');
    this.updateMetadata();
  }

  @HostListener('window:popstate')
  restoreArticle(): void {
    this.activeSlug = this.slugFromPath();
    this.copyMessage = '';
    this.updateMetadata();
    this.scrollToArticle();
  }

  async copyLink(slug: string): Promise<void> {
    this.sharedSlug = slug;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/articulos/${slug}`);
      this.copyMessage = 'Enlace copiado';
    } catch {
      this.copyMessage = 'No se pudo copiar. Abrí el artículo y copiá la dirección del navegador.';
    }
  }

  private slugFromPath(): string | null {
    const path = this.document.location.pathname.replace(/\/$/, '');
    return this.articles.find(article => path === `/articulos/${article.slug}`)?.slug ?? null;
  }

  private scrollToArticle(): void {
    if (!this.activeSlug || window.location.hash) return;
    requestAnimationFrame(() => this.document.getElementById(`articulo-${this.activeSlug}`)?.scrollIntoView({ block: 'start' }));
  }

  private updateMetadata(): void {
    const article = this.articles.find(item => item.slug === this.activeSlug);
    const title = article ? `${article.title} | AGN Industrial` : this.homeTitle;
    const description = article?.description ?? this.homeDescription;
    const url = `${this.canonicalOrigin}${article ? `/articulos/${article.slug}` : '/'}`;
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: article ? 'article' : 'website' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'robots', content: article && !article.paragraphs.length ? 'noindex, follow' : 'index, follow' });
    this.document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
  }
}
