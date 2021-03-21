import { Color3, Texture } from 'decentraland-ecs';

export default class Bichos {
  static getBichoTexture(bicho: number) {
    switch (bicho) {
      case 0: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ostrich_-_melbourne_zoo.jpg/105px-Ostrich_-_melbourne_zoo.jpg');
      case 1: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bald_eagle_head_frontal.jpg/180px-Bald_eagle_head_frontal.jpg');
      case 2: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Burro_Sigueiro_Oroso_Galiza_6.jpg/120px-Burro_Sigueiro_Oroso_Galiza_6.jpg');
      case 3: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Borboleta_transparente_REFON.JPG/438px-Borboleta_transparente_REFON.JPG');
      case 4: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fila_Brasileiro_%28dog%29.jpg/105px-Fila_Brasileiro_%28dog%29.jpg');
      case 5: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Goat_-_Colchester_Zoo.jpg/135px-Goat_-_Colchester_Zoo.jpg');
      case 6: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Borris_the_ram.jpg/195px-Borris_the_ram.jpg');
      case 7: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg/150px-07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg');
      case 8: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Indiancobra.jpg/210px-Indiancobra.jpg');
      case 9: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Coello_GDFL000.JPG/195px-Coello_GDFL000.JPG');
      case 10: return new Texture('https://upload.wikimedia.org/wikipedia/commons/8/89/Mo_fox_trotter_2.jpg');
      case 11: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/African_Elephant.jpg/120px-African_Elephant.jpg');
      case 12: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Karnataka_rooster.jpg/120px-Karnataka_rooster.jpg');
      case 13: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/WhiteCat.jpg/180px-WhiteCat.jpg');
      case 14: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Brillenkaiman_%2801%29_2006-09-19.JPG/225px-Brillenkaiman_%2801%29_2006-09-19.JPG');
      case 15: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/%C3%89breszt%C5%91.jpg/165px-%C3%89breszt%C5%91.jpg');
      case 16: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Schimpanse_Zoo_Leipzig.jpg/225px-Schimpanse_Zoo_Leipzig.jpg');
      case 17: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Pig_USDA01c0116.jpg/105px-Pig_USDA01c0116.jpg');
      case 18: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/PeackockSide.jpg/180px-PeackockSide.jpg');
      case 19: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Male_north_american_turkey_supersaturated.jpg/135px-Male_north_american_turkey_supersaturated.jpg');
      case 20: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Dexter_Bull_headshot.jpg/225px-Dexter_Bull_headshot.jpg');
      case 21: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Panthera_tigris7.jpg/113px-Panthera_tigris7.jpg');
      case 22: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Ours_brun_parcanimalierpyrenees_3.jpg/113px-Ours_brun_parcanimalierpyrenees_3.jpg');
      case 23: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/ItsukushimaDeer7389.jpg/143px-ItsukushimaDeer7389.jpg');
      case 24: return new Texture('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Koe_zijaanzicht_2.JPG/195px-Koe_zijaanzicht_2.JPG');

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
