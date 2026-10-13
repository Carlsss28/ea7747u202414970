import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class outdoorsItem implements BaseEntity {

  id: number
  name: string
  activityType: string
  capacity: number
  latitude: number
  longitude: number

  constructor(outdoorsItem: {
    id: number,
    name: string,
    activityType: string,
    capacity: number,
    latitude: number,
    longitude: number
  }) {
    this.id = outdoorsItem.id;
    this.name = outdoorsItem.name;
    this.activityType = outdoorsItem.activityType;
    this.capacity = outdoorsItem.capacity;
    this.latitude = outdoorsItem.latitude;
    this.longitude = outdoorsItem.longitude;
  }

}


