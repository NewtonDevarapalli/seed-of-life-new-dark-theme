import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly defaultDescription =
    'Seed Of Life Ministries - worship, prayer, discipleship, and Gospel-centered community.';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private meta: Meta
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const description = this.getRouteDescription();
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:title', content: document.title });
      });
  }

  private getRouteDescription(): string {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.snapshot.data['description'] ?? this.defaultDescription;
  }
}
