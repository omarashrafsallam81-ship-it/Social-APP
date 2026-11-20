import { Component, computed, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-my-posts',
  imports: [],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent {
  price = signal(20);
  quantity = signal(100);

  totalPrice = computed(() => this.price() * this.quantity());

  changePrice(): void {
    this.price.update((value) => value + 20);

    console.log(this.price());
  }
}
