import { Color3, Texture } from 'decentraland-ecs';

export default class Bichos {
  static getBichoTexture(bicho: number) {
    switch (bicho) {
      case 1: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Avestruz');
      case 2: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Aguia');
      case 3: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Burro');
      case 4: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Borboleta');
      case 5: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Cachorro');
      case 6: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Cabra');
      case 7: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Carneiro');
      case 8: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Camelo');
      case 9: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Cobra');
      case 10: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Coelho');
      case 11: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Cavalo');
      case 12: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Elefante');
      case 13: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Galo');
      case 14: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Gato');
      case 15: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Jacare');
      case 16: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Leao');
      case 17: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Macaco');
      case 18: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Porco');
      case 19: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Pavao');
      case 20: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Peru');
      case 21: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Touro');
      case 22: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Tigre');
      case 23: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Urso');
      case 24: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Veado');
      case 25: return new Texture('https://dummyimage.com/100x100/000/fff.png&text=Vaca');

      default: {
        return new Texture('bicho1.png');
      }
    }
  }

  static getBichoColor(bicho: number) {
    switch (bicho % 5) {
      case 0: return new Color3(1, (bicho % 5) / 5, (bicho % 5) / 5);
      case 1: return new Color3((bicho % 5) / 5, 1, (bicho % 5) / 5);
      case 2: return new Color3((bicho % 5) / 5, (bicho % 5) / 5, 1);
      case 3: return new Color3((bicho % 5) / 5, 1, 1);
      case 4: return new Color3(0, 0, (bicho % 5) / 5);
      default: return Color3.Black();
    }
  }

  static getTicketDescription(ticket: number) {
    switch (ticket) {
      case 0: return 'Golden Ticket';
      case 1: return 'Silver Ticket';
      case 2: return 'Bronze Ticket';
      default: return '!!! Ticket !!!';
    }
  }

  static getTicketPrice(ticket: number) {
    switch (ticket) {
      case 0: return 'ETH Ξ 0.0003';
      case 1: return 'ETH Ξ 0.0002';
      case 2: return 'ETH Ξ 0.0001';
      default: return 'ETH Ξ 1.000';
    }
  }

  static getTicketImage(ticket: number) {
    switch (ticket) {
      case 0: return new Texture('https://dummyimage.com/100x100/ffd700/000000.png&text=GOLDEN');
      case 1: return new Texture('https://dummyimage.com/100x100/C0C0C0/000000.png&text=SILVER');
      case 2: return new Texture('https://dummyimage.com/100x100/cd7f32/000000.png&text=BRONZE');
      default: return new Texture('https://dummyimage.com/100x100/000000/000000.png&text=error');
    }
  }
}
