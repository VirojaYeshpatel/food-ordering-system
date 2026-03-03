/**
 * Restaurant model (domain shape).
 * Keep this close to Firestore document format for easy migration.
 */
class Restaurant {
  constructor({ id, name, description, address, imageUrl }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.imageUrl = imageUrl || null;
  }
}

module.exports = Restaurant;
