export class Place {
  constructor(
    public id: string,
    public title: string,
    public location: string,
    public description: string,
    public imageUrl: string,
    public price: number,
    public type: string,
    public date: Date,
    public userId: string,
    public rooms: string
    ) {
  }
}
