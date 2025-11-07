import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to KiSTT - Kinder Stranger Things Tracker API!';
  }

  getToys(): any {
    // Mock data for initial setup
    return [
      {
        id: 1,
        name: 'Eleven',
        series: 'Stranger Things Season 1',
        rarity: 'Common',
        imageUrl: 'https://example.com/eleven.jpg',
      },
      {
        id: 2,
        name: 'Demogorgon',
        series: 'Stranger Things Season 1',
        rarity: 'Rare',
        imageUrl: 'https://example.com/demogorgon.jpg',
      },
      {
        id: 3,
        name: 'Hopper',
        series: 'Stranger Things Season 2',
        rarity: 'Uncommon',
        imageUrl: 'https://example.com/hopper.jpg',
      },
    ];
  }
}